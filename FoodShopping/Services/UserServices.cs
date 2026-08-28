using FoodShoppingAPI.Data;
using FoodShoppingAPI.Dtos.UserDtos;
using FoodShoppingAPI.Enums;
using FoodShoppingAPI.Interfaces;
using FoodShoppingAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FoodShoppingAPI.Services
{
    public class UserServices : IUser
    {
        private readonly FoodDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserServices(FoodDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<List<UserDto>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            var usersDto = users.Select(user => new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                UserRole = user.RoleEnum.ToString()
            }).ToList();

            return usersDto;
        }

        public async Task<UserDto> GetSpecificUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return null!;

            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                UserRole = user.RoleEnum.ToString()
            };

            return userDto;
        }
    
        public async Task<EAuthentication> UpdateUser(int id, UpdateUserDto dto)
        {

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return EAuthentication.UserNotFound;


            if (!string.IsNullOrWhiteSpace(dto.OldPassword)) // must put in old password to verify its your account
            {
                var passwordMatches = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.OldPassword);
                if (passwordMatches == PasswordVerificationResult.Failed)
                    return EAuthentication.PasswordNotFound;

                if (!string.IsNullOrWhiteSpace(dto.NewPassword))
                {
                    if (dto.NewPassword != dto.NewPasswordAgain)
                        return EAuthentication.PasswordNotMatching;

                    user.PasswordHash = _passwordHasher.HashPassword(user, dto.NewPassword);
                }

                if (!string.IsNullOrWhiteSpace(dto.Username))
                    user.Username = dto.Username;

            }

            else
                return EAuthentication.PasswordNotFound;

         

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return EAuthentication.Success;
        }

        public async Task<EAuthentication> UpdateUserRole(int id, UpdateUserRoleDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return EAuthentication.UserNotFound;

            user.RoleEnum = dto.Role;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return EAuthentication.Success;
        }

        public async Task<UserDto> CreateUser(CreateUserDto dto)
        {
            bool userExists = await _context.Users.AnyAsync(user => user.Username == dto.Username);

            if (userExists)
                return null!;

            var user = new User
            {
                Username = dto.Username
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);
            user.RoleEnum = ERole.Member; // on register, every acocunt is a user, so that they can not make admin requests.

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            UserDto userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                UserRole = user.RoleEnum.ToString()
            };

            return userDto;
        }

        public async Task<string> LoginUser(LoginUserDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Username == dto.Username);
            if (user == null)
                return null!;

            var passwordMatches = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

            if (passwordMatches == PasswordVerificationResult.Failed)
                return null!;

            
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

            return jwt;

        }
        public async Task<EAuthentication> DeleteUser(int id)
        {
            User? user = await _context.Users.FindAsync(id);
            if (user == null)
                return EAuthentication.UserNotFound;

            _context.Remove(user);
            await _context.SaveChangesAsync();

            return EAuthentication.Success;
        }

 
    }
}
