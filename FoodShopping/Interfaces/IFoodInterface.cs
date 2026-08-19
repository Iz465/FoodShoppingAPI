using FoodShoppingAPI.Dtos.Foods;
using FoodShoppingAPI_BackEnd.Enums;

namespace FoodShoppingAPI.Interfaces
{
    public interface IFoodInterface
    {
        Task<List<FoodDto>> GetFoods(string? category, string? name, float? price,
            string? sortBy, bool descending, string? search, int? page, int? pageSize);
        Task<FoodDto> GetSpecificFood(int id);

        Task<EFood> UpdateFood(int id, UpdateFoodDto dto);

        Task<FoodDto> CreateFood(CreateFoodDto dto);

        Task<bool> DeleteFood(int id);
    }
}
