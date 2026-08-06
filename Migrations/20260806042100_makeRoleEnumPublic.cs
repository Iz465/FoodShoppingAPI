using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodShoppingAPI.Migrations
{
    /// <inheritdoc />
    public partial class makeRoleEnumPublic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleEnum",
                table: "Users",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleEnum",
                table: "Users");
        }
    }
}
