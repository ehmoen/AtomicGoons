using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AtomicGoons.Data;
using AtomicGoons.Data.Base;

namespace AtomicGoons.Models
{
    public class UserSettingRepository
    {

        private readonly AtomicGoonsDbContext _atomicGoonsDbContext;

        public UserSettingRepository(AtomicGoonsDbContext atomicGoonsDbContext)
        {
            _atomicGoonsDbContext = atomicGoonsDbContext;
        }

       

    }
}