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
  const poolAddress = useRouter().query["pool"];
  // if (token !== undefined) {
  //   tokenText = <h1 className="text-3xl">You have joined the pool with code {token}</h1>
  //   stakeForm = <StakeFormComponent></StakeFormComponent>
  // }

  // const poolAddress = "0x7cDDfE5FdECFA8156eF8cBf2b9f7741334bd6df6"

  const { write: deposit } = useDeposit({ address: poolAddress, val: "2" });

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

      <PoolInfo address={poolAddress} />

      <main className={styles.main}>
        {(!isConnected || !address) && (
          <p>Connect your wallet to stake in this pool</p>
        )}

        {isConnected && address && (
          <>
            <PoolInfo />
            <DepositProgressBarComponent />

            <h1 className="text-3xl font-bold underline">
              Stake now
            </h1>
            {/* {tokenText} */}
            {/* {stakeForm} */}
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
    </div>
  );
};

export default Investor;
