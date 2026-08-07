using FoodShoppingAPI.Enums;
using FoodShoppingAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Dtos.UserDtos
{

    public class UpdateUserRoleDto
    {
        [Required]
        public ERole Role { get; set; }
    }
}
