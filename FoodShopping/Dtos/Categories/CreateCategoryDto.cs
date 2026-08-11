using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Dtos.Categories
{
    public class CreateCategoryDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;
    }
}
