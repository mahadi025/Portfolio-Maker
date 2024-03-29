﻿using API.Entities;

namespace API.DTOs;

public class ProjectDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Url { get; set; }
    public List<Skill> Skills { get; set; }
}
