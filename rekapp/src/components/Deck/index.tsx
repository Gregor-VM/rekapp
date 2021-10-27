import styles from './deck.module.scss';
import DeckItem from '../DeckItem';

import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';

function Deck() {

    const decks = useSelector((state: RootState) => state.decks);

    return (
        <div className={styles.container}>
            {decks.map((deck, i) => {
                return (<DeckItem deck={deck} key={i} />)
            })}
        </div>
    )
}

export default Deck;
