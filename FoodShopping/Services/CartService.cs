using FoodShoppingAPI.Data;
using FoodShoppingAPI.Enums;
using FoodShoppingAPI.Models;
using FoodShoppingAPI_BackEnd.Dtos.CartDtos;
using FoodShoppingAPI_BackEnd.Interfaces;
using FoodShoppingAPI_BackEnd.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace FoodShoppingAPI_BackEnd.Services
{
    public class CartService: ICart
    {
        private readonly FoodDbContext _context;
        public CartService(FoodDbContext context)
        {
            _context = context;
        }

        public async Task<ECart> AddFoodToCart(CreateCartDto dto, string? userId)
        {
           
            if (userId == null)
                return ECart.UserNotFound;

            var food = await _context.Foods.FindAsync(dto.FoodId);
            if (food == null)
                return ECart.FoodNotFound;

            
            var cart = await _context.Cart.FirstOrDefaultAsync(cart => cart.FoodId == dto.FoodId && cart.UserId == int.Parse(userId));
            if(cart != null)
            {
                cart.FoodQuantity++;
                _context.Cart.Update(cart);
            }
                
            
            else
            {
                cart = new Cart
                {
                    UserId = int.Parse(userId),
                    FoodId = dto.FoodId,
                    FoodQuantity = dto.FoodQuantity

                };
                _context.Cart.Add(cart);
            }
           

          
            await _context.SaveChangesAsync();

            return ECart.Success;
        }

        public async Task<int> GetFoodAmount(string? userId)
        {

            int foodQuantity = 0;

            if (userId == null)
                return foodQuantity;

            IQueryable<Cart> query = _context.Cart.AsQueryable();

            if (query == null)
                return foodQuantity;

            List<Cart> userCart = await query.Where(cart => cart.UserId == int.Parse(userId)).ToListAsync();

            foreach(var food in userCart)
            {
                foodQuantity += food.FoodQuantity;
            }



            return foodQuantity;
        }
    }
}
