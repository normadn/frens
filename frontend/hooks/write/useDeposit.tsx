import { ethers } from 'ethers';
import {
    usePrepareContractWrite,
    useContractWrite,
    useNetwork
  } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";

export function useDeposit({ val } : { val: string }) {
  const { chain } = useNetwork();
  const contractAddr =
    chain?.name === "Goerli"
      ? "0xf47ec3825eC5161d952278648fb2F3B747B8d347"
      : "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddr,
    contractInterface: StakingPool.abi,
    functionName: 'deposit',
    overrides: {
        value: ethers.utils.parseEther(val),
    },
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return { data, isLoading, isSuccess, write };
}
