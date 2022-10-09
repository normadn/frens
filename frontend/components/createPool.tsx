import { useContractEvent } from "wagmi";
import { useCreatePool } from '../hooks/write/useCreatePool';
import StakingPoolFactory from "../utils/StakingPoolFactory.json";

const INVITATION_TOKEN_LENGTH = 9

export const CreatePool = ({setTokenCode, setStep, setPoolContract}) => {

    const { data, isLoading, write:createPool } = useCreatePool();
    let etherscanLink = ""

    function onCreatePool(): void {
        const inviteToken = Math.random().toString(36).substring(2, INVITATION_TOKEN_LENGTH);
        setTokenCode(inviteToken);
        createPool();
    }

    useContractEvent({
        addressOrName: "0x7d5D057f8b50e2D39bDD84cC12e110Fe46f0257f",
        contractInterface: StakingPoolFactory.abi,
        eventName: 'Create',
        listener: (event) => {
            console.log(event);
            console.log(event[1])
            setPoolContract(event[1])
            setStep(2);
        },
    })

    if(data){
        etherscanLink = `https://goerli.etherscan.io/tx/${data.hash}`
    }

    return (
        <div>
            <div className='my-2'>Create a staking pool so ur frens can stake with u!</div>
            
            <div className='flex items-center justify-center mt-4 mb-2'>
                {data ?
                    <div>
                        <div className="my-2">
                            bear with us ... pool is getting created
                        </div>
                        <a className="underline text-blue-500" href={etherscanLink} target="_blank" rel="noopener noreferrer">
                            tx on etherscan
                        </a>
                    </div>
                    :
                    <div>
                        {isLoading ? 
                            <button disabled className='btn btn-primary text-white'>
                                Loading
                            </button>
                            :
                            <button className='btn btn-primary text-white' onClick={() => onCreatePool()}>
                                Create Pool
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    );
};