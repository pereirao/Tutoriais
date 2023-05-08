using System.Collections.Generic;
using System.ServiceModel;

namespace WCFClasslibrary
{
    [ServiceContract]
    public interface IUsers
    {
        [OperationContract]
        List<string> Get();
    }
}
