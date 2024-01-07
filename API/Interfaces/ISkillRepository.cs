using API.Entities;

namespace API.Interfaces;

public interface ISkillRepository
{
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Skill>> GetSkillsAsync();
    public Task<Skill> GetSkillByName(string skillName);
    public Task<IEnumerable<Skill>> GetSkillsByProjectNameAsync(string projectName);
}
