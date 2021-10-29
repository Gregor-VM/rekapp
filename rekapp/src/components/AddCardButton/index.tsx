import {useState} from 'react'
import styles from './add_card_button.module.scss';

function AddCardButton() {

    const [animate, setAnimate] = useState(false);

    const animateCb = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
    }

    return (
        <div className={styles.container + " " + (animate ? styles.animation : "")} onClick={animateCb}>
            <div className={styles.up}></div>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
            <div className={styles.down}></div>
        </div>
    )
}

export default AddCardButton
