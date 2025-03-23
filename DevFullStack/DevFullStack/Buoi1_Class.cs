using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevFullStack
{
    public class Animals
    {
        public string Name { get; set; }

        public void Speak()
        {
            Console.WriteLine($"{Name} is Speaking...");
        }
    }

    public class Dog : Animals
    {

    }

    public class Cat : Animals
    {
        public void LeoCay()
        {
            Console.WriteLine($"{Name} đang leo cây...");
        }
    }
}
