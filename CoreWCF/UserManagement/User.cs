using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;

namespace UserManagement
{
    [ServiceContract]
    public interface IUser
    {
        [OperationContract]
        UserModel Create(string name, DateTime birth);

        [OperationContract]
        UserModel Read(Guid id);

        [OperationContract]
        IEnumerable<UserModel> Read();

        [OperationContract]
        UserModel Update(UserModel user);

        [OperationContract]
        bool Delete(Guid id);
    }

    public class User : IUser
    {
        List<UserModel> _users = new List<UserModel>();

        public UserModel Create(string name, DateTime birth)
        {
            UserModel user = new UserModel()
            {
                Id = Guid.NewGuid(),
                Name = name,
                Birth = birth
            };
            _users.Add(user);
            return user;
        }

        public bool Delete(Guid id)
        {
            _users.Remove(Read(id));
            return true;
        }

        public UserModel Read(Guid id)
        {
            return _users.First(u => u.Id == id);
        }

        public IEnumerable<UserModel> Read()
        {
            return _users;
        }

        public UserModel Update(UserModel user)
        {
            Delete(user.Id);
            _users.Add(user);
            return user;
        }
    }

    public class UserModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Birth { get; set; }
    }
}
