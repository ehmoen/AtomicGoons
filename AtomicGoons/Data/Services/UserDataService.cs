using AtomicGoons.Data.Base;
using AtomicGoons.Models;
using Microsoft.EntityFrameworkCore;

namespace AtomicGoons.Data.Services;

public class UserSettingsService : EntityBaseRepository<UserSetting>, IUserSettingsService
{
    private readonly AtomicGoonsDbContext _context;
    
    public UserSettingsService(AtomicGoonsDbContext context) : base(context)
    {
        _context = context;
    }
    
    public async Task SaveUserSettingsAsync(UserSetting userSetting, string userId)
    {
        if (userSetting.Id == 0)
        {
            await _context.UserSettings.AddAsync(userSetting);
        }
        else
        {
             _context.UserSettings.Update(userSetting);
        }
        
        await _context.SaveChangesAsync();
    }

    public async Task<List<UserSetting>> GetAllUserSettingsAsync()
    {
        var users = await _context.UserSettings.Include(x => x.User).ToListAsync();
        return users;
    }
    
    public async Task<UserSetting?> GetUserSettingsByUserIdAsync(string userId)
    {
        var user = await _context.UserSettings.FirstOrDefaultAsync(x => x.UserId == userId);
        return user;
    }
}