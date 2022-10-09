import { useState, useEffect } from 'react';
import { useEventCreate } from '../hooks/read/useEventCreate';
import { useCreatePool } from '../hooks/write/useCreatePool';

const INVITATION_TOKEN_LENGTH = 9

export const SelectOperator = ({ setTokenCode, setStep }) => {
    const [ssvOperators, setssvOperators] = useState([]);
    const [operatorList, setOperatorList] = useState((<></>));
    const [frenSsvOperatorIDs, setFrenSsvOperatorIDs] = useState([]);

    const { data, write: createPool } = useCreatePool();
    // console.log(data)
    useEventCreate();

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

    // function onCreatePool(): void {
    //     const inviteToken = Math.random().toString(36).substring(2, INVITATION_TOKEN_LENGTH);
    //     setTokenCode(inviteToken);

    //     setStep(2);

    //     createPool();
    // }

    let operatorListLines = ssvOperators?.map((item, i) => {
        return (
            <tr key={i}>
                <td><input type="checkbox" />&nbsp;&nbsp;</td>
                <td>{item.name} &nbsp;&nbsp;&nbsp;</td>
                <td>{parseFloat(item.performance["24h"]).toFixed(2)}%</td>
            </tr>
        );
    });

    let operatorListTable = (
        <table>
            <tr>
                <th></th>
                <th>Name</th>
                <th>24h performance</th>
            </tr>
            {operatorListLines}
        </table>
    )

    // setOperatorList(operatorListTable);
    
    // console.log(frenSsvOperatorIDs)

    return (
        <div>
            {/* <div>Create a SSV operated Validator</div> */}
            <div>3. Select three other operators to run you DVT secured validator</div>
            <div className="flex justify-center">
                <div>{operatorListTable ? operatorListTable : ""}</div>
            </div>
            {/* <button className='btn btn-primary' onClick={() => onCreatePool()}>
                Deposit ETH to Beacon chain
            </button> */}
        </div>
    );
};