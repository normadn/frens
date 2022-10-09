import { useContractRead, useNetwork } from "wagmi";
import SSVRegistry from "../../utils/SSVRegistry.json";
  
  
// proxy = 0x49D395eFcE6233e116C69333F249e6cF128D5992
// actual = 0xc3e7ec559d2ec1b9e0d75a00ffb54304a3571baa
export function useSSVReadTest() {
    const { chain } = useNetwork();
    const contractAddr =
        chain?.name === "Goerli"
        ? "0x49D395eFcE6233e116C69333F249e6cF128D5992"
        : "0x00000000000000000000000000000000deadb33f"; // TODO :)

    const { data, isError, isLoading } = useContractRead({
        addressOrName: contractAddr,
        contractInterface: SSVRegistry.abi,
        functionName: 'version',
    })

    return { data, isError, isLoading };
}
  