using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Dtos.Categories
{
    public class UpdateCategoryDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ImageUrl { get; set; } = string.Empty;
    }
}
