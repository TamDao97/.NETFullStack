using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Quiz.API.Common
{
    public class Tokens
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }

    public static class JwtHelper
    {
        public static Tokens GenerateToken(string userName, IConfiguration configuration)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKey = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, userName) }),
                    Expires = DateTime.Now.AddMinutes(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature),
                    Issuer = configuration["Jwt:Issuer"],
                    Audience = configuration["Jwt:Audience"]
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var refreshToken = GenerateRefreshToken();
                return new Tokens { AccessToken = tokenHandler.WriteToken(token), RefreshToken = refreshToken };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public static ClaimsPrincipal GetPrincipalFromExpiredToken(string token, IConfiguration configuration)
        {
            var Key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Key),
                ClockSkew = TimeSpan.Zero
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            JwtSecurityToken jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }
    }
}
