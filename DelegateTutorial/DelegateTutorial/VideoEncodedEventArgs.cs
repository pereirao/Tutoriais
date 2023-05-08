namespace DelegateTutorial
{
    public class VideoEncodedEventArgs
    {
        public VideoEncodedEventArgs(DateTime timeFinished, string userEmail)
        {
            TimeFinished = timeFinished;
            UserEmail = userEmail;
        }

        public DateTime TimeFinished { get; }
        public string UserEmail { get; }
    }

}
