using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class ProjectRegisterDto
{
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    public string Url { get; set; }

}
