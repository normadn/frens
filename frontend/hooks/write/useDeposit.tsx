import { ethers } from 'ethers';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useNetwork
} from "wagmi";
import StakingPool from "../../utils/StakingPool.json";

export function useDeposit({ address, val }: { address: string, val: string }) {
  const { address: connectedWallet, connector, isConnected } = useAccount()

  const { config } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface: StakingPool.abi,
    functionName: 'deposit',
    args: [connectedWallet],
    overrides: {
      value: ethers.utils.parseEther(val),
    },
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  return { data, isLoading, isSuccess, write };
}
