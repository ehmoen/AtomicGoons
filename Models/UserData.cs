using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AtomicGoons.Data.Base;
using Microsoft.AspNetCore.Identity;

namespace AtomicGoons.Models;

public class UserData : IEntityBase
{
    [Key]
    public int Id { get; set; }

    public string Settings { get; set; }
    
    public int Score { get; set; }

    public string UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public IdentityUser User { get; set; }
}