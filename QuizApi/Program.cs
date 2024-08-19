var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/api/quiz", (QuizAnswers answers) =>
{
    int correctAnswers = 0;

    if (answers.Q1 == "C") correctAnswers++;
    if (answers.Q2 == "A") correctAnswers++;
    if (answers.Q3 == "A") correctAnswers++;

    if (correctAnswers == 3)
        return Results.Ok(new { message = "Congratulations! All correct" });
    else
        return Results.Ok(new { message = $"Bad luck. {3 - correctAnswers} of your answers are incorrect." });
})
.WithName("CheckAnswers")
.WithOpenApi();

app.Run();

record QuizAnswers(string Q1, string Q2, string Q3);
