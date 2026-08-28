using FoodShoppingAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Dtos.Foods
{
    public class UpdateFoodDto
    {
       
  
        [StringLength(100)]
        public string? Name { get; set; } = string.Empty;

        [Range(.1, 1000)]
        public float? Price { get; set; }
        public int? CategoryId { get; set; }
        public string? ImageUrl { get; set; } = string.Empty;

    }
}
