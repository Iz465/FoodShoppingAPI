using FoodShoppingAPI.Dtos.Foods;
using FoodShoppingAPI.Enums;
using FoodShoppingAPI_BackEnd.Dtos.CartDtos;
using FoodShoppingAPI_BackEnd.Interfaces;
using FoodShoppingAPI_BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using System.Security.Claims;
using System.Xml;

namespace FoodShoppingAPI_BackEnd.Controllers
{
    [ApiController]
    [Route("Api/Cart")]
    public class CartController: ControllerBase
    {
        private readonly ICart _cartService;
        public CartController(ICart cartService)
        {
            _cartService = cartService;
        }

     

        [Authorize]
        [HttpPost]
        
        public async Task<ActionResult> AddToCart(CreateCartDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _cartService.AddFoodToCart(dto, userId);

            switch(result)
            {
                case ECart.UserNotFound: return NotFound("No User Id Matches");
                case ECart.FoodNotFound: return NotFound("No Food Id Found");
                case ECart.Success: return NoContent();
            }


            return NotFound();
        }

        [Authorize]
        [HttpGet("Quantity")]
        public async Task<int> GetFoodAmount()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine($"User Id is: {userId}");
            return await _cartService.GetFoodAmount(userId);

        }

    }
}
