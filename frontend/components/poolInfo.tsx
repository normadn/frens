
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
        <div className='border-2 border-blue-500 rounded-md'>
            <div>Pool {address} </div>
            <div>Balance {totaldeposits?.toString()}</div>
        </div>
    );
};
