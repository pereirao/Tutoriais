namespace ClassLibrary
{
    public class User : IUser
    {
        public bool Authenticate(string userName, string password)
        {
            return userName.ToLower() == "wcf" && password.ToLower() == "wcf";
        }

        public string Welcome(string userName)
        {
            return $"Greetings, {userName}";
        }
    }
}
