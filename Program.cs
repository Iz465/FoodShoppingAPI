var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
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
