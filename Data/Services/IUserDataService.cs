using AtomicGoons.Data.Base;
using AtomicGoons.Models;

namespace AtomicGoons.Data.Services;

public interface IUserDataService : IEntityBaseRepository<UserData>
{
    Task SaveUserDataAsync(UserData userData, string userId);
    Task<UserData> GetUserDataByUserIdAsync(string userId);
    Task<List<UserData>> GetAllUserDataAsync();
}