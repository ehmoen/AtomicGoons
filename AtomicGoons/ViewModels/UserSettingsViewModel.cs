using AtomicGoons.Models;

namespace AtomicGoons.ViewModels;

public class UserSettingsViewModel
{
    public UserSetting CurrentUserSetting { get; set; }
    public List<UserSetting> AllUserSettings { get; set; }
}