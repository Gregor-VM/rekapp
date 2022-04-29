import darkStyles from './deck.module.scss';
import lightStyles from './deck.light.module.scss';
import DeckItem from '../DeckItem';

import {Deck as DeckInterface} from '../../interfaces';
import Loading from '../Loading';
import NothingHere from '../NothingHere';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/modalActions';
import useThemeChanger from '../../hooks/useThemeChanger';

function Deck({loading, decks}:{loading: boolean, decks: DeckInterface[]}) {
    
    const styles = useThemeChanger(darkStyles, lightStyles);

    const dispatch = useDispatch();

    if(loading) return (<Loading/>)

    if(decks.length === 0) return (<NothingHere/>);

    const openModal = () => {
        dispatch(actions.openModal(0));
    };

    return (
        <div className={styles.container}>
            {decks.map((deck, i) => {
                return (<DeckItem deck={deck} key={i} />)
            })}
            <div onClick={openModal} className={styles.addDeck}><i className="fas fa-plus"></i></div>
        </div>
    )
}

export default Deck;
