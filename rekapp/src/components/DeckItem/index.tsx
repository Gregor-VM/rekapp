import styles from './deck_item.module.scss';
import {Deck} from '../../interfaces'

function GroupItem({deck} : {deck : Deck}) {
    return (
        <div style={{backgroundColor: deck.backgroundColor}} className={styles.groupItem}>
            <h4>{deck.name}</h4>
        </div>
    )
}

export default GroupItem
