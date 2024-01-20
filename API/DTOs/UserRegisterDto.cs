﻿using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserRegisterDto
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Username { get; set; }
    public string KnownAs { get; set; }
    public string Gender { get; set; }
    [Required]
    public DateOnly? DateOfBirth { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; }
}