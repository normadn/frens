import { useContractEvent, useNetwork } from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";
  
export function useEventCreate() {
    const { chain } = useNetwork();
    const contractAddr =
        chain?.name === "Goerli"
        ? "0x0013f09Bd637D39c659f121f93B4C5b8dAa3A561"
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
  