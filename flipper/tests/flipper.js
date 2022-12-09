const anchor = require("@project-serum/anchor");

//I need to add this references:
//Assert commes with Mocha
const assert = require('assert')

const {SystemProgram} = anchor.web3;




describe("flipper", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);
  const program = anchor.workspace.Flipper;
  //console.log(anchor.workspace)
  it("Creates a Flipper Account", async () => {
    // Add your test here.
    const switchAccount = anchor.web3.Keypair.generate()
    //const program = anchor.workspace.Flipper;

    const tx = await program.methods.initialize()
    .accounts({
      switchAccount: switchAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    })
    .signers([switchAccount])
    .rpc();
    console.log("Your transaction signature", tx);
    const baseAccount = await program.account.switchAccount.fetch(switchAccount.publicKey);
    assert.ok(baseAccount.state)
    _baseAccount = switchAccount;

  });

  it('Flip it',async ()=> {
    baseAccount=_baseAccount
    const tx = await program.methods
    .flip()
    .accounts({
       switchAccount: baseAccount.publicKey,
    })
    .rpc()

    const account = await program.account.switchAccount.fetch(baseAccount.publicKey);
    assert.ok(account.state == false);
  })
});
