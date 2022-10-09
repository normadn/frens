import { useContractRead, useNetwork } from "wagmi";
import StakingPoolFactory from "../../utils/StakingPool.json";
  
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

    const { data, isError, isLoading } = useContractRead({
        addressOrName: "0xe329f6685db5003706d024e087017dc8aea6dac5",
        contractInterface: StakingPoolFactory.abi,
        functionName: 'totalDeposits',
    })

    return { data, isError, isLoading };
}
  