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
using FoodShoppingAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using FoodShoppingAPI.Enums;

namespace FoodShoppingAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserControllers : ControllerBase
    {

        private readonly IUser _userService;
    
        public UserControllers(IUser userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet] 
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
          
            List<UserDto> users = new();
            return Ok(users = await _userService.GetUsers());
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetSpecificUser(int id)
        {
            UserDto user = await _userService.GetSpecificUser(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<UserDto>> CurrentUserProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return NotFound("User Not Found");

            UserDto user = await _userService.CurrentUserProfile(int.Parse(userId));

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto dto)
        {
            UserDto userDto = await _userService.CreateUser(dto);

            if (userDto == null)
                return Conflict();

            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginToUser(LoginUserDto dto)
        {
            string jwtToken = await _userService.LoginUser(dto);

            if (jwtToken == null)
                return Unauthorized("Invalid Username or Password");

            return Ok(jwtToken);

        }

        [Authorize]
        [HttpPut("profile")]
        public async Task<ActionResult> UpdateUser(UpdateUserDto dto)
        {
            
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return NotFound("User Not Found");

            EAuthentication authentication = await _userService.UpdateUser(int.Parse(userId), dto);

            switch (authentication)
            {
                case EAuthentication.UserNotFound: return NotFound("User not found");
                case EAuthentication.PasswordNotFound: return BadRequest("Password incorrect");
                case EAuthentication.PasswordNotMatching: return BadRequest("New passwords not matching");
                case EAuthentication.Success: return NoContent();
                default: return NoContent(); 
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPut("role/{id}")]
        public async Task<ActionResult<EAuthentication>> UpdateUserRole(int id, UpdateUserRoleDto dto)
        {
            EAuthentication authentication = await _userService.UpdateUserRole(id, dto);

            switch (authentication)
            {
                case EAuthentication.UserNotFound: return NotFound("User not found");
                default: return NoContent();
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {

            var foundUser = await _userService.DeleteUser(id);

            if (foundUser == EAuthentication.UserNotFound)
                return NotFound();

            return NoContent(); 
        }

        [Authorize (Roles = "Admin")]
        [HttpGet("homePage/")]

        public async Task<ActionResult> CheckAuthentication()
        {
            return Ok(true);
        }
    }

 
}
