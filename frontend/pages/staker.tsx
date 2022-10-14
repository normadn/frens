import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAccount, useContractEvent } from "wagmi"
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NftGallery } from 'react-nft-gallery';
import Navbar from 'components/navbar';
import Footer from 'components/footer';
import { useDeposit } from '../hooks/write/useDeposit';
import { StakeFormComponent } from 'components/staker/stakeFormComponent';
import { DepositProgressBarComponent } from 'components/shared/depositProgressBarComponent';
import { OperatorWidget } from 'components/operatorWidget';
import { PoolInfo } from 'components/poolInfo';
import StakingPool from "../utils/StakingPool.json";

const Staker: NextPage = () => {
  const poolAddress = useRouter().query["pool"];
  let etherscanLink = ""

  const { isConnected, address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const [isDepositing, setIsDepositing] = useState(false);
  const { data, write: deposit } = useDeposit({ address: poolAddress as string, val: stakeAmount });

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

  if(data){
    etherscanLink = `https://goerli.etherscan.io/tx/${data.hash}`
  }

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

      <main className="flex flex-col justify-center items-center min-h-[93vh]">
        <OperatorWidget operatorAddress='0x9b18e9e9aa3dD35100b385b7035C0B1E44AfcA14' />

        <div className='w-3/5 border-2 border-violet-500 rounded-md bg-white mt-6'>
          {/* <DepositProgressBarComponent /> */}

          <StakeFormComponent setStake={setStakeAmount}/>
          
          <div className='flex justify-center mt-2 mb-4'>
            { isConnected ?
              <div>
                { isDepositing ? 
                  <button 
                    className="btn btn-primary text-white" 
                    disabled
                    >
                    Processing
                  </button>
                  :
                  <button 
                    className="btn text-white bg-gradient-to-r from-pink-500 to-violet-500" 
                    onClick={() => {
                      deposit();
                      setIsDepositing(true);
                    }}
                    >
                    Deposit
                  </button>
                }
              </div>
              :
              <ConnectButton/>
            }
          </div>
          { data ? 
            <div className="px-6 mb-4">
              <div className="my-2 text-center">
                  Your deposit is being processed. <br/> Pls kindly refresh the page once the deposit is done.
              </div>
              <div className="flex justify-center">
                  <div role="status">
                      <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading...</span>
                  </div>
                  <a className="underline text-blue-500 pt-1" href={etherscanLink} target="_blank" rel="noopener noreferrer">
                      view tx on etherscan
                  </a>
              </div>
            </div>
            :
            <div></div>
          }

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
      <Footer/>
    </div >
  );
};

export default Staker;
