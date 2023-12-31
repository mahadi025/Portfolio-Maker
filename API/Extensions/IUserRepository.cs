﻿using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser> GetUserIdAsync(int id);
    Task<AppUser> GetUserByUsernameAsync(string username);

}
