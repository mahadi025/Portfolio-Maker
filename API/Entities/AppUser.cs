using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Gender { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string Introduction { get; set; }
    public List<Photo> Photos { get; set; } = new();
    public List<Project> Projects { get; set; } = new();

    public int GetAge()
    {
        return DateOfBirth.CalculateAge();
    }
}