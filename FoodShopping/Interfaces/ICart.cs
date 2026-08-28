using FoodShoppingAPI.Enums;
using FoodShoppingAPI_BackEnd.Dtos.CartDtos;
using FoodShoppingAPI_BackEnd.Models;

namespace FoodShoppingAPI_BackEnd.Interfaces
{
    public interface ICart
    {
        Task<ECart> AddFoodToCart(CreateCartDto dto, string? userId);
        Task<int> GetFoodAmount(string? userId);
    }
}
