using FoodShoppingAPI.Dtos.Categories;

namespace FoodShoppingAPI.Interfaces
{
    public interface ICategoryInterface
    {
        Task<List<CategoryDto>> GetCategories();
        Task<CategoryDto?> GetSpecificCategory(int id);
        Task<bool> UpdateCategory(int id, UpdateCategoryDto dto);
        Task<CategoryDto> CreateCategory(CreateCategoryDto dto);
        Task<bool> DeleteCategory(int id);
    }
}
