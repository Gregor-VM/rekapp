import styles from './modal.module.scss';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/modalActions'

import {RootState} from '../../store/store';

import AddDeck from '../AddDeck';

function Modal() {

    const modal = useSelector((state : RootState) => state.modal);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(actions.closeModal());
    }

    if(!modal.open) return (<></>);

    return (
        <div className={styles.modal}>
            <div onClick={closeModal} className={styles.out}></div>
            <div className={styles.container}>
                {(modal.content === 0) && (<AddDeck />)}
            </div>
        </div>
    )
}

export default Modal
