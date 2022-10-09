import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAllowance } from '../hooks/write/useAllowance';

export const DropKeys = ({ onFileReceived }: { onFileReceived: any }) => {
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


        }
    }

    function MyDropzone() {
        const onDrop = useCallback(acceptedFiles => {
            acceptedFiles.forEach(file => {
                var reader = new FileReader();

                reader.onload = function (evt) {
                    if (evt.target.readyState != 2) return;
                    if (evt.target.error) {
                        alert('Error while reading file');
                        return;
                    }

                    const filecontent = evt.target.result;

                    onFileReceived(filecontent);
                };

                reader.readAsText(file);
            });
        }, [])
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

        return (
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        )
    }

    return (
        <>
            <MyDropzone></MyDropzone>
            <button className="btn btn-primary my-2 mr-2" disabled={!allow} onClick={() => allow?.()}>
                Allow spending SSV
            </button>
            <button className="btn btn-primary" disabled={true}>
                Register SSV validator
            </button>
        </>
    );
};
