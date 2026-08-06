using FoodShoppingAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Dtos.UserDtos
{
    public class CreateUserDto
    {
        [Required] [MinLength(5)] [MaxLength(30)]
        public string Username { get; set; } = string.Empty;

        [Required] [MinLength(5)] [MaxLength(30)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public Role UserRoleEnum { get; set; }
    }
}
