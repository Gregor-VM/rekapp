import styles from './record_audio.module.scss';
import {useState} from 'react';
import useAudio from '../../hooks/useAudio';
//import { Audio } from '../../interfaces';

function RecordAudio() {

    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    
    const [url, setUrl] = useState<string>("");

    const {isPlaying, toggle} = useAudio(url);

    const startRecording = async () => {

        if(mediaRecorder && mediaRecorder.state === 'recording') return;

        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){

            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            const mediaRecorder = new MediaRecorder(stream);

            setMediaRecorder(mediaRecorder);

            

            mediaRecorder.start();

            mediaRecorder.ondataavailable = (e) => {
                /*
                const arraybuffer = await e.data.arrayBuffer();
                const size = e.data.size;
                const type = e.data.type;
                setAudio({arraybuffer, size, type});*/

                const url = window.URL.createObjectURL(e.data);
                setUrl(url);
            }

        } else {
            window.alert("Your device doesn't support audio recording");
        }

        setRecording(true);
    }

    const stopRecording = () => {

        if(mediaRecorder && mediaRecorder.state !== "inactive"){
            mediaRecorder.stop();
        }

        setRecording(false);
    }

    const playAudio = async () => {

        if(!isPlaying) toggle();

        if(isPlaying) toggle();

    }

    return (
        <div className={styles.container}>
            <h4>Record Audio</h4>
            <div className={styles.controls}>
                {url && (
                    <div onClick={playAudio} className={styles.play + " " + ((isPlaying !== null) ? styles.playing : "")}>
                        {(isPlaying || isPlaying === null) && <i className={"fas fa-play"}></i>}
                        {(isPlaying === false) && <i className="fas fa-pause"></i>}
                    </div>
                )}
                <div onClick={startRecording} className={styles.start + " " + (recording ? styles.recording : "")}><i></i></div>
                <div onClick={stopRecording} className={styles.stop}><i></i></div>
            </div>
        </div>
    )
}

export default RecordAudio
