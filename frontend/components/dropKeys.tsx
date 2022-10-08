import { DropzoneComponent } from 'react-dropzone-component';

export const DropKeys = () => {
    const componentConfig = { postUrl: 'no-url' };
    const djsConfig = { autoProcessQueue: false }
    const eventHandlers = { addedfile: (file) => console.log(file) }

    return (
        <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}></DropzoneComponent>
    );
};
  