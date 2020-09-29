using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Repositories
{
    public class ConnectionFactory
    {
        private string _connectionString;
        public ConnectionFactory(IConfiguration configuration)
        {
            _connectionString = configuration["connectionString"];
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
