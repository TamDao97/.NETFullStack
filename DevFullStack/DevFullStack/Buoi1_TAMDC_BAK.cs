using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevFullStack
{
    public class People
    {
        private string Name;
        private int Old;

        public void SetName(string name)
        {
            Name = name;
        }

        public void SetOld(int old)
        {
            Old = old;
        }

        public void DisplayName()
        {
            Console.WriteLine($"Tôi là : {Name}");
        }
    }
}
