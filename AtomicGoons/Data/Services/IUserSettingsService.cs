using AtomicGoons.Data.Base;
using AtomicGoons.Models;

namespace AtomicGoons.Data.Services;

public interface IUserSettingsService //: IEntityBaseRepository<UserSetting>
{
    Task SaveUserDataAsync(UserSetting userSetting, string userId);
    Task<UserSetting> GetUserDataByUserIdAsync(string userId);
    Task<List<UserSetting>> GetAllUserDataAsync();
}