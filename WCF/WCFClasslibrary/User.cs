using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WCFClasslibrary
{

    public class User : IUser, IUsers
    {
        public bool Authenticate(string userName, string password)
        {
            return userName.ToLower() == "wcf" && password.ToLower() == "wcf";
        }

        public List<string> Get()
        {
            return new List<string>()
            {
                "Adam",
                "Bob",
                "Carl",
                "David"
            };
        }

        public string Hello()
        {
            return "Hello, world!";
        }

        public string Welcome(string userName)
        {
            return $"Greetings, {userName}";
        }
    }
}
