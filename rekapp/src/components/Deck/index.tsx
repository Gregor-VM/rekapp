import styles from './deck.module.scss';
import DeckItem from '../DeckItem';

import {Deck as DeckInterface} from '../../interfaces';
import Loading from '../Loading';
import NothingHere from '../NothingHere';

function Deck({loading, decks}:{loading: boolean, decks: DeckInterface[]}) {

    if(loading) return (<Loading/>)

    if(decks.length === 0) return (<NothingHere/>)

    return (
        <div className={styles.container}>
            {decks.map((deck, i) => {
                return (<DeckItem deck={deck} key={i} />)
            })}
        </div>
    )
}

export default Deck;
