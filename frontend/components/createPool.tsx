import { useState, useEffect } from 'react';
import { useCreatePool } from '../hooks/write/useCreatePool';

const INVITATION_TOKEN_LENGTH = 9

export const CreatePool = ({setTokenCode}) => {
    const [ssvOperators, setssvOperators] = useState([]);
    const [mySsvOperatorIDs, setMySsvOperatorIDs] = useState([]);
    const { write:createPool } = useCreatePool({name: "dummy"});

    useEffect(() => {
        fetch('https://api.ssv.network/api/v1/operators/graph?page=1&perPage=10')
            .then((response) => response.json())
            .then((data) => {
            console.log(data);
            setssvOperators(data);
            })
            .catch((err) => {
            console.log(err.message);
        });
        fetch('https://api.ssv.network/api/v1/operators/owned_by/0x9b18e9e9aa3dD35100b385b7035C0B1E44AfcA14?page=1&perPage=10')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMySsvOperatorIDs(data);
            })
            .catch((err) => {
                console.log(err.message);
        });
    }, []);

    function onCreatePool(): void {
        const inviteToken = Math.random().toString(36).substring(2, INVITATION_TOKEN_LENGTH)
        setTokenCode(inviteToken)
    }

    return (
        <div>
            <button className='btn btn-primary' onClick={() => onCreatePool()}>
                create Pool
            </button>
        </div>
    );
};