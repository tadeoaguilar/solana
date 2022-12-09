import './App.css';
import {useState} from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program,  web3 } from '@project-serum/anchor';
import idl from './idl.json'
import {PhantomWalletAdapter} from '@solana/wallet-adapter-wallets'
import {useWallet,WalletProvider,ConnectionProvider} from '@solana/wallet-adapter-react'
import {WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'

require('@solana/wallet-adapter-react-ui/styles.css')
const wallets = [
  new PhantomWalletAdapter(),  
]
const {Keypair,SystemProgram} = web3;
const switchAccount =Keypair.generate();
const programId = new PublicKey(idl.metadata.address)
const opts={
  preflightCommitment: "processed"
}
function App() {
  const [value,setValue] = useState(null);
  const wallet = useWallet();
  const getProvider = async () => {
    const network = "http://127.0.0.1:8899"
    const connection = new Connection(network,opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection, wallet,opts.preflightCommitment
    );
    return provider;
  }
  const {log:l} = console

  const createFlipper = async  () => {
    l('create flipper')
    const provider = await getProvider()
    l(`provider 2: ${provider.wallet.publicKey.toBase58()}`)
   
    l(switchAccount)
    
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl, programId, provider);

    try {
      /* interact with the program via rpc */
      await program.methods.initialize()
      .accounts(
        {
          switchAccount: switchAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
      .signers([switchAccount])
     .rpc();

 l('aui')

     const account = await program.account.switchAccount.fetch(switchAccount.publicKey);
      console.log('dataAccount pub key: ', switchAccount.publicKey.toBase58())
      console.log('user pub key: ', provider.wallet.publicKey.toBase58())
      console.log('program id: ', SystemProgram.programId.toBase58())
      console.log('account: ', account);
      setValue(account.state.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  const flip = async  () => {
    const provider = await getProvider();
    const program = new Program(idl, programId, provider);
    program.methods.flip()
      .accounts({
        switchAccount: switchAccount.publicKey
      })
      .rpc();

    const account = await program.account.switchAccount.fetch(switchAccount.publicKey);
    console.log('account: ', account);
    setValue(account.state.toString());
  }
  
  if (!wallet.connected) {console.log('enbtre')
    console.log(wallet)
    /* If the user's wallet is not connected, display connect wallet button. */
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>

        <WalletMultiButton />
      </div>
    )
  } else {
    console.log('enbtre2')
    return (
      <div className="App">
        <div>
          {
            !value && (<button onClick={createFlipper}>Create a switch</button>)
          }
          {
            value && <button onClick={flip}>Flip the Switch</button>
          }

          {
            value ? (
              <h2>{value}</h2>
            ) : (
              <h3>Please create the switch.</h3>
            )
          }
        </div>
      </div>
    );
  }
}


/* wallet configuration as specified here: https://github.com/solana-labs/wallet-adapter#setup */
const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;

