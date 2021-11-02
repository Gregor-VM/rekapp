import {DragEvent, useRef, useState} from 'react'
import styles from './upload_image.module.scss';

function UploadImage() {


    const [base64, setBase64] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);


    const dragEnter = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const fileDrop = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        handleFiles(e.dataTransfer.files[0]);
    }

    const dragOver = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const dragLeave = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const selectFile = () => {
        if(inputRef.current) inputRef.current.click();
    }

    const fileSelected : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.files){
            handleFiles(e.target.files[0]);
        }
    }

    const verifyType = (file: File) => {
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
            reader.onloadend = e => {
                const fileBase64 = reader.result;
                setBase64(fileBase64 as string);
            }
        }
    }

    return (
        <div className={styles.container}>
            <div onDragLeave={dragLeave} onDragOver={dragOver} onDragEnter={dragEnter} onDrop={fileDrop} className={styles.dropArea}>
                <button onClick={selectFile}>Select or drop an image file</button>
                <input onChange={fileSelected} ref={inputRef} accept="jpg" type="file" hidden={true} />
            </div>
            <div className={styles.imgContainer}>
                <img src={base64}></img>
            </div>
        </div>
    )
}

export default UploadImage;
