
import { usePoolStatus } from '../hooks/read/usePoolStatus';

export const PoolInfo = ({address}) => {
    const componentConfig = { postUrl: 'no-url' };
    const djsConfig = { autoProcessQueue: false }

    const { totaldeposits, isError, isLoading } = usePoolStatus({ address });

    // const eventHandlers = {
    //     addedfile: (file) => {

    //         // console.log(file);
    //         // debugger;
    //         // register();
    //         // allow();
    //     }
    // }

    return (
        <div className='my-4 px-6'>
            <div className='flex justify-between'>
                <div>Staking Rewards</div>
                <div>8%</div> 
            </div>
            <div className='flex justify-between'>
                <div>Current Pool Balance</div>
                <div>{totaldeposits?.toString() ?? "0"}</div> 
            </div>
            <div className='flex justify-between'>
                <div>Pool Address</div>
                <div>{address}</div> 
            </div>
        </div>
    );
};
