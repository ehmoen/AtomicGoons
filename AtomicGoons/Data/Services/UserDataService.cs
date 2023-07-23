using AtomicGoons.Data.Base;
using AtomicGoons.Models;
using Microsoft.EntityFrameworkCore;

namespace AtomicGoons.Data.Services;

public class UserSettingsService : EntityBaseRepository<UserSetting>, IUserSettingsService
{
    private readonly AppDbContext _context;
    
    public UserSettingsService(AppDbContext context) : base(context)
    {
        _context = context;
    }
    
    public async Task SaveUserDataAsync(UserSetting userSetting, string userId)
    {
        if (userSetting.Id == 0)
        {
            await _context.UserData.AddAsync(userSetting);
        }
        else
        {
             _context.UserData.Update(userSetting);
        }
        
        await _context.SaveChangesAsync();
    }

    public async Task<List<UserSetting>> GetAllUserDataAsync()
    {
        List<UserSetting> users = await _context.UserData.Include(x => x.User).ToListAsync();

        return users;
    }
    
    public async Task<UserSetting> GetUserDataByUserIdAsync(string userId)
    {
        var user = await _context.UserData.FirstOrDefaultAsync(x => x.UserId == userId);
        return user;
    }
}