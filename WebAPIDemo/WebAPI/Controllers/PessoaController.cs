using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaRepository _pessoaRepository;

        public PessoaController(IPessoaRepository pessoaRepository)
        {
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
