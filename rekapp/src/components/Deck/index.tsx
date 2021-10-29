import styles from './deck.module.scss';
import DeckItem from '../DeckItem';

import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';

import {Deck as DeckInterface} from '../../interfaces';

function Deck({loading}:{loading: boolean}) {

    const decks : DeckInterface[] = useSelector((state: RootState) => state.decks);

    if(loading) return (<div>Loading</div>)

    if(decks.length === 0) return (<div>Nothing here</div>)

    return (
        <div className={styles.container}>
            {decks.map((deck, i) => {
                return (<DeckItem deck={deck} key={i} />)
            })}
        </div>
    )
}

export default Deck;
