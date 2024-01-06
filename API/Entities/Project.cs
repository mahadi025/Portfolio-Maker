namespace API.Entities;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Url { get; set; }
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public List<Skill> Skills { get; set; } = new();
}
