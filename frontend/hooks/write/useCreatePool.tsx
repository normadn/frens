import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useAccount
} from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";

const StakingPoolFactoryAddress = "0x0013f09Bd637D39c659f121f93B4C5b8dAa3A561"
const goerliDepostAddress = "0xff50ed3d0ec03aC01D4C79aAd74928BFF48a7b2b"


export function useCreatePool() {
  const { chain } = useNetwork();
  const { address: ownerAddress } = useAccount()
  
  const contractAddr =
  chain?.name === "Goerli"
  ? StakingPoolFactoryAddress
  : "0x0000000000000000000000000000000000000000";
  
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddr,
    contractInterface: StakingPoolFactory.abi,
    functionName: 'create',
    args: [goerliDepostAddress, ownerAddress],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return { data, isLoading, isSuccess, write };
}
