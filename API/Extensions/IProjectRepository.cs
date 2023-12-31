using API.Entities;

namespace API.Interfaces;

public interface IProjectRepository
{
    void update(Project project);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Project>> GetProjectsAsync();
    Task<Project> GetProjectIdAsync(int id);
    // Task<Project> GetProjectByNameAsync(string name);

}
