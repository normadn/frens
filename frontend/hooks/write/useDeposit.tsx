import { ethers } from 'ethers';
import {
    usePrepareContractWrite,
    useContractWrite,
    useNetwork
  } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";

export function useDeposit({ address, val } : { address: string, val: string }) {
  // const { chain } = useNetwork();
  // const contractAddr =
  //   chain?.name === "Goerli"
  //     ? "0xf47ec3825eC5161d952278648fb2F3B747B8d347"
  //     : "0x00000000000000000000000000000000deadb33f";

  const { config } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface: StakingPool.abi,
    functionName: 'deposit',
    overrides: {
        value: ethers.utils.parseEther(val),
    },
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return { data, isLoading, isSuccess, write };
}
