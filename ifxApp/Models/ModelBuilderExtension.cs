using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ifxApp.Models
{
    public static class ModelBuilderExtension
    {
        public static void seed(this ModelBuilder modelBuilder)
        {
            //Create Roles
            List<IdentityRole> roles = new List<IdentityRole>()
            {
                new IdentityRole { Name = "Publico", NormalizedName ="PUBLICO"},
                new IdentityRole { Name = "Administrador", NormalizedName ="ADMINISTRADOR"}
                
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);

            //Create Users
            List<ApplicationUser> users = new List<ApplicationUser>()
            {
                 new ApplicationUser
                {
                    UserName = "roberth",
                    NormalizedUserName = "ROBERTH",
                    Email = "roberth@gmail.com",
                    NormalizedEmail = "ROBERTH@GMAIL.COM"
                },
                new ApplicationUser
                {
                    UserName = "karina",
                    NormalizedUserName = "KARINA",
                    Email = "karina@gmail.com",
                    NormalizedEmail = "KARINA@GMAIL.COM"
                },
                 new ApplicationUser
                {
                    UserName = "sofia",
                    NormalizedUserName = "SOFIA",
                    Email = "sofia@yahho.com",
                    NormalizedEmail = "SOFIA@YAHOO.COM"
                },
                  new ApplicationUser
                {
                    UserName = "johnny",
                    NormalizedUserName = "JOHNNY",
                    Email = "johnny@gmail.com",
                    NormalizedEmail = "JOHNNY@GMAIL.COM"
                }

            };
            modelBuilder.Entity<ApplicationUser>().HasData(users);

            //Add passwords to users

            var passwordHasher =  new PasswordHasher<ApplicationUser>();
            users[0].PasswordHash = passwordHasher.HashPassword(users[0], "Aa123456!");
            users[1].PasswordHash = passwordHasher.HashPassword(users[1], "Aa123456!");
            users[2].PasswordHash = passwordHasher.HashPassword(users[2], "Aa123456!");
            users[3].PasswordHash = passwordHasher.HashPassword(users[2], "Aa123456!");

            //Add roles to users

            List<IdentityUserRole<string>> userRoles = new List<IdentityUserRole<string>>();
            userRoles.Add(new IdentityUserRole<string>
            {
                UserId = users[0].Id,
                RoleId = roles.FirstOrDefault(q => q.Name == "Administrador").Id

            });
            userRoles.Add(new IdentityUserRole<string>
            {
                UserId = users[1].Id,
                RoleId = roles.FirstOrDefault(q => q.Name == "Administrador").Id

            });
            userRoles.Add(new IdentityUserRole<string>
            {
                UserId = users[2].Id,
                RoleId = roles.FirstOrDefault(q => q.Name == "Usuario").Id

            });
            userRoles.Add(new IdentityUserRole<string>
            {
                UserId = users[3].Id,
                RoleId = roles.FirstOrDefault(q => q.Name == "Usuario").Id

            });
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(userRoles);
        }

    }
}
