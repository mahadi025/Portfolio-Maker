using API.Entities;

namespace API.Interfaces;

public interface ISkillRepository
{
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Skill>> GetSkillsAsync();
    // public Task<List<Skill>> GetSkillsByProjectNameAsync(string projectName);
}
