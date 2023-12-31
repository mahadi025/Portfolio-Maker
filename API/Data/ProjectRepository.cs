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

    public async Task<Project> GetProjectIdAsync(int id)
    {
        return await _context.Projects.FindAsync(id);
    }

    public async Task<IEnumerable<Project>> GetProjectsAsync()
    {
        return await _context.Projects.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void update(Project project)
    {
        _context.Entry(project).State = EntityState.Modified;
    }
}
