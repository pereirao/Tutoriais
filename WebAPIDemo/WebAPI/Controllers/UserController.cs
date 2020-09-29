using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<User> _userRepository;

        public class UserLogin
        {
            public string login { get; set; }
            public string senha { get; set; }
        }

        public UserController(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _userRepository.Get();
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserLogin userCredentials)
        {
            User user = _userRepository.Get(userCredentials.login);
            Response.Cookies.Append("user", "user1");
            Response.StatusCode = 200;
            return StatusCode(200);
        }
    }
}
