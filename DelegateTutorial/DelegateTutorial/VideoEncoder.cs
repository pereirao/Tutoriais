using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DelegateTutorial
{
    internal class VideoEncoder
    {

        public delegate void VideoEncodedEventHandler(object source, VideoEncodedEventArgs args);

        public event VideoEncodedEventHandler VideoEncoded;

        public void Encode(Video video)
        {
            Console.WriteLine($"Encoding video {video.Title}...");

            if (VideoEncoded != null)
            {
                this.VideoEncoded(this, new VideoEncodedEventArgs(DateTime.Now, video.UserMail));
            }
        }


    }

}
