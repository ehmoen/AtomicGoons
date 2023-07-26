using AtomicGoons.Data.Base;
using AtomicGoons.Models;

namespace AtomicGoons.Data.Services;

public interface IUserSettingsService : IEntityBaseRepository<UserSetting>
{
    Task SaveUserSettingsAsync(UserSetting userSetting, string userId);
    Task<UserSetting?> GetUserSettingsByUserIdAsync(string userId);
    Task<List<UserSetting>> GetAllUserSettingsAsync();
}