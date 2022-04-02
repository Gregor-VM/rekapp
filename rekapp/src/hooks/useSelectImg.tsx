import {useState} from 'react';

function useSelectImg({ref} : {ref: React.RefObject<HTMLInputElement>}) {

    const [name, setName] = useState("");
    const [base64, setBase64] = useState("");

    const verifyType = (file: File) => {

        if(!file) return false;

        const acceptTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (acceptTypes.indexOf(file.type) === -1){
            return false;
        }

        return true;

    }

    const handleFiles = async (file: File) => {
        if(verifyType(file)){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setName(file.name);
            reader.onload = e => {
                const fileBase64 = reader.result;
                setBase64(fileBase64 as string);
            }
        }
    }

    const selectFile : React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        ref.current?.click();
    }
    const fileSelected : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.files){
            handleFiles(e.target.files[0]);
        }
    }

    return {base64, name, selectFile, fileSelected};
}

export default useSelectImg
