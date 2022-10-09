import { useState, useEffect } from 'react';
import { useEventCreate } from '../hooks/read/useEventCreate';
import { useStake } from '../hooks/write/useStake';

const INVITATION_TOKEN_LENGTH = 9

export const Stake = ({ address, depositdata }: { address: string, depositdata: any }) => {
    // const [ssvOperators, setssvOperators] = useState([]);
    // const [frenSsvOperatorIDs, setFrenSsvOperatorIDs] = useState([]);

    // const depositdata = {}

    const { data, write: stake } = useStake({ address, depositdata });
    // console.log(data)
    // useEventCreate();



    // console.log(frenSsvOperatorIDs)

    return (
        <div>
            {/* <div>Create a SSV operated Validator</div> */}
            <button className='btn btn-primary' onClick={() => { stake() }}>
                Deposit ETH to Beacon chain
            </button>
        </div>
    );
};