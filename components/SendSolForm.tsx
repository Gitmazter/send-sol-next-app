import { FC, useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton, WalletModalButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
export const SendSolForm:FC = () => {
    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()
    const [ solscanLink, setSolscanLink ] = useState("")

    useEffect(() => {

    },[solscanLink])

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const receiver = new web3.PublicKey(e.target.address.value)
        const amount = e.target.amount.value*web3.LAMPORTS_PER_SOL

        const transaction = new web3.Transaction()
        const transactionInstructions = web3.SystemProgram.transfer({
            fromPubkey: publicKey as web3.PublicKey,
            toPubkey: receiver,
            lamports: amount
            })
        transaction.add(transactionInstructions)
        try {
            await sendTransaction(transaction, connection).then(sig => {
                setSolscanLink(`https://solscan.io/tx/${sig}?cluster=devnet`)
            })
        }
        catch (err) {
        }
    }

    return (
        !publicKey 
        ?
        <div className={styles.notConnectedDiv}>
            <h3 className={styles.sendSolH3}>Please Connect To Send Sol</h3>
            <WalletMultiButton/>
        </div>
        :
        <div>
            <form onSubmit={handleSubmit} className={styles.sendSolForm}>
                <h3 className={styles.sendSolH3}>Send Sol</h3>
                <input type="text" name="address" placeholder="Address"/>
                <input type="number" step="0.000000001" name="amount" placeholder="SOL amount"/>
                <button type="submit">Send</button>
                <br/>
                <a href={solscanLink} target="_blank">{!solscanLink ? "" : "Click here to see your transaction in the explorer"}</a>
            </form>
        </div>
    )
}