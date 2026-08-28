using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI_BackEnd.Dtos.CartDtos
{
    public class CreateCartDto
    {
        [Required]
        public int FoodId { get; set; }

        [Required]
        public int FoodQuantity { get; set; }
    }
}
