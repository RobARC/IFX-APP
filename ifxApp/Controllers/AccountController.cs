using ifxApp.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ifxApp.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace DVP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IfxDBContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IfxDBContext context,
            IConfiguration configuration)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;
            this._configuration = configuration;
        }

      
        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] Usuarios usuarios)
        {
            //Chequear si existe el usuario

            var userExist = _userManager.FindByEmailAsync(usuarios.Email).Result;
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "El usuario ya esta registrado!" });
            }

            //Agregar el Usuario a la BD
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = usuarios.UserName, Email = usuarios.Email,
                                                 PasswordHash = usuarios.Password};
                var result = await _userManager.CreateAsync(user, usuarios.Password);
                if (result.Succeeded)
                {
                    return Ok(usuarios);
                }
                else
                {
                    return BadRequest("Username or password invalid");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserInfo userInfo)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(userInfo.Email, userInfo.Password, isPersistent: false, lockoutOnFailure: false);

                var rolExist = _roleManager.FindByNameAsync("Administrador").Result;


                if (result != null)
                {
                    return BuildToken(userInfo);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return BadRequest(ModelState);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        private IActionResult BuildToken(UserInfo userInfo)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Super_Secret_Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(1);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: "yourdomain.com",
               audience: "yourdomain.com",
               claims: claims,
               expires: expiration,
               signingCredentials: creds);

            

            var role = (from _rol in _context.Roles
                        join _roles in _context.UserRoles
                        on _rol.Id equals _roles.RoleId
                        join _usuario in _context.Users
                        on _roles.UserId equals _usuario.Id
                        where _usuario.Email == userInfo.Email
                        select new
                        {
                            role = _rol.Name
                        }).ToList();

           var  roleObtenido = role[0];        
          

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration,
                roleObtenido.role
            });

        }
    }
}

