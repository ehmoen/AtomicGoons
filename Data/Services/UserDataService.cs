using AtomicGoons.Data.Base;
using AtomicGoons.Models;
using Microsoft.EntityFrameworkCore;

namespace AtomicGoons.Data.Services;

public class UserDataService : EntityBaseRepository<UserData>, IUserDataService
{
    private readonly AppDbContext _context;
    
    public UserDataService(AppDbContext context) : base(context)
    {
        _context = context;
    }
    
    public async Task SaveUserDataAsync(UserData userData, string userId)
    {
        if (userData.Id == 0)
        {
            await _context.UserData.AddAsync(userData);
        }
        else
        {
             _context.UserData.Update(userData);
        }
        
        await _context.SaveChangesAsync();
    }

    public async Task<List<UserData>> GetAllUserDataAsync()
    {
        List<UserData> users = await _context.UserData.Include(x => x.User).ToListAsync();

        return users;
    }
    
    public async Task<UserData> GetUserDataByUserIdAsync(string userId)
    {
        var user = await _context.UserData.FirstOrDefaultAsync(x => x.UserId == userId);
        return user;
    }
}