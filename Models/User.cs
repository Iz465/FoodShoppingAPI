using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Models
{
    public enum Role
    {
        User,
        Admin,
        None
    }
    public class User
    {
        public int Id { get; set; }

        [Required][MinLength(5)][MaxLength(30)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public Role RoleEnum { get; set; }
    }
}
