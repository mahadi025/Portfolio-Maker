﻿using API.Entities;

namespace API.DTOs;

public class MemberDto
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string PhotoUrl { get; set; }
    public int Age { get; set; }
    public string KnownAs { get; set; }
    public string Gender { get; set; }
    public string Introduction { get; set; }
    public string Country { get; set; }
    public List<PhotoDto> Photos { get; set; }
    public List<ProjectDto> Projects { get; set; }
}
