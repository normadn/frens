import { DropzoneComponent } from 'react-dropzone-component';
// import { useSSVRegisterValidator } from '../hooks/write/useSSVRegisterValidator';
import { useAllowance } from '../hooks/write/useAllowance';
import { useSSVReadTest } from '../hooks/read/useSSVReadTest';

export const DropKeys = ({ onFileReceived }: { onFileReceived: any }) => {
    const componentConfig = { postUrl: 'no-url' };
    const djsConfig = { autoProcessQueue: false }
    // const { data, isLoading, isSuccess, write: register } = useSSVRegisterValidator({
    //     keystore: "", keystorePassword: "testtest",
    //     operators: [], operatorIds: [], ssvAmount: 20
    // });
    const { data: data2, isLoading: isLoading2, isSuccess: isSuccess2, write: allow } = useAllowance({
        spender: "",
        value: ""
    });

    // const { data: data3 , isError: isError3 , isLoading: isLoading3 } = useSSVReadTest();

    const eventHandlers = {
        addedfile: (file) => {

            var reader = new FileReader();

            reader.onload = function(evt) {
                if(evt.target.readyState != 2) return;
                if(evt.target.error) {
                    alert('Error while reading file');
                    return;
                }
        
                const filecontent = evt.target.result;
               
                onFileReceived(filecontent);
            };

            reader.readAsText(file);

        }
    }

    return (
        <>
            <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}></DropzoneComponent>
            <button className="btn btn-primary" disabled={!allow} onClick={() => allow?.()}>
                Allow spending SSV
            </button>
            <button className="btn btn-primary" disabled={true}>
                Register SSV validator
            </button>
        </>
    );
};
