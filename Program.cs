using FoodShoppingAPI.Data;
using FoodShoppingAPI.Interfaces;
using FoodShoppingAPI.Models;
using FoodShoppingAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IFoodInterface, FoodService>();
builder.Services.AddScoped<ICategoryInterface, CategoryService>();
builder.Services.AddScoped<IUser, UserServices>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();


builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => // configuring the jwt options for what inside of the token needs to be validated.
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true, // this makes it so the server checks the jwt signature is valid.

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("Thesecretkey=2332512fdsfggh0reg23423423232234235235234343434") // the secret key to check the signature
            ),
            ValidateLifetime = true, // checks the jwt token hasn't expired.
            ValidateAudience = false,
            ValidateIssuer = false // both this ValidateIssuer & ValidateAudience need to be set to false here or it gives errors.
        };
    });


builder.Services.AddDbContext<FoodDbContext> 
    (options => options.UseSqlite("Data Source=foodshopping.db")); 
           

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
