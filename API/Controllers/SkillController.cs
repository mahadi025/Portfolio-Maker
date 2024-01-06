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
    private readonly ISkillRepository _skillRepository;
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public SkillController(ISkillRepository skillRepository, IMapper mapper, DataContext context)
    {
        _skillRepository = skillRepository;
        _mapper = mapper;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SkillDto>>> GetSkills()
    {
        var skills = await _skillRepository.GetSkillsAsync();

        var skillsToReturn = _mapper.Map<IEnumerable<SkillDto>>(skills);

        return Ok(skillsToReturn);
    }

    // [HttpGet("{skillName}")]
    // public async Task<ActionResult<IEnumerable<SkillDto>>> GetSkill(string skillName)
    // {
    //     var skill = await _skillRepository.GetSkillsByProjectNameAsync(skillName);
    //     var skillToReturn = _mapper.Map<IEnumerable<SkillDto>>(skill);
    //     return Ok(skillToReturn);
    // }

    [HttpPost]
    public async Task<ActionResult<SkillDto>> AddSkill(SkillDto skillDto)
    {
        if (await SkillExists(skillDto.Name)) return BadRequest("Skill already exist");

        var skill = new Skill
        {
            Name = skillDto.Name,

        };

        _context.Skills.Add(skill);

        await _context.SaveChangesAsync();

        return new SkillDto
        {
            Id = skill.Id,
            Name = skill.Name,
        };
    }

    private async Task<bool> SkillExists(string name)
    {
        return await _context.Skills.AnyAsync(x => x.Name == name);
    }

}