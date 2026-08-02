
using Microsoft.AspNetCore.Mvc;
using FoodShoppingAPI.Models;
using FoodShoppingAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using FoodShoppingAPI.Dtos.Food;



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
        public async Task<List<FoodDto>> GetFoods(string? category, string? name, float? price, // price should be decimal not float because float can round stuff up
             string? sortBy, bool descending, string? search, int? page, int? pageSize)
        {
  
            var query = _context.Foods.AsQueryable(); // IQueryable<Food> this is its type. using var though as you can figure that out with the asqueryable() method.

            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(food => food.Category.Name == category);

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(food => food.Name == name);

            if (price != null)
                query = query.Where(food => food.Price <= price);

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(food => food.Name.Contains(search));

            query = ApplySorting(query, sortBy, descending);

            if (page.HasValue && pageSize.HasValue)
            {
                if (string.IsNullOrWhiteSpace(sortBy))
                    query = query.OrderBy(food => food.Id);
      
                query = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value); // so it calculates how many pages are before the request page.
                                                                                            // then it figures out which data should be returned
                                                                                            // based on how much data is per page.
                                                                                            // In a way its saying how much data should i skip before i hand the data you want                                                                   
            }

            return await query.Select(food => new FoodDto
            {
                Id = food.Id,
                Name = food.Name,
                Price = food.Price,
                Quantity = food.Quantity,
                Category = food.Category.Name,
                Description = food.Description
            }).ToListAsync();
            
        }


        private static IQueryable<Food> ApplySorting(IQueryable<Food> query, string? sortBy, bool descending)
        {
            if (string.IsNullOrWhiteSpace(sortBy))
                return query;

            switch (sortBy)
            {
                case "name": query = descending ? query.OrderByDescending(food => food.Name) : query.OrderBy(food => food.Name); break;
                case "category": query = descending ? query.OrderByDescending(food => food.Category.Name) : query.OrderBy(food => food.Category.Name); break;
                case "price": query = descending ? query.OrderByDescending(food => food.Price) : query.OrderBy(food => food.Price); break;
            }

            return query;
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDto>> GetSpecificFood(int id) 
        {
            Food? food = await _context.Foods.FindAsync(id);

            if (food == null)
                return NotFound();

            FoodDto dto = new FoodDto 
            { 
                Id = food.Id,
                Name = food.Name,
                Price = food.Price,
                Quantity = food.Quantity,
                Category = food.Category.Name,
                Description = food.Description,
            };

            return Ok(dto);
        }


        [HttpPut("{id}")]

        public async Task<ActionResult> UpdateFood(int id, UpdateFoodDto dto)
        {
      
            
             Food? food = await _context.Foods.FindAsync(id);
             if (food == null)
                 return NotFound();

             bool categoryExists = await _context.Categories.AnyAsync(category => category.Id == dto.CategoryId);
             if (!categoryExists)
                 return NotFound();

             food.Name = dto.Name;
             food.Price = dto.Price;
             food.Quantity = dto.Quantity;
             food.CategoryId = dto.CategoryId;
             food.Description = dto.Description;

             await _context.SaveChangesAsync();
             return Ok();

        }


        [HttpPost]

        public async Task<ActionResult<FoodDto>> AddFood(CreateFoodDto dto)
        {

            Category? category = await _context.Categories.FindAsync(dto.CategoryId);
            if (category == null)
                return BadRequest("Request not found");

            Food food = new Food
            {
                Name = dto.Name,
                Price = dto.Price,
                Quantity = dto.Quantity,
                CategoryId = dto.CategoryId,
                Description = dto.Description
            };

    
            _context.Foods.Add(food); 
            await _context.SaveChangesAsync();


            
            FoodDto foodDto = new FoodDto
            {
                Id = food.Id,
                Name = food.Name,
                Price = food.Price,
                Quantity = food.Quantity,
                Category = category.Name,
                Description = food.Description
            };

            return CreatedAtAction(nameof(GetSpecificFood), new { id = food.Id }, foodDto);
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
