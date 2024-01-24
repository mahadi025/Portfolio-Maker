using API.Interfaces;

namespace API;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IProjectRepository ProjectRepository { get; }
    ISkillRepository SkillRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
