using DVP.Controllers;
using ifxApp.Context;
using ifxApp.Controllers;
using ifxApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections;
using Xunit.Sdk;

namespace IfxAppTest
{
    public class IfxAppTesting
    {

        private readonly EmpleadosController _controller;
        private readonly IfxDBContext _dbContext;

        
        public IfxAppTesting()
        {
            _dbContext = new IfxDBContext();
            _controller = new EmpleadosController(_dbContext);
            
        }

        [Fact]
        public void Get_ok()
        {
            var result = _controller.GetEmpleado();

            Assert.IsType<Task<ActionResult<IEnumerable<Empleados>>>>(result);
        }

        [Fact]
        public void GetOkById()
        {
            int id = 1;
            var result = _controller.GetEmpleados(id);

            Assert.IsType<Task<ActionResult<Empleados>>>(result);
        }

        public EmpleadosController Get_controller()
        {
            return _controller;
        }

        [Fact]
        public void PutEmpleados()
        {
            int id = 1;
            Empleados empleado = new Empleados();

            var result = _controller.PutEmpleados(id, empleado);

            Assert.IsType<Task<IActionResult>>(result);


        }
    }
}