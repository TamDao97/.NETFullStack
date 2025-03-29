using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevFullStack
{
    public interface IAnimalss
    {
        void Sound();
    }

    public class Animalss : IAnimalss
    {
        public virtual void Sound()
        {
            Console.WriteLine("This is Animals class!");
        }
    }

    public class Dogs : IAnimalss
    {
        private string Name;

        public Dogs()
        {
            Console.WriteLine("Contructor không tham số...");
        }

        public Dogs(string name)
        {
            Name = name;
        }

        public Dogs(int a)
        {

        }

        public Dogs(int a, string b)
        {

        }

        public void DisplayName()
        {
            Console.WriteLine($"My name is {Name}");
        }

        public string DisplayName(string a)
        {
            return "";
        }

        //public void SetName(string name)
        //{
        //    Name = name;
        //}

        public void Sound()
        {
            Console.WriteLine($"The dog {Name} says:go go!");
        }
    }

    public class Cats : IAnimalss
    {
        private string Name;
        public Cats(string name)
        {
            Name = name;
        }

        public void Sound()
        {
            Console.WriteLine($"The cat {Name} says: meo meo!");
        }
    }

    public class Pig : Animalss
    {
        public override void Sound()
        {
            Console.WriteLine("Pig overriding SOUND method!");
        }
    }
}
