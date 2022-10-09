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
import { useState } from 'react';

const Investor: NextPage = () => {
  const poolAddress = useRouter().query["pool"];
  // if (token !== undefined) {
  //   tokenText = <h1 className="text-3xl">You have joined the pool with code {token}</h1>
  //   stakeForm = <StakeFormComponent></StakeFormComponent>
  // }

  // const poolAddress = "0x7cDDfE5FdECFA8156eF8cBf2b9f7741334bd6df6"

  const { isConnected, address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const { write: deposit } = useDeposit({ address: poolAddress as string, val: stakeAmount });
  // const { write: deposit } = useDeposit({ address: "0x7cDDfE5FdECFA8156eF8cBf2b9f7741334bd6df6", val: "4" });

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-300" data-theme="winter">
      <Head>
        <title>frens | staker</title>
        <meta
          name="description"
          content="stake eth via ur trusted degen"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🤝‍🧑</text></svg>" />
      </Head>
      <Navbar />


      <main className="flex flex-col justify-center items-center">
        <OperatorWidget operatorAddress='0x9b18e9e9aa3dD35100b385b7035C0B1E44AfcA14' />
        {(!isConnected || !address) && (
          <div className='text-white'>
            <p>Connect your wallet to stake in this pool</p>
          </div>
        )}

        {isConnected && address && (
          <div className='text-white'>
            <PoolInfo address={poolAddress} />
            <DepositProgressBarComponent />

            <StakeFormComponent setStake={setStakeAmount}></StakeFormComponent>
            <h1 className="text-3xl font-bold underline">
              Stake now
            </h1>
            <br />
            <button className="btn btn-primary" onClick={() => {
              deposit();
            }}>
              Deposit
            </button>

            <h1 className="text-3xl font-bold underline">NFT gallery</h1>
            <NftGallery
              ownerAddress={address}
              apiUrl="https://testnets-api.opensea.io"
              hasLightbox={false}
              isInline={true}
            />
          </div>
        )}

      </main>

    </div >
  );
};

export default Investor;
