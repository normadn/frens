import {
    usePrepareContractWrite,
    useContractWrite,
    useNetwork
  } from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";

export function useCreatePool() {
  const { chain } = useNetwork();
  const contractAddr =
    chain?.name === "Goerli"
      ? "0x7d5D057f8b50e2D39bDD84cC12e110Fe46f0257f"
      : "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddr,
    contractInterface: StakingPoolFactory.abi,
    functionName: 'create',
    args: ["0x00000000219ab540356cbb839cbe05303d7705fa", "0xb56001fBF57a5978D2Ba8697fFFF8A319Fa2F2b6"],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return { data, isLoading, isSuccess, write };
}
