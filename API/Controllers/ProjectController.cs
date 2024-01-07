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
    private readonly ISkillRepository _skillRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public ProjectController(DataContext context, IProjectRepository projectRepository, ISkillRepository skillRepository, IUserRepository userRepository, IMapper mapper)
    {
        _context = context;
        _projectRepository = projectRepository;
        _skillRepository = skillRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
    {
        var projects = await _projectRepository.GetProjectsAsync();

        var projectsToReturn = _mapper.Map<IEnumerable<ProjectDto>>(projects);

        return Ok(projectsToReturn);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsByUsername(string username)
    {
        var projects = await _projectRepository.GetProjectsByUserNameAsync(username);

        if (projects == null)
        {
            return NotFound();
        }

        var projectsToReturn = _mapper.Map<IEnumerable<ProjectDto>>(projects);

        return Ok(projectsToReturn);
    }

    [HttpPost]
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
            Id = project.Id,
            Name = project.Name,
            Url = project.Url
        };
    }

    [HttpPut("edit-project/{projectName}")]
    public async Task<ActionResult<ProjectDto>> EditProject([FromRoute] string projectName, [FromBody] ProjectDto projectDto)
    {
        var project = await _projectRepository.GetProject(projectName);

        if (project == null)
        {
            return NotFound();
        }

        if (projectDto.Skills != null)
        {
            foreach (var skillDto in project.Skills)
            {
                var existingSkill = await _context.Skills.FirstOrDefaultAsync(x => x.Name == skillDto.Name.ToUpper());

                if (existingSkill == null)
                {
                    var newSkill = new Skill
                    {
                        Name = skillDto.Name.ToUpper()
                    };

                    _context.Skills.Add(newSkill);
                    project.Skills.Add(newSkill);
                }
                else
                {
                    project.Skills.Add(existingSkill);
                }
            }
        }

        if (projectDto.Name != null) project.Name = projectDto.Name;

        if (projectDto.Url != null) project.Url = projectDto.Url;

        if (projectDto.Description != null) project.Description = projectDto.Description;

        await _context.SaveChangesAsync();

        return new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Url = project.Url,
            Description = project.Description,
            Skills = project.Skills
        };
    }


    private async Task<bool> ProjectExists(string name)
    {
        return await _context.Projects.AnyAsync(x => x.Name == name);
    }
}
