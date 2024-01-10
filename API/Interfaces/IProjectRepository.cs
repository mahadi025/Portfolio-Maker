using API.Entities;

namespace API.Interfaces;

public interface IProjectRepository
{
    void update(Project project);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Project>> GetProjectsAsync();
    Task<Project> GetProjectByIdAsync(int id);
    Task<Project> GetProjectByNameAsync(string projectName);
    Task<List<Project>> GetProjectsByUserNameAsync(string username);
    void DeleteProject(Project project);

}
