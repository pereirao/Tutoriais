using System.ServiceModel;

namespace ClassLibrary
{
    [ServiceContract]
    public interface IUser
    {
        [OperationContract]
        string Welcome(string userName);

        [OperationContract]
        bool Authenticate(string userName, string password);
    }
}
