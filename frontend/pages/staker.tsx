import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAccount, useContractEvent } from "wagmi"
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NftGallery } from 'react-nft-gallery';
import Navbar from 'components/navbar';
import { useDeposit } from '../hooks/write/useDeposit';
import { StakeFormComponent } from 'components/staker/stakeFormComponent';
import { DepositProgressBarComponent } from 'components/shared/depositProgressBarComponent';
import { OperatorWidget } from 'components/operatorWidget';
import { PoolInfo } from 'components/poolInfo';
import StakingPool from "../utils/StakingPool.json";

const Staker: NextPage = () => {
  const poolAddress = useRouter().query["pool"];
  // const poolAddress = "0x7cDDfE5FdECFA8156eF8cBf2b9f7741334bd6df6"

  const { isConnected, address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const { write: deposit } = useDeposit({ address: poolAddress as string, val: stakeAmount });
  // const { write: deposit } = useDeposit({ address: "0x7cDDfE5FdECFA8156eF8cBf2b9f7741334bd6df6", val: "4" });

  // if(poolAddress) {
  //   useContractEvent({
  //     addressOrName: "0xb33548809461CaEF599f9a0C9C5A9E559b31088a",
  //     contractInterface: StakingPool.abi,
  //     eventName: 'Deposit',
  //     listener: (event) => {
  //         console.log(event);
  //     },
  //   })
  // }

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-300 min-h-screen" data-theme="winter">
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

        <div className='w-3/5 border-2 border-violet-500 rounded-md bg-white mt-6'>
          {/* <DepositProgressBarComponent /> */}

          <StakeFormComponent setStake={setStakeAmount}/>
          
          <div className='flex justify-center mt-2 mb-4'>
            { isConnected ?
              <button className="btn text-white bg-gradient-to-r from-pink-500 to-violet-500" onClick={() => {deposit()}}>
                Deposit
              </button>
              :
              <ConnectButton/>
            }
          </div>
          <div className='border border-violet-500 rounded-md mx-4'></div>
          <PoolInfo address={poolAddress} />
        </div>

        <div className={`w-3/5 mt-6 border-2 border-violet-500 rounded-md bg-white ${isConnected ? "block" : "hidden"}`}>
          <div className='text-center font-bold my-2'>Ur current pool stakes</div>
          <div className='text-center my-2'>takes some time to update</div>
          <NftGallery
              ownerAddress={address}
              apiUrl="https://testnets-api.opensea.io"
              hasLightbox={false}
              isInline={true}
          />
        </div>

      </main>

    </div >
  );
};

export default Staker;
