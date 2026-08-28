using FoodShoppingAPI.Data;
using FoodShoppingAPI.Dtos.Foods;
using FoodShoppingAPI.Interfaces;
using FoodShoppingAPI.Models;
using FoodShoppingAPI_BackEnd.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace FoodShoppingAPI.Services
{
    public class FoodService : IFoodInterface
    {

            private readonly FoodDbContext _context;

            public FoodService(FoodDbContext context)
            {
                _context = context;
            }


            public async Task<List<FoodDto>> GetFoods(int? categoryId, string? name, float? price,
             string? sortBy, bool descending, string? search, int? page, int? pageSize)
        {
            var query = _context.Foods.AsQueryable(); // IQueryable<Food> this is its type. using var though as you can figure that out with the asqueryable() method.

            if (categoryId != null)
                query = query.Where(food => food.CategoryId == categoryId);

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

                query = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value);

            }

            return await query.Select(food => new FoodDto
            {
                Id = food.Id,
                Name = food.Name,
                Price = food.Price,
                Category = food.Category.Name,
                ImageUrl = food.ImageUrl
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


        public async Task<FoodDto> GetSpecificFood(int id)
        {
            var dto = await _context.Foods.Select(food => new FoodDto
            {
                Id = food.Id,
                Name = food.Name,
                Price = food.Price,
                Category = food.Category.Name,
                ImageUrl = food.ImageUrl
            }).FirstOrDefaultAsync(food => food.Id == id);

            return dto!;
        }

        public async Task<EFood> UpdateFood(int id, UpdateFoodDto dto)
        {


            Food? food = await _context.Foods.FindAsync(id);
            if (food == null)
                return EFood.FoodNotFound;

            if(dto.CategoryId != null)
            {
                bool categoryExists = await _context.Categories.AnyAsync(category => category.Id == dto.CategoryId);
                if (!categoryExists)
                    return EFood.CategoryNotMatching;
                food.CategoryId = dto.CategoryId.Value;
            }
            
            if(dto.Name != null)
                food.Name = dto.Name;
            if(dto.Price != null)
                food.Price = dto.Price.Value;
            if (dto.ImageUrl != null)
                food.ImageUrl = dto.ImageUrl;
          
            await _context.SaveChangesAsync();
            return EFood.FoodEdited;

        }

        public async Task<FoodDto> CreateFood(CreateFoodDto dto)
        {
      
            Category? category = await _context.Categories.FindAsync(dto.CategoryId);
            if (category == null)
                return null!;

            Food food = new Food
            {
                Name = dto.Name,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.ImageUrl
      
            };

            _context.Foods.Add(food);
            await _context.SaveChangesAsync();

           

            FoodDto foodDto = new FoodDto
            {
                Id = food.Id,
                Name = food.Name,
                Price = food.Price,
                Category = category.Name,
                ImageUrl = food.ImageUrl
               
            };

            return foodDto;
        }

        public async Task<bool> DeleteFood(int id)
        {

            Food? food = await _context.Foods.FindAsync(id);
            if (food == null)
                return false;

            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();
            return true;

        }
    }

   
}