using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Dtos.Categories
{
    public class UpdateCategoryDto
    {

        [StringLength(100)]
        public string? Name { get; set; } = string.Empty;

    
        [StringLength(100)]
        public string? ImageUrl { get; set; } = string.Empty;
    }
}
