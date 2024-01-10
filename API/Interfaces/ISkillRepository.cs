using API.Entities;

namespace API.Interfaces;

public interface ISkillRepository
{
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Skill>> GetSkillsAsync();
    Task<Skill> GetSkillById(int id);
    Task<Skill> GetSkillByName(string skillName);
    Task<IEnumerable<Skill>> GetSkillsByProjectNameAsync(string projectName);
    void DeleteSkill(Skill skill);
}
