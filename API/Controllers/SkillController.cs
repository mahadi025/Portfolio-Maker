using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class SkillController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public SkillController(IUnitOfWork unitOfWork, IMapper mapper, DataContext context)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SkillDto>>> GetSkills()
    {
        var skills = await _unitOfWork.SkillRepository.GetSkillsAsync();

        var skillsToReturn = _mapper.Map<IEnumerable<SkillDto>>(skills);

        return Ok(skillsToReturn);
    }

    [HttpGet("{skillName}")]
    public async Task<ActionResult<SkillDto>> GetSkill(string skillName)
    {
        var skill = await _unitOfWork.SkillRepository.GetSkillByName(skillName.ToUpper());

        return _mapper.Map<SkillDto>(skill);
    }


    [HttpGet("get-skills-by-project/{projectName}")]
    public async Task<ActionResult<IEnumerable<SkillDto>>> GetSkillsByProject(string projectName)
    {
        var project = await _unitOfWork.ProjectRepository.GetProjectByNameAsync(projectName);

        if (project == null)
        {
            return NotFound();
        }

        var skills = await _unitOfWork.SkillRepository.GetSkillsByProjectNameAsync(project.Name);

        var skillsToReturn = _mapper.Map<IEnumerable<SkillDto>>(skills);

        return Ok(skillsToReturn);
    }

    [HttpPost]
    public async Task<ActionResult<SkillDto>> AddSkill(SkillDto skillDto)
    {
        if (await SkillExists(skillDto.Name.ToUpper())) return BadRequest("Skill already exist");

        var skill = new Skill
        {
            Name = skillDto.Name.ToUpper(),

        };

        _context.Skills.Add(skill);

        await _context.SaveChangesAsync();

        return new SkillDto
        {
            Id = skill.Id,
            Name = skill.Name,
        };
    }

    [HttpPut("{skillName}")]
    public async Task<ActionResult<SkillDto>> EditSkill([FromRoute] string skillName, [FromBody] SkillDto skillDto)
    {
        var skill = await _unitOfWork.SkillRepository.GetSkillByName(skillName.ToUpper());

        if (skill == null)
        {
            return NotFound();
        }

        skill.Name = skillDto.Name;

        await _context.SaveChangesAsync();

        var updatedSkillDto = _mapper.Map<SkillDto>(skill);

        return Ok(updatedSkillDto);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSkill(int id)
    {
        var skill = await _unitOfWork.SkillRepository.GetSkillById(id);

        if (skill == null)
        {
            return NotFound("Skill not found");
        }

        _unitOfWork.SkillRepository.DeleteSkill(skill);

        await _context.SaveChangesAsync();

        return Ok("Successfully deleted the skill");
    }


    private async Task<bool> SkillExists(string name)
    {
        return await _context.Skills.AnyAsync(x => x.Name == name);
    }

}