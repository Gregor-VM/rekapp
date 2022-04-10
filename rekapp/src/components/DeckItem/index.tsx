import styles from './deck_item.module.scss';
import {Deck} from '../../interfaces';

import {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import * as deckActions from '../../store/actions/decksActions';
import * as modalActions from '../../store/actions/modalActions';
import * as viewCardsActions from '../../store/actions/viewCardsActions';

import axios from '../../utils/axios';

import * as patterns from '../../utils/patterns';

interface Patterns {
    pattern1: (color: string) => React.CSSProperties
    pattern2: (color: string) => React.CSSProperties
    pattern3: (color: string) => React.CSSProperties
    pattern4: (color: string) => React.CSSProperties
    pattern5: (color: string) => React.CSSProperties
    pattern6: (color: string) => React.CSSProperties
    //pattern7: (color: string) => React.CSSProperties
    pattern8: (color: string) => React.CSSProperties
    pattern9: (color: string) => React.CSSProperties
    pattern10: (color: string) => React.CSSProperties
}

function GroupItem({deck} : {deck : Deck}) {

    const patternsObj : Patterns = patterns;

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

    const darknessAmount = 1.4;

    const color = "rgb(" + deck.backgroundColor.replace("rgb(", "").replace(")", "").split(", ").map(el => (parseInt(el)/darknessAmount)+"").join(", ") + ")";

    const patternStyle = deck.backgroundImage.includes("pattern") ? patternsObj[deck.backgroundImage as keyof Patterns](color) : ({backgroundColor: deck.backgroundColor});

    return (
        <div>
        <div onClick={handleClick} style={patternStyle} className={styles.groupItem}>
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
