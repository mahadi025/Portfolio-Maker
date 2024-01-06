using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ProjectRepository : IProjectRepository
{
    private readonly DataContext _context;

    public ProjectRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<List<Project>> GetProjectsByUserNameAsync(string username)
    {
        return await _context.Projects
        .Where(x => x.AppUser.UserName == username)
        .ToListAsync();
    }

    public async Task<IEnumerable<Project>> GetProjectsAsync()
    {
        return await _context.Projects.Include(p => p.Skills).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void update(Project project)
    {
        _context.Entry(project).State = EntityState.Modified;
    }

    public async Task<Project> GetProject(string projectName)
    {
        return await _context.Projects.SingleOrDefaultAsync(p => p.Name == projectName);
    }
}
