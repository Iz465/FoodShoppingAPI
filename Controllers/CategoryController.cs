using FoodShoppingAPI.Data;
using FoodShoppingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodShoppingAPI.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        FoodDbContext _context;
        public CategoryController(FoodDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var category = await _context.Categories.ToListAsync();

            return category;
        }
    }
}
