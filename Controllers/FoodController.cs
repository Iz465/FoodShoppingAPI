
using Microsoft.AspNetCore.Mvc;
using FoodShoppingAPI.Models;
using FoodShoppingAPI.Data;
using Microsoft.EntityFrameworkCore;




namespace FoodShoppingAPI.Controllers
{


    [ApiController]
    [Route("api/foods")]
    public class FoodController : ControllerBase
    {
        private readonly FoodDbContext _context;

        public FoodController(FoodDbContext context)
        {
            _context = context;
        }

     
        [HttpGet]
        public async Task<List<Food>> GetFoods(string? category, string? name, float? price)
        {
            // use this over null check because it checks for null, empty, or whitespace strings.
            if (string.IsNullOrWhiteSpace(category) && string.IsNullOrWhiteSpace(name) && price == null) 
                return await _context.Foods.ToListAsync();

            var query = _context.Foods.AsQueryable(); // IQueryable<Food> this is its type. using var though as you can figure that out with the asqueryable() method.


            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(food => food.Category == category);

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(food => food.Name == name);

            if (price != null)
                query = query.Where(food => food.Price == price);

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Food>> GetSpecificFood(int id) 
        {
            Food? food = await _context.Foods.FindAsync(id);

            if (food == null)
                return NotFound();

            return Ok(food);
        }


        [HttpPut("{id}")]

        public async Task<ActionResult> UpdateFood(int id, Food updatedFood)
        {
            if (id != updatedFood.Id)
                return BadRequest();

            Food? food = await _context.Foods.FindAsync(id);
            if (food == null)
                return NotFound();
            
            food.Name = updatedFood.Name;
            food.Price = updatedFood.Price;
            food.Quantity = updatedFood.Quantity;
            food.Category = updatedFood.Category;
            food.Description = updatedFood.Description;

            await _context.SaveChangesAsync();
            return Ok(food);
                
        }


        [HttpPost]

        public async Task<ActionResult<Food>> AddFood(Food newFood)
        {
         // no need to check id - database makes one every time data is added to the table
            _context.Foods.Add(newFood); 
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSpecificFood), new { id = newFood.Id }, newFood);
        }


        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteFood(int id)
        {
           
            Food? food = await _context.Foods.FindAsync(id);
            if (food == null)
                return NotFound();

            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();
            return NoContent();
            
             
           

        }


    }

 
}
