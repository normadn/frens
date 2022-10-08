import { useState, useEffect } from 'react';
import { useCreatePool } from '../hooks/write/useCreatePool';
import { useSSVReadTest } from '../hooks/read/useSSVReadTest';

const INVITATION_TOKEN_LENGTH = 9

export const CreatePool = ({setTokenCode, setStep}) => {
    const [ssvOperators, setssvOperators] = useState([]);
    const [frenSsvOperatorIDs, setFrenSsvOperatorIDs] = useState([]);

    // const { data, isError, isLoading } = useSSVReadTest()
    // console.log(data)

    const { data, write:createPool } = useCreatePool();

    useEffect(() => {
        const fetchOperators = async () => {
            const data = await fetch('https://api.ssv.network/api/v1/operators/graph?page=1&perPage=10');
            const json = await data.json();
            setssvOperators(json.operators);
        }

        const fetchFrenOperator = async () => {
            const data = await fetch('https://api.ssv.network/api/v1/operators/owned_by/0x9b18e9e9aa3dD35100b385b7035C0B1E44AfcA14?page=1&perPage=10');
            const json = await data.json();
            setFrenSsvOperatorIDs(json.operators);
        }

        fetchOperators()
            .catch(console.error);

        fetchFrenOperator()
            .catch(console.error);
    }, []);

    function onCreatePool(): void {
        const inviteToken = Math.random().toString(36).substring(2, INVITATION_TOKEN_LENGTH);
        setTokenCode(inviteToken);

        setStep(2);

        // createPool();
    }

    let operatorList = ssvOperators?.map((item, i) => {
        return (
            <option key={i} value={item}>
                {item.name}
            </option>
        );
    });

    // console.log(frenSsvOperatorIDs)

    return (
        <div>
            <div>Create a SSV operated Validator</div>
            <div>You can select 3 other operators to run you DVT secured validator</div>
            <div>{operatorList}</div>
            <button className='btn btn-primary' onClick={() => onCreatePool()}>
                create Pool
            </button>
        </div>
    );
};