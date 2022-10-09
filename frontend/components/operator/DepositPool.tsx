// import { DropzoneComponent } from 'react-dropzone-component';
// import { useStake } from '../hooks/write/useStake';

export const DepositPool = () => {
    const componentConfig = { postUrl: 'no-url' };
    const djsConfig = { autoProcessQueue: false }
    // const { data, isLoading, isSuccess, write: register } = useSSVRegisterValidator({
    //     keystore: "", keystorePassword: "testtest",
    //     operators: [], operatorIds: [], ssvAmount: 20
    // });
    // const { data: data2, isLoading: isLoading2, isSuccess: isSuccess2, write: allow } = useAllowance({
    //     spender: "",
    //     value: ""
    // });

    // const { data: data3 , isError: isError3 , isLoading: isLoading3 } = useSSVReadTest();

    const eventHandlers = {
        addedfile: (file) => {

            // console.log(file);
            // debugger;
            // register();
            // allow();
        }
    }

    return (
        <>
            {/* <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}></DropzoneComponent> */}
            {/* <button className="btn btn-primary" disabled={!allow} onClick={() => allow?.()}>
                Allow spending SSV
            </button>            
            <button className="btn btn-primary" disabled={!register} onClick={() => register?.()}>
                Register SSV validator
            </button> */}
        </>
    );
};
