using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BenchmarkNow.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Algorithm",
                columns: table => new
                {
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Algorithm", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "AlgorithmMeasurementResult",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AverageTime = table.Column<float>(type: "real", nullable: false),
                    StandardDeviation = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlgorithmMeasurementResult", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Measurements",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IpAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Browser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Measurements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Iterations = table.Column<int>(type: "int", nullable: false),
                    BinaryTrees = table.Column<int>(type: "int", nullable: false),
                    NBody = table.Column<int>(type: "int", nullable: false),
                    SpectralNorm = table.Column<int>(type: "int", nullable: false),
                    Fasta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlgorithmMeasurement",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AlgorithmName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Parameter = table.Column<int>(type: "int", nullable: false),
                    ResultId = table.Column<long>(type: "bigint", nullable: false),
                    MeasurementId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlgorithmMeasurement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlgorithmMeasurement_Algorithm_AlgorithmName",
                        column: x => x.AlgorithmName,
                        principalTable: "Algorithm",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlgorithmMeasurement_AlgorithmMeasurementResult_ResultId",
                        column: x => x.ResultId,
                        principalTable: "AlgorithmMeasurementResult",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlgorithmMeasurement_Measurements_MeasurementId",
                        column: x => x.MeasurementId,
                        principalTable: "Measurements",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserSettings",
                columns: table => new
                {
                    IpAddress = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SettingsId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSettings", x => x.IpAddress);
                    table.ForeignKey(
                        name: "FK_UserSettings_Settings_SettingsId",
                        column: x => x.SettingsId,
                        principalTable: "Settings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlgorithmMeasurement_AlgorithmName",
                table: "AlgorithmMeasurement",
                column: "AlgorithmName");

            migrationBuilder.CreateIndex(
                name: "IX_AlgorithmMeasurement_MeasurementId",
                table: "AlgorithmMeasurement",
                column: "MeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_AlgorithmMeasurement_ResultId",
                table: "AlgorithmMeasurement",
                column: "ResultId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSettings_SettingsId",
                table: "UserSettings",
                column: "SettingsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlgorithmMeasurement");

            migrationBuilder.DropTable(
                name: "UserSettings");

            migrationBuilder.DropTable(
                name: "Algorithm");

            migrationBuilder.DropTable(
                name: "AlgorithmMeasurementResult");

            migrationBuilder.DropTable(
                name: "Measurements");

            migrationBuilder.DropTable(
                name: "Settings");
        }
    }
}
