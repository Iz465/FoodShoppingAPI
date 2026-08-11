using FoodShoppingAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Dtos.UserDtos
{

    public class UpdateUserDto
    {
        [MinLength(5)] [MaxLength(30)]
        public string? Username { get; set; } 

        public string? OldPassword { get; set; } 

        [MinLength(5)] [MaxLength(30)]
        public string? NewPassword { get; set; }
        public string? NewPasswordAgain { get; set; } 

    }
}
