using FoodShoppingAPI.Data;
using FoodShoppingAPI.Dtos.Categories;
using FoodShoppingAPI.Interfaces;
using FoodShoppingAPI.Models;
using FoodShoppingAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id, UpdateCategoryDto dto)
        {
            bool foundCategory = await _categoryService.UpdateCategory(id, dto);
       
            if (!foundCategory)
                return NotFound();

            return Ok();
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]

        public async Task<ActionResult> CreateCategory(CreateCategoryDto dto)
        {
            var categoryDto = await _categoryService.CreateCategory(dto);

            return CreatedAtAction(nameof(GetSpecificCategory),
                new { id = categoryDto.Id }, categoryDto);
        }

        [Authorize(Roles = "Admin")]
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
