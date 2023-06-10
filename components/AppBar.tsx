import { FC } from "react";
import styles from '../styles/Home.module.css'
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const AppBar: FC = () => {
    return (
        <div className={styles.header}>
            <Image alt="logo" src="/solanaLogo.png" height={30} width={200} />
            <span>Send $SOL Application</span>
        </div>
    )
}