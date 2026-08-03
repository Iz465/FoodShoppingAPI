using FoodShoppingAPI.Data;
using FoodShoppingAPI.Interfaces;
using FoodShoppingAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IFoodInterface, FoodService>();
builder.Services.AddScoped<ICategoryInterface, CategoryService>();

builder.Services.AddDbContext<FoodDbContext> // choosing FoodDbContext as the database context to start a session between the server and the database
    (options => options.UseSqlite("Data Source=foodshopping.db")); // Saying that database the databse should be created and make the  foodshopping.db file the database itself.
                                                                   // It will create that file if it doesnt exist. sqlite is a file based database.

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build(); // builds the application to be used after builder has configured it

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection(); // makes it so https is always used instead of http

app.UseAuthorization(); // checks user to make it stable.

app.MapControllers(); // tells the application which controller handles each request

app.Run(); // starts listening for incoming HTTP requests
