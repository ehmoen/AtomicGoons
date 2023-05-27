using AtomicGoons.Models;

namespace AspNetTemplate.ViewModels;

public class UserDataVM
{
    public UserData CurrentUserData { get; set; }
    public List<UserData> AllUserData { get; set; }
}