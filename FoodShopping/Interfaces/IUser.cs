using FoodShoppingAPI.Dtos.UserDtos;
using FoodShoppingAPI.Enums;
using FoodShoppingAPI.Models;

namespace FoodShoppingAPI.Interfaces
{
    public interface IUser
    {
        Task<List<UserDto>> GetUsers();
        Task<UserDto> GetSpecificUser(int id);
        Task<EAuthentication> UpdateUser(int id, UpdateUserDto dto);
        Task<UserDto> CreateUser(CreateUserDto dto);
        Task<EAuthentication> UpdateUserRole(int id, UpdateUserRoleDto dto);
        Task<string> LoginUser(LoginUserDto dto);
        Task<EAuthentication> DeleteUser(int id);

    


    }
}
