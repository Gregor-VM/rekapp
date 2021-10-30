import {useState} from 'react';
import {useDispatch} from 'react-redux';
import styles from './add_card_button.module.scss';
import * as actions from '../../store/actions/modalActions';

function AddCardButton() {

    const [animate, setAnimate] = useState(false);

    const dispatch = useDispatch();

    const animateCb = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
    }

    const addCb = () => {
        animateCb();

        dispatch(actions.openModal(1));

    }

    return (
        <div className={styles.container + " " + (animate ? styles.animation : "")} onClick={addCb}>
            <div className={styles.up}></div>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
            <div className={styles.down}></div>
        </div>
    )
}

export default AddCardButton
