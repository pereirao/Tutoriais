namespace DelegateTutorial
{
    internal class MailServer
    {
        public void OnVideoEncoded(object source, VideoEncodedEventArgs args)
        {
            Console.WriteLine($"Sending email to {args.UserEmail}...");
        }
    }

}
