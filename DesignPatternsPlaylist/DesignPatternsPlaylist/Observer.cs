using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPatternsPlaylist
{
    public class NewsFeed : IObservable<NewsFeed>
    {
        private IList<IObserver<NewsFeed>> Clients { get; set; }
        public IDisposable Subscribe(IObserver<NewsFeed> observer)
        {
            this.Clients.Add(observer);
            throw new NotImplementedException();
        }
    }

    public class MobileNewsClient : IObserver<NewsFeed>
    {
        public void OnCompleted()
        {
            throw new NotImplementedException();
        }

        public void OnError(Exception error)
        {
            throw new NotImplementedException();
        }

        public void OnNext(NewsFeed value)
        {
            throw new NotImplementedException();
        }
    }
}
