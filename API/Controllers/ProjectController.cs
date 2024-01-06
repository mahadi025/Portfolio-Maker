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

    // [HttpGet("{id}")]
    // public async Task<ActionResult<SubmitProjectDto>> GetProject(int id)
    // {
    //     var project = await _projectRepository.GetProjectIdAsync(id);

    //     return _mapper.Map<SubmitProjectDto>(project);
    // }

    [HttpGet("{username}")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsByUsername(string username)
    {
        var projects = await _projectRepository.GetProjectsByUserNameAsync(username);
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

    [HttpPut("add-skills-to-project")]
    public async Task<ActionResult<ProjectDto>> AddSkillToProject(ProjectDto projectDto)
    {
        var project = await _projectRepository.GetProject(projectDto.Name);

        if (project == null)
        {
            return NotFound();
        }

        foreach (var skillDto in projectDto.Skills)
        {
            // Check if the skill already exists in the database
            var existingSkill = await _context.Skills.FirstOrDefaultAsync(x => x.Name == skillDto.Name.ToUpper());

            if (existingSkill == null)
            {
                // If the skill doesn't exist, create a new one
                var newSkill = new Skill
                {
                    Name = skillDto.Name.ToUpper(),
                    // You may need to set other properties as needed
                };

                _context.Skills.Add(newSkill);
                project.Skills.Add(newSkill);
            }
            else
            {
                // If the skill already exists, associate it with the project
                project.Skills.Add(existingSkill);
            }
        }

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

    private async Task<bool> SkillExists(string skillName)
    {
        return await _context.Skills.AnyAsync(x => x.Name == skillName.ToUpper());
    }

}
