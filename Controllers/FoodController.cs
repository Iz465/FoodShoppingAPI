using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace FoodShoppingAPI.Controllers
{
   

    public class Food
    {
        public int id { get; set; } // makes it public if not specified
        public string name { get; set; } = "";
        public float price { get; set; }
        public int quantity { get; set; }
        public string category { get; set; } = "";
        public string description { get; set; } = "";
        public string expirationDate { get; set; } = "";
    };


    [ApiController]
    [Route("api/foods")]
    public class FoodController : ControllerBase
    {
        static List<Food> Foods = new List<Food> {
            new Food
            {
                id = 1,
                name = "Apple",
                price = 0.5f,
                quantity = 100,
                category = "Fruit",
                description = "A sweet red fruit",
                expirationDate = "2026-08-10"
            },
            new Food
            {
                id = 2,
                name = "Muffin",
                price = 2.0f,
                quantity = 20,
                category = "Bread",
                description = "A soft baked good",
                expirationDate = "2026-08-05"
            },
            new Food
            {
                id = 3,
                name = "Milk",
                price = 2.0f,
                quantity = 20,
                category = "Drink",
                description = "A nutritious drink",
                expirationDate = "2026-08-07"
            }
        };

        [HttpGet]
        public List<Food> GetFoods() { return Foods; }

        [HttpGet("{id}")]
        public Food GetSpecificFood(int id) { return Foods[id - 1]; }


        [HttpPut("{id}")]

        public void UpdateFood(int id)
        {
            for (int i = 0; i < Foods.Count(); i++)
            {
                if (i == id -1)
                {
                    Foods[i].name = "Tomato";
                    Foods[i].price = 1.0f;
                    Foods[i].quantity = 54;
                    Foods[i].category = "Vegetable";
                    Foods[i].description = "A red vegetable";
                    Foods[i].expirationDate = "2026-08-15";
                }
            }
        }
        

          
    }

 
}
