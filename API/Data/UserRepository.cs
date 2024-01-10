using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await _context.Users.Include(p => p.Photos).Include(project => project.Projects).ThenInclude(project => project.Skills).ToListAsync();
    }

    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
        return await _context.Users.Include(p => p.Photos).Include(project => project.Projects).ThenInclude(project => project.Skills).SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<AppUser> GetUserIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void update(AppUser user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }
}
