import { DropzoneComponent } from 'react-dropzone-component';
import { useSSVRegisterValidator } from '../hooks/write/useSSVRegisterValidator';

export const DropKeys = () => {
    const componentConfig = { postUrl: 'no-url' };
    const djsConfig = { autoProcessQueue: false }
    // const { data, isLoading, isSuccess, write: register } = useSSVRegisterValidator({
    //     keystore: "", keystorePassword: "testtest",
    //     operators: [], operatorIds: [], ssvAmount: 20
    // });
    const eventHandlers = {
        addedfile: (file) => {

            // console.log(file);
            // debugger;
            // register();

        }
    }

    return (
        <>
            <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}></DropzoneComponent>
            {/* <button className="btn btn-primary" disabled={!register} onClick={() => register?.()}>
                Register
            </button> */}
        </>
    );
};
