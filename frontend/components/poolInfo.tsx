
import { usePoolStatus } from '../hooks/read/usePoolStatus';

export const PoolInfo = () => {
    const componentConfig = { postUrl: 'no-url' };
    const djsConfig = { autoProcessQueue: false }

    const { data, isError, isLoading } = usePoolStatus({ address: "0xe329f6685db5003706d024e087017dc8aea6dac5" });

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
            HELLO {data}
        </div>
    );
};
