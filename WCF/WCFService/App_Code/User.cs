using System.Collections.Generic;

public class User : IUser, IUsers
{
    public bool Authenticate(string userName, string password)
    {
        return userName.ToLower() == "wcf" && password.ToLower() == "wcf";
    }

    public List<string> GetUsers()
    {
        return new List<string>()
        {
            "Adam",
            "Bob",
            "Carl"
        };
    }

    public string Welcome(string userName)
    {
        return string.Format("Greetings, {0}", userName);
    }
}
