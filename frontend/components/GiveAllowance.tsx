import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAllowance } from '../hooks/write/useAllowance';

export const GiveAllowance = ({ onFileReceived }: { onFileReceived: any }) => {
    // const { data, isLoading, isSuccess, write: register } = useSSVRegisterValidator({
    //     keystore: "", keystorePassword: "testtest",
    //     operators: [], operatorIds: [], ssvAmount: 20
    // });
    const { data: data2, isLoading: isLoading2, isSuccess: isSuccess2, write: allow } = useAllowance({
        spender: "",
        value: ""
    });

    // const { data: data3 , isError: isError3 , isLoading: isLoading3 } = useSSVReadTest();


    return (
        <>
            {/* <MyDropzone></MyDropzone> */}
            <button className="btn btn-primary my-2 mr-2" disabled={!allow} onClick={() => allow?.()}>
                Allow spending SSV
            </button>
            <a className="btn btn-primary" href="https://app.ssv.network/join/validator/enter-key">
                Register SSV validator
            </a>
        </>
    );
};
