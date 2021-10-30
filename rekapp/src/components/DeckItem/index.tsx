import styles from './deck_item.module.scss';
import {Deck} from '../../interfaces';

import {useHistory} from 'react-router-dom';

function GroupItem({deck} : {deck : Deck}) {

    const history = useHistory();

    const handleClick = () => {
        
        history.push(`/deck/${deck._id}/1`);
    };

    return (
        <div onClick={handleClick} style={{backgroundColor: deck.backgroundColor}} className={styles.groupItem}>
            <h4>{deck.name}</h4>
        </div>
    )
}

export default GroupItem
