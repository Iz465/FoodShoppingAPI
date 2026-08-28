using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI_BackEnd.Models
{
    public class Cart
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int FoodId { get; set; }

        public int FoodQuantity { get; set; } = 1;
    }
}
