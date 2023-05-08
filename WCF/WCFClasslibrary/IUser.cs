using System.ServiceModel;
using System.ServiceModel.Web;

namespace WCFClasslibrary
{
    [ServiceContract]
    public interface IUser
    {
        [OperationContract]
        string Hello();

        //[OperationContract]
        string Welcome(string userName);

        //[OperationContract]
        bool Authenticate(string userName, string password);
    }
}
