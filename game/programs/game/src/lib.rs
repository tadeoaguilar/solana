use anchor_lang::prelude::*;

declare_id!("8j87roQKzuTLhz7n4dvbX5GeMuYuBEnWDECgNyRYmmzQ");

#[program]
pub mod game {
    use super::*;
    // handler function
    pub fn create_user_stats(ctx: Context<CreateUserStats>, name: String) -> Result<()> {
        let user_stats = &mut ctx.accounts.user_stats;
        user_stats.level = 0;
        if name.as_bytes().len() > 200 {
            // proper error handling omitted for brevity
            panic!();
        }
        user_stats.name = name;

        //unwrap  returns the Contained of Some value, get is a method of Btree struct and returns Option y Option regresa Some(T) or None
        user_stats.bump = *ctx.bumps.get("user_stats").unwrap();
        Ok(())
    }
    // handler function (add this next to the create_user_stats function in the game module)
    pub fn change_user_name(ctx: Context<ChangeUserName>, new_name: String) -> Result<()> {
        if new_name.as_bytes().len() > 200 {
            // proper error handling omitted for brevity
            panic!();
        }
        ctx.accounts.user_stats.name = new_name;
        Ok(())
    }


}

#[account]
pub struct UserStats {
    level: u16,
    name: String,
    bump: u8,
}

// validation struct
#[derive(Accounts)]
pub struct CreateUserStats<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // space: 8 discriminator + 2 level + 4 name length + 200 name + 1 bump
    #[account(
        init,
        payer = user,
        space = 8 + 2 + 4 + 200 + 1, 
        seeds = [b"user-stats", user.key().as_ref()],
        bump
    )]
    pub user_stats: Account<'info, UserStats>,
    pub system_program: Program<'info, System>,
}

// validation struct
#[derive(Accounts)]
pub struct ChangeUserName<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user-stats", user.key().as_ref()], bump = user_stats.bump)]
    //This definition will alow solana to access the PDA account and use user_stats with the PDA info
    pub user_stats: Account<'info, UserStats>,
}


