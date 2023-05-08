using DelegateTutorial;

Video video = new Video("Unforgiveable", "alex@hotmail.com");

VideoEncoder encoder = new VideoEncoder();

encoder.VideoEncoded += new MailServer().OnVideoEncoded;
encoder.VideoEncoded += new SMSServer().OnVideoEncoded;

encoder.Encode(video);
