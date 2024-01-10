using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class SkillRepository : ISkillRepository
{
    private readonly DataContext _context;

    public SkillRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Skill>> GetSkillsAsync()
    {
        return await _context.Skills.ToListAsync();
    }

    public async Task<Skill> GetSkillById(int id)
    {
        return await _context.Skills.SingleOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Skill> GetSkillByName(string skillName)
    {
        return await _context.Skills.SingleOrDefaultAsync(s => s.Name == skillName);
    }

    public async Task<IEnumerable<Skill>> GetSkillsByProjectNameAsync(string projectName)
    {
        var project = await _context.Projects.Include(p => p.Skills).SingleOrDefaultAsync(p => p.Name == projectName);

        Console.WriteLine($"Project: {project.Name}, Skills Count: {project.Skills.Count}");

        return project.Skills;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void DeleteSkill(Skill skill)
    {
        _context.Skills.Remove(skill);
    }
}
