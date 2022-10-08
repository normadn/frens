import { useContractRead, useNetwork } from "wagmi";
import SSVRegistry from "../../utils/SSVRegistry.json";
  
  
export function useSSVReadTest() {
    const { chain } = useNetwork();
    const contractAddr =
        chain?.name === "Goerli"
        ? "0xc3e7ec559d2ec1b9e0d75a00ffb54304a3571baa"
        : "0x00000000000000000000000000000000deadb33f"; // TODO :)

    const { data, isError, isLoading } = useContractRead({
        addressOrName: contractAddr,
        contractInterface: SSVRegistry.abi,
        functionName: 'version',
    })

    return { data, isError, isLoading };
}
  