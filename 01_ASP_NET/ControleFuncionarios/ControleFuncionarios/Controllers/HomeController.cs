using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFuncionarios.Models;
using ControleFuncionarios.ViewModels.Home;
using Microsoft.AspNetCore.Mvc;

namespace ControleFuncionarios.Controllers
{
    public class HomeController : Controller
    {
        private readonly IFuncionarioRepository _funcionarioRepository;
        private readonly IDepartamentoRepository _departamentoRepository;

        public HomeController(IFuncionarioRepository funcionarioRepository, IDepartamentoRepository departamentoRepository)
        {
            _funcionarioRepository = funcionarioRepository;
            _departamentoRepository = departamentoRepository;
        }

        public IActionResult Index()
        {
            return View(_funcionarioRepository.GetFuncionarios());
        }

        public IActionResult Detalhes(int id)
        {
            DetalheViewModel detalheViewModel = new DetalheViewModel()
            {
                Titulo = "Detalhes do funcionário",
                Funcionario = _funcionarioRepository.GetFuncionario(id)
            };
            return View(detalheViewModel);
        }

        [HttpGet]
        public IActionResult Criar()
        {
            ViewBag.Departamentos = _departamentoRepository.GetDepartamentos();
            return View();
        }

        [HttpPost]
        public IActionResult Criar(Funcionario funcionario)
        {
            Funcionario novoFncionario = _funcionarioRepository.Save(funcionario);

            return RedirectToAction("Detalhes", "Home", new { id = novoFncionario.Id });
        }
    }
}