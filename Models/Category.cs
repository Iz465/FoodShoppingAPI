using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty; // not using this for now so no validation

        public List<Food> Foods { get; set; } = new();
        

    }
}
