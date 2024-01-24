using API.Data;
using API.Interfaces;

namespace API;

public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _context;

    public UnitOfWork(DataContext context)
    {
        _context = context;
    }
    public IUserRepository UserRepository => new UserRepository(_context);

    public IProjectRepository ProjectRepository => new ProjectRepository(_context);

    public ISkillRepository SkillRepository => new SkillRepository(_context);

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }
    public bool HasChanges()
    {
        return _context.ChangeTracker.HasChanges();
    }

}
