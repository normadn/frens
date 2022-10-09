import { useContractRead, useNetwork } from "wagmi";
import StakingPool from "../../utils/StakingPool.json";
  
export function usePoolStatus( {
    address,
  }: {
    address: string,
  }) {
    // const { chain } = useNetwork();
    // const contractAddr =
    //     chain?.name === "Goerli"
    //     ? "0x0eaA2B7472d169C038817133a1E87aFED8f01996"
    //     : "0x00000000000000000000000000000000deadb33f"; // TODO :)

    const { data: totaldeposits, isError, isLoading } = useContractRead({
        addressOrName: address,
        contractInterface: StakingPool.abi,
        functionName: 'totalDeposits',
    })

    return { totaldeposits, isError, isLoading };
}
  