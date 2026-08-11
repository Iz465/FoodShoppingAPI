using FoodShoppingAPI.Data;
using FoodShoppingAPI.Dtos.Categories;
using FoodShoppingAPI.Interfaces;
using FoodShoppingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodShoppingAPI.Services
{
    public class CategoryService : ICategoryInterface
    {
        private readonly FoodDbContext _context;
        public CategoryService(FoodDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryDto>> GetCategories()
        {

            return await _context.Categories.Select(categories => new CategoryDto
            {
                Id = categories.Id,
                Name = categories.Name,
                ImageUrl = categories.ImageUrl
            }).ToListAsync();

        }

        public async Task<CategoryDto?> GetSpecificCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return null;

            CategoryDto categoryDto = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                ImageUrl = category.ImageUrl
            };

            return categoryDto;
        }

        public async Task<bool> UpdateCategory(int id, UpdateCategoryDto dto)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return false;

            category.Name = dto.Name;
            category.ImageUrl = dto.ImageUrl;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<CategoryDto> CreateCategory(CreateCategoryDto dto)
        {
            Category category = new Category
            {
                Name = dto.Name,
                ImageUrl = dto.ImageUrl
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                ImageUrl = category.ImageUrl
            };

        }

        public async Task<bool> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return false;

            _context.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
