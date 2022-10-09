import { useContractEvent, useNetwork } from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";
  
export function useEventCreate() {
    const { chain } = useNetwork();
    const contractAddr =
        chain?.name === "Goerli"
        ? "0x7b24022a3c62A20B19Fa48b919433De1a87B3A78"
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
  