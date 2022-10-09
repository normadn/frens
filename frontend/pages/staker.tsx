import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Navbar from 'components/navbar';
import { useDeposit } from '../hooks/write/useDeposit';
import { StakeFormComponent } from 'components/staker/stakeFormComponent';
import { DepositProgressBarComponent } from 'components/shared/depositProgressBarComponent';
import { OperatorWidget } from 'components/operatorWidget';
import { PoolInfo } from 'components/poolInfo';
import { NftGallery } from 'react-nft-gallery';
import { useAccount } from "wagmi"

const Investor: NextPage = () => {
  const token = useRouter().query["token"]
  let tokenText = undefined
  let stakeForm = undefined
  if (token !== undefined) {
    tokenText = <h1 className="text-3xl">You have joined the pool with code {token}</h1>
    stakeForm = <StakeFormComponent></StakeFormComponent>
  }

  const { write: deposit } = useDeposit({ address: "0xe329f6685db5003706d024e087017dc8aea6dac5", val: "2" });

  const { isConnected, address } = useAccount()

  return (
    <div className={styles.container} data-theme="winter">
      <Head>
        <title>frens | investor</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>
      <Navbar />

      <OperatorWidget operatorAddress='0x9b18e9e9aa3dD35100b385b7035C0B1E44AfcA14' />


      <main className={styles.main}>
        {(!isConnected || !address) && (
          <>
            <p>Connect your wallet to stake in this pool</p>
            {stakeForm}
          </>
        )}

        {isConnected && address && (
          <>
            <PoolInfo />
            <DepositProgressBarComponent />

            <h1 className="text-3xl font-bold underline">
              Stake now
            </h1>
            <br />
            <button className="btn btn-primary" disabled={!deposit} onClick={() => deposit?.()}>
              Deposit
            </button>

            <h1 className="text-3xl font-bold underline">NFT gallery</h1>
            <NftGallery
              ownerAddress={address}
              apiUrl="https://testnets-api.opensea.io"
              hasLightbox={false}
              isInline={true}
            />

          </>
        )}

      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div >
  );
};

export default Investor;
