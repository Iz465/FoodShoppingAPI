using FoodShoppingAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Models
{
 
    public class User
    {
        public int Id { get; set; }

        [Required][MinLength(5)][MaxLength(30)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public ERole RoleEnum { get; set; }
    }
}
