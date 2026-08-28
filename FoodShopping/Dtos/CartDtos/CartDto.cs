using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI_BackEnd.Dtos.CartDtos
{
    public class CartDto
    {
        [Required]
        public string Food { get; set; } = string.Empty;

        [Required]
        public int FoodQuantity { get; set; }
    }
}
