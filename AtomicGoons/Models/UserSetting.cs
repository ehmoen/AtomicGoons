using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AtomicGoons.Data.Base;

namespace AtomicGoons.Models
{
    public class UserSetting: IEntityBase
    {
        [Key]
        public int Id { get; set; }

        public string? Settings { get; set; }

        public int Score { get; set; }

        public string? UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public IdentityUser? User { get; set; }
    }
}