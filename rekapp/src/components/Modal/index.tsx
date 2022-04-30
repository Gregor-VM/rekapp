import {useState} from 'react';
import styles from './modal.module.scss';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/modalActions'

import {RootState} from '../../store/store';


// Content

import AddDeck from '../AddDeck';
import AddCard from '../AddCard';
import ViewCards from '../ViewCards';
import ShareDeck from '../ShareDeck';

function Modal() {

    const [closeAnimation, setCloseAnimation] = useState(false);
    const modal = useSelector((state : RootState) => state.modal);
    const dispatch = useDispatch();

    const closeModal = () => {
        setCloseAnimation(true)
        setTimeout(() => {
            setCloseAnimation(false);
            dispatch(actions.closeModal());
        }, 250);
    }

    if(!modal.open) return (<></>);

    return (
        <div className={styles.modal}>
            <div onClick={closeModal} className={styles.out}></div>
            <div className={`${styles.container} ${closeAnimation ? styles.closeAnimation : ""}`}>
                {(modal.content === 0) && (<AddDeck closeModal={closeModal} />)}
                {(modal.content === 1) && (<AddCard closeModal={closeModal} />)}
                {(modal.content === 2) && (<ViewCards closeModal={closeModal} />)}
                {(modal.content === 3) && (<ShareDeck closeModal={closeModal} />)}
            </div>
        </div>
    )
}

export default Modal
