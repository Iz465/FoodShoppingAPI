
using Microsoft.AspNetCore.Mvc;
using FoodShoppingAPI.Models;
using FoodShoppingAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using FoodShoppingAPI.Dtos.Foods;
using FoodShoppingAPI.Services;
using FoodShoppingAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;



namespace FoodShoppingAPI.Controllers
{


    [ApiController]
    [Route("api/foods")]
    public class FoodController : ControllerBase
    {

        private readonly IFoodInterface _foodService;
        public FoodController(IFoodInterface foodService)
        {
            _foodService = foodService;
        }


        [Authorize(Roles = "Admin")]
        [HttpGet]
        
        public async Task<List<FoodDto>> GetFoods(string? category, string? name, float? price, // price should be decimal not float because float can round stuff up
             string? sortBy, bool descending, string? search, int? page, int? pageSize)
        {
            return await _foodService.GetFoods(category, name, price,
                sortBy, descending, search, page, pageSize);
                
        }




        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDto>> GetSpecificFood(int id) 
        {
            FoodDto? dto = await _foodService.GetSpecificFood(id);
            if (dto == null)
                return NotFound();

            return Ok(dto);
        }


        [HttpPut("{id}")]

        public async Task<ActionResult> UpdateFood(int id, UpdateFoodDto dto)
        {
            bool foodFound = await _foodService.UpdateFood(id, dto);

            if (!foodFound)
                return NotFound();
          
             return Ok();

        }


        [HttpPost]

        public async Task<ActionResult<FoodDto>> CreateFood(CreateFoodDto dto)
        {

            FoodDto? foodDto = await _foodService.CreateFood(dto);

            if (foodDto == null)
                return NotFound();

            return CreatedAtAction(nameof(GetSpecificFood), new { id = foodDto.Id }, foodDto);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFood(int id)
        {

            bool FoodDeleted = await _foodService.DeleteFood(id);

            if (!FoodDeleted)
                return NotFound();

            return NoContent();
         
        }


    }

 
}
