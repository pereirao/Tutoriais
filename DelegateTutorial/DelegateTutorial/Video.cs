namespace DelegateTutorial
{
    public class Video
    {
        public Video(string title, string userMail)
        {
            Title = title;
            UserMail = userMail;
        }

        public string Title { get; }
        public string UserMail { get; }
    }
}