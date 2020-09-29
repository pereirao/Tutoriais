using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class UserRepositoryMock : IRepository<User>
    {
        private readonly List<User> _users;

        public UserRepositoryMock()
        {
            _users = new List<User>();
            _users.Add(new User { Id = 1, Login = "user1" });
            _users.Add(new User { Id = 2, Login = "user2" });
            _users.Add(new User { Id = 3, Login = "user3" });
        }

        public bool Delete(int id)
        {
            bool deleted = false;
            if (_users.Any(u => u.Id == id))
            {
                _users.Remove(_users.FirstOrDefault(u => u.Id == id));
                deleted = true;
            }
            return deleted;
        }

        public IEnumerable<User> Get()
        {
            return _users;
        }

        public User Get(int id)
        {
            return _users.FirstOrDefault(u => u.Id == id);
        }

        public User Get(string login)
        {
            return _users.FirstOrDefault(u => u.Login == login);
        }

        public User Post(User user)
        {
            int id = _users.Max(p => p.Id) + 1;
            user.Id = id;
            _users.Add(user);
            return user;
        }

        public User Put(User user)
        {
            if (_users.Any(u => u.Id == user.Id))
            {
                _users.Remove(_users.FirstOrDefault(p => p.Id == user.Id));
                _users.Add(user);
            }
            return user;
        }
    }
}
