using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class UserRepositoryLocalDB : IRepository<User>
    {
        ConnectionFactory _connectionFactory;

        public UserRepositoryLocalDB(IConfiguration configuration)
        {
            _connectionFactory = new ConnectionFactory(configuration);
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> Get()
        {
            using (SqlConnection connection = _connectionFactory.GetConnection())
            {
                return connection.Query<User>("select * from users").ToList();
            }
        }

        public User Get(int id)
        {
            throw new NotImplementedException();
        }

        public User Get(string text)
        {
            throw new NotImplementedException();
        }

        public User Post(User pessoa)
        {
            throw new NotImplementedException();
        }

        public User Put(User pessoa)
        {
            throw new NotImplementedException();
        }
    }
}
