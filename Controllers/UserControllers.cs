using FoodShoppingAPI.Data;
using FoodShoppingAPI.Dtos.UserDtos;
using FoodShoppingAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace FoodShoppingAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserControllers : ControllerBase
    {
        private readonly FoodDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserControllers(FoodDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto dto)
        {
            bool userExists = await _context.Users.AnyAsync(user => user.Username == dto.Username);

            if (userExists)
                return Conflict();

            var user = new User
            {
                Username = dto.Username,
                RoleEnum = dto.UserRoleEnum
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);
               
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            UserDto userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                UserRoleEnum = user.RoleEnum.ToString()
            };

            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginToUser(LoginUserDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Username == dto.Username);
            if (user == null)
                return Unauthorized("Invalid username or password");

            var passwordMatches = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

            if (passwordMatches == PasswordVerificationResult.Failed)
                return Unauthorized("Invalid username or password");

            UserDto userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                UserRoleEnum = user.RoleEnum.ToString()
            };


            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.RoleEnum.ToString())
            };

            string secretKey = "Thesecretkey=2332512fdsfggh0reg23423423232234235235234343434";
            byte[] secretKeyByte = Encoding.UTF8.GetBytes(secretKey);

            var securityKey = new SymmetricSecurityKey(secretKeyByte);

            var credentials = new SigningCredentials
                (
                securityKey,
                SecurityAlgorithms.HmacSha256
                );

            var token = new JwtSecurityToken
            (
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            

            return Ok(jwt);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            User? user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
            
        }

    }

 
}
