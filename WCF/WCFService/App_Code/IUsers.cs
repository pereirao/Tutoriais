using System.Collections.Generic;
using System.ServiceModel;

[ServiceContract]
public interface IUsers
{
    [OperationContract]
    List<string> GetUsers();
}
