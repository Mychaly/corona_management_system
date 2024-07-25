using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Corona_system_server.Data.Migrations
{
    /// <inheritdoc />
    public partial class MigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PersonDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tz = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    houseNumber = table.Column<int>(type: "int", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobilePhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Photo = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CoronaDetails",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PositiveResultDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecoveryDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateA = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateB = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateC = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManufacturerA = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManufacturerB = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManufacturerC = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManufacturerD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoronaDetails", x => x.id);
                    table.ForeignKey(
                        name: "FK_CoronaDetails_PersonDetails_PersonId",
                        column: x => x.PersonId,
                        principalTable: "PersonDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CoronaDetails_PersonId",
                table: "CoronaDetails",
                column: "PersonId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CoronaDetails");

            migrationBuilder.DropTable(
                name: "PersonDetails");
        }
    }
}
