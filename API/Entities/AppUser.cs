using API.Extensions;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string KnownAs { get; set; }
    public string Gender { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string Introduction { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public List<Photo> Photos { get; set; } = new();
    public List<Project> Projects { get; set; } = new();

    public int GetAge()
    {
        return DateOfBirth.CalculateAge();
    }
}