using System.ComponentModel.DataAnnotations;

namespace FoodShoppingAPI.Models
{
    public class Food
    {
        public int Id { get; set; } // makes it public if not specified

        [Required] [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(.1, 1000)]
        public float Price { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public int CategoryId { get; set; } 

        [Required]
        public Category Category { get; set; } = null!;

    };

}
