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

    // public async Task<List<Skill>> GetSkillsByProjectNameAsync(string projectName)
    // {
    //     return await _context.Skills
    //     .Where(x => x.Project.Name == projectName)
    //     .ToListAsync();
    // }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
