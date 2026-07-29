namespace FoodShoppingAPI.Models
{
    public class Food
    {
        public int Id { get; set; } // makes it public if not specified
        public string Name { get; set; } = "";
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; } = "";
        public string Description { get; set; } = "";
    };

}
