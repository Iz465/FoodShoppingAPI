
using Microsoft.AspNetCore.Mvc;
using FoodShoppingAPI.Models;
using FoodShoppingAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;




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
        public async Task<List<Food>> GetFoods(string? category, string? name, float? price, // price should be decimal not float because float can round stuff up
             string? sortBy, bool descending, string? search)
        {
  
            var query = _context.Foods.AsQueryable(); // IQueryable<Food> this is its type. using var though as you can figure that out with the asqueryable() method.


            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(food => food.Category == category);

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(food => food.Name == name);

            if (price != null)
                query = query.Where(food => food.Price <= price);

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(food => food.Name.Contains(search));

            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                if (descending)
                {
                    switch (sortBy)
                    {
                        case "name": query = query.OrderByDescending(food => food.Name); break;
                        case "category": query = query.OrderByDescending(food => food.Category); break;
                        case "price": query = query.OrderByDescending(food => food.Price); break;
                    }

                   
                }

                else
                {
                    switch (sortBy)
                    {
                        case "name": query = query.OrderBy(food => food.Name); break;
                        case "category": query = query.OrderBy(food => food.Category); break;
                        case "price": query = query.OrderBy(food => food.Price); break;
                    }
                }                                    
            }

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
