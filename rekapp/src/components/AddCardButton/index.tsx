import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import darkStyles from './add_card_button.module.scss';
import lightStyles from './add_card_button.light.module.scss';
import * as actions from '../../store/actions/modalActions';
import { RootState } from '../../store/store';
import { Deck } from '../../interfaces';
import useThemeChanger from '../../hooks/useThemeChanger';


function AddCardButton() {

    const deckStored : {decks: Deck[]} = useSelector((state : RootState) => (state.decks));

    const styles = useThemeChanger(darkStyles, lightStyles);
    
    const userHasDecks = () => {
        const decksList = deckStored.decks;
        return (decksList.length > 0);
    }

    const [animate, setAnimate] = useState(false);

    const dispatch = useDispatch();

    const animateCb = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
    }

    const addCb = () => {
        if(userHasDecks()){
            animateCb();
            dispatch(actions.openModal(1));
        } else {
            dispatch(actions.openModal(0));
        }

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
