import { useContractEvent, useNetwork } from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";
  
export function useEventCreate() {
    const { chain } = useNetwork();
    const contractAddr =
        chain?.name === "Goerli"
        ? "0x7d5D057f8b50e2D39bDD84cC12e110Fe46f0257f"
        : "0x00000000000000000000000000000000deadb33f"; // TODO :)

    useContractEvent({
        addressOrName: contractAddr,
        contractInterface: StakingPoolFactory.abi,
        eventName: 'Create',
        listener: (event) => {
            console.log(event);
        },
    })

}
  