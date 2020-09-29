using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaRepository _pessoaRepository;

        public PessoaController(IConfiguration configuration, IPessoaRepository pessoaRepository)
        {
            string connectionString = configuration["connectionString"];
            _pessoaRepository = pessoaRepository;
        }

        // GET: api/<PessoaController>
        [HttpGet]
        public IEnumerable<Pessoa> Get()
        {
            return _pessoaRepository.Get();
        }

        // GET api/<PessoaController>/5
        [HttpGet("{id}")]
        public Pessoa Get(int id)
        {
            return _pessoaRepository.Get(id);
        }

        // POST api/<PessoaController>
        [HttpPost]
        public Pessoa Post([FromBody] Pessoa pessoa)
        {
            return _pessoaRepository.Post(pessoa);
        }

        // PUT api/<PessoaController>/5
        [HttpPut("{id}")]
        public Pessoa Put(int id, [FromBody] Pessoa pessoa)
        {
            return _pessoaRepository.Put(pessoa);
        }

        // DELETE api/<PessoaController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _pessoaRepository.Delete(id);
        }
    }
}
