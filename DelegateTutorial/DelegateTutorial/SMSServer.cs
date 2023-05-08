namespace DelegateTutorial
{
    internal class SMSServer
    {
        public void OnVideoEncoded(object source, VideoEncodedEventArgs args)
        {
            Console.WriteLine($"Sending SMS to {args.UserEmail}...");
        }
    }

}
