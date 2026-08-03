using FoodShoppingAPI.Data;
using FoodShoppingAPI.Models;
using FoodShoppingAPI.Dtos.Categories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodShoppingAPI.Services;
using FoodShoppingAPI.Interfaces;

namespace FoodShoppingAPI.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryInterface _categoryService;

        public CategoryController(ICategoryInterface service)
        {
            _categoryService = service;
        }

        [HttpGet]
        public async Task<List<CategoryDto>> GetCategories()
        {
            return await _categoryService.GetCategories();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<CategoryDto>> GetSpecificCategory(int id)
        {
            CategoryDto? dto = await _categoryService.GetSpecificCategory(id);
            if (dto == null)
                return NotFound();
            return Ok(dto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id, UpdateCategoryDto dto)
        {
            bool foundCategory = await _categoryService.UpdateCategory(id, dto);

            if (!foundCategory)
                return NotFound();

            return Ok();
        }


        [HttpPost]

        public async Task<ActionResult> CreateCategory(CreateCategoryDto dto)
        {
            var categoryDto = await _categoryService.CreateCategory(dto);

            return CreatedAtAction(nameof(GetSpecificCategory),
                new { id = categoryDto.Id }, categoryDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            bool foundCategory = await _categoryService.DeleteCategory(id);
            if (!foundCategory)
                return NotFound();

            return NoContent();
        }
    }
}
