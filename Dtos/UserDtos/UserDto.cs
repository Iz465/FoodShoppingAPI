using FoodShoppingAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Dtos.UserDtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string UserRoleEnum { get; set; } = string.Empty;

    }
}
