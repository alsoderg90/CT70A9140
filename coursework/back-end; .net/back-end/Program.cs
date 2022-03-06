using Microsoft.EntityFrameworkCore;
using back_end.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PersonContext>(opt => opt.UseInMemoryDatabase("CustomerList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var CorsPolicy = "devCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, builder => {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors(CorsPolicy);

app.MapGet("/api/persons", async (PersonContext db) =>
    await db.Persons.ToListAsync());

app.MapGet("/api/persons/{id}", async (int id, PersonContext db) =>
    await db.Persons.FindAsync(id)
        is Person person
            ? Results.Ok(person)
            : Results.NotFound());

app.MapPost("/api/persons", async (Person person, PersonContext db) =>
    {
        System.Console.WriteLine(person);
        db.Persons.Add(person);
        await db.SaveChangesAsync();

        return Results.Created($"/persons/{person.Id}", person);
    }) ;

app.MapPut("/api/persons/{id}", async (int id, Person newPerson, PersonContext db) =>
{
    var oldPerson = await db.Persons.FindAsync(id);

    if (oldPerson is null) return Results.NotFound();

    oldPerson.FirstName = newPerson.FirstName;

    oldPerson.SurName = newPerson.SurName;

    oldPerson.Age = newPerson.Age;

    await db.SaveChangesAsync();

    return Results.Ok(oldPerson);
});

app.MapDelete("/api/persons/{id}", async (int id, PersonContext db) =>
    {
        if (await db.Persons.FindAsync(id) is Person person)
        {
            db.Persons.Remove(person);
            await db.SaveChangesAsync();
            return Results.Ok(person);
        }
    return Results.NotFound();
});

app.Run();
