using Microsoft.AspNetCore.Routing.Constraints;
using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI_BackEnd.Dtos.CartDtos
{
    public class CartDto
    {

        [Required]
        public int Id { get; set; }

        [Required]
        public string Food { get; set; } = string.Empty;

        [Required]
        public int Quantity { get; set; }

        [Required]
        public float TotalPrice { get; set; }
    }
}
