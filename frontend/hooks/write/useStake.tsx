import { ethers } from 'ethers';
import {
  useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useNetwork
  } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";

export function useStake({ address, depositdata } : { address: string , depositdata: any }) {
  // const { chain } = useNetwork();
  // const contractAddr =
  //   chain?.name === "Goerli"
  //     ? "0xf47ec3825eC5161d952278648fb2F3B747B8d347"
  //     : "0x00000000000000000000000000000000deadb33f";

  const { address: connectedWallet, connector, isConnected } = useAccount()

  const { config } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface: StakingPool.abi,
    functionName: 'stake',
    args: [depositdata],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return { data, isLoading, isSuccess, write };
}
