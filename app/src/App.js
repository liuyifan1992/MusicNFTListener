import React from 'react';
import './App.css';
import { Connection, PublicKey} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";


const App = () => {

 const getTokens =async () =>{
  const connection = new Connection("https://api.devnet.solana.com");

  const ownerPublickey = '3TN32piXcHxiNp2pTYjrhhZ8NRznZqZkvGWX4SQCN9aW';
  try{

    let response = await connection.getParsedTokenAccountsByOwner(new PublicKey(ownerPublickey), {
      programId: TOKEN_PROGRAM_ID,
    });
    let solBalance = await connection.getBalance(new PublicKey(ownerPublickey))

    console.log("Solana Balance: ",solBalance/10**9)
    console.log("===================")
    for(let accountInfo of response.value)
      {
        const amount = parseInt(accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"])
        const decimals = parseInt(accountInfo.account.data["parsed"]["info"]["tokenAmount"]["decimals"])
      if (amount === 0 || decimals ===0 ) continue
      const realAmount = amount/10**decimals
      console.log(`Token: ${accountInfo.account.data["parsed"]["info"]["mint"]}`);
      console.log(`Amount: ${realAmount}`)
      console.log("===================")
    }

  }catch(err){
    console.log(err)
  }

 }

function renderText(){
  getTokens()
}
    return (

        <div className="text-content">
        <h1>StarSeed NFT Music Player</h1>
          {renderText()}
        </div>

    )
};

export default App;
