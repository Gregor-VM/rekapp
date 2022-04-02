import styles from './deck_item.module.scss';
import {Deck} from '../../interfaces';

import {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import * as deckActions from '../../store/actions/decksActions';
import * as modalActions from '../../store/actions/modalActions';
import * as viewCardsActions from '../../store/actions/viewCardsActions';

import axios from '../../utils/axios';

function GroupItem({deck} : {deck : Deck}) {

    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const location = useLocation();
    const menuVisible = (location.pathname === "/");

    const handleClick = () => {
        
        menuVisible ? history.push(`/deck/${deck._id}/1`) : history.push(`/deck-shared/${deck._id}/1`);
    };

    const openMenu = () => {
        if(!isOpen) {


            // WILL EXCUTE ONE CLICK AFTER OPEN THE MENU

            setTimeout(() => {

                const event = () => {
                    setIsOpen(false);
                    document.removeEventListener("click", event);
                };

                document.addEventListener("click", event);
            }, 100);


            setIsOpen(true);
        }
        else {
            setIsOpen(false)
        }
    }

    const deleteDeck = async () => {
        const response = await axios.delete("deck/" + deck._id);
        if(response.status === 204) dispatch(deckActions.deleteDeck(deck._id as string));
    }

    const displayCards = () => {

        dispatch(modalActions.openModal(2));
        if(deck._id){
            dispatch(viewCardsActions.setViewCardId(deck._id));
        }
    }

    const shareDeck = () => {

        dispatch(modalActions.openModal(3));
        if(deck._id){
            dispatch(viewCardsActions.setViewCardId(deck._id));
        }

    }

    return (
        <div>
        <div onClick={handleClick} style={{backgroundColor: deck.backgroundColor}} className={styles.groupItem}>
            <div className={styles.top}>
                <h4>{deck.name}</h4>
            </div>
        </div>

        {menuVisible && (
            <div onClick={openMenu} className={styles.menu}>
            <div className={styles.options}>
                <div></div>
                <div className={styles.centerxshadow}></div>
                <div></div>
            </div>

            {isOpen && (
                <ul>
                    <li onClick={shareDeck}>Share</li>
                    <li onClick={deleteDeck}>Delete</li>
                    <li onClick={displayCards}>Cards</li>
                </ul>
            )}
        </div>
        )}

        </div>

    )
}

export default GroupItem
