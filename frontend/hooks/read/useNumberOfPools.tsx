import { useContractRead, useNetwork } from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";
  
export function useNumberOfPools() {
    const { chain } = useNetwork();
    const contractAddr =
        chain?.name === "Goerli"
        ? "0x0eaA2B7472d169C038817133a1E87aFED8f01996"
        : "0x00000000000000000000000000000000deadb33f"; // TODO :)

    const { data, isError, isLoading } = useContractRead({
        addressOrName: contractAddr,
        contractInterface: StakingPoolFactory.abi,
        functionName: 'numberOfStakingPools',
    })

    return { data, isError, isLoading };
}
  