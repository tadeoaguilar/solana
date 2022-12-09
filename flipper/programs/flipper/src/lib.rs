use anchor_lang::prelude::*;

//after running anchor build
// run solana address -k target/deploy/flipper-keypair.json
//HHbE9a2o19U1pTrRDwVp6ECh3WfZzCfGYb8BRf4zMT3B
declare_id!("H4NKh3j5pZZsnFjRa7NskaZrxkWvXv4PvfbYJDPYaLUP");

#[program]
pub mod flipper {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let switchAccount = &mut ctx.accounts.switchAccount;
        switchAccount.state= true;
        Ok(())
    }

    pub fn flip(ctx: Context<Flip>) -> Result<()> {
        let switchAccount = &mut ctx.accounts.switchAccount;
        switchAccount.state = !switchAccount.state;        
        //if switchAccount.state {
        //    switchAccount.state = false;}
        // else{
        //    switchAccount.state =true;
       // }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub switchAccount: Account<'info,SwitchAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info,System>

}
#[derive(Accounts)]
pub struct Flip<'info> {
    #[account(mut)]
    pub switchAccount: Account<'info,SwitchAccount>,
}
#[account]
pub struct SwitchAccount {
   pub state: bool,

}