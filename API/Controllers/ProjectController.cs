using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProjectController : BaseApiController
{
    private readonly DataContext _context;
    private readonly IProjectRepository _projectRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public ProjectController(DataContext context, IProjectRepository projectRepository, IUserRepository userRepository, IMapper mapper)
    {
        _context = context;
        _projectRepository = projectRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SubmitProjectDto>>> GetProjects()
    {
        var projects = await _projectRepository.GetProjectsAsync();

        var projectsToReturn = _mapper.Map<IEnumerable<SubmitProjectDto>>(projects);

        return Ok(projectsToReturn);
    }

    // [HttpGet("{id}")]
    // public async Task<ActionResult<SubmitProjectDto>> GetProject(int id)
    // {
    //     var project = await _projectRepository.GetProjectIdAsync(id);

    //     return _mapper.Map<SubmitProjectDto>(project);
    // }

    [HttpGet("{username}")]
    public async Task<ActionResult<IEnumerable<SubmitProjectDto>>> GetProjectsByUsername(string username)
    {
        var projects = await _projectRepository.GetProjectsByUserNameAsync(username);
        var projectsToReturn = _mapper.Map<IEnumerable<SubmitProjectDto>>(projects);
        return Ok(projectsToReturn);
    }

    [HttpPost("add-project")]
    public async Task<ActionResult<ProjectDto>> Register(ProjectRegisterDto registerDto)
    {
        if (await ProjectExists(registerDto.Name)) return BadRequest("Project already exist");

        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        if (user == null)
        {
            return NotFound();
        }

        var project = new Project
        {
            Name = registerDto.Name,
            Url = registerDto.Url,
            AppUser = user,
        };

        _context.Projects.Add(project);

        await _context.SaveChangesAsync();

        return new ProjectDto
        {
            Name = project.Name,
            Url = project.Url
        };
    }

    private async Task<bool> ProjectExists(string name)
    {
        return await _context.Projects.AnyAsync(x => x.Name == name);
    }

}
