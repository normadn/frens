import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useAccount
} from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";

const StakingPoolFactoryAddress = "0x7b24022a3c62A20B19Fa48b919433De1a87B3A78"
const goerliDepostAddress = "0x00000000219ab540356cbb839cbe05303d7705fa"


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
