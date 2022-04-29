import {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import darkStyles from './add_deck.module.scss';
import lightStyles from './add_deck.light.module.scss';

import axios from '../../utils/axios';

import * as modalActions from '../../store/actions/modalActions';
import * as deckActions from '../../store/actions/decksActions';

import { Deck } from '../../interfaces';

import * as patterns from '../../utils/patterns';
import useThemeChanger from '../../hooks/useThemeChanger';

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

function AddDeck() {

    const styles = useThemeChanger(darkStyles, lightStyles);

    const patternsObj : Patterns = patterns;

    const colors = ["rgb(255, 0, 0)", "rgb(217, 255, 0)", "rgb(255, 135, 23)", "rgb(32, 255, 2)", "rgb(0, 225, 255)", "rgb(47, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 242)", "rgb(255, 255, 255)"];

    const [color, setColor] = useState("rgb(255, 0, 0)");
    const [pattern, setPattern] = useState("");
    const nameRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const createDeck = async () => {

        dispatch(modalActions.closeModal());

        const deck : Deck = {
            shared: undefined,
            options: undefined,
            _id: undefined,
            name: (nameRef.current?.value as string),
            backgroundColor: color,
            backgroundImage: pattern,
            cards: []
        }

        const createdDeck : Deck = (await axios.post("/deck", deck)).data;
        dispatch(deckActions.createDeck(createdDeck));

    }

    const selectPattern = (patternString: string) => {
        if(pattern === patternString) setPattern("");
        else setPattern(patternString);
    }

    const patternList : string[] = Object.keys(patterns);

    const closeModal = () => {
        dispatch(dispatch(modalActions.closeModal()));
    }

    return (
        <form className={styles.container}>
            <span><h2>Add Deck</h2><i onClick={() => dispatch(modalActions.closeModal())} className="fas fa-window-close"></i></span>
            <div className={styles.body}>
                <input ref={nameRef} autoComplete="new-password" autoFocus type="text" placeholder="Name of the deck" />
                <h3>Select a background</h3>
                <div className={styles.patternSelector}>
                    {patternList.map(((patternString: string, key: number) => {
                        const selectedClass = color === "rgb(255, 255, 255)" ? styles.activePrimaryColor : styles.activeColor;
                        const border = pattern === patternString ? selectedClass : "";
                        return (<div key={key} onClick={() => selectPattern(patternString)} className={`${styles.pattern} ${border}`} style={patternsObj[patternString as keyof Patterns](color)}></div>)
                    }))}
                </div>
                <h3>Select a color</h3>
                <div className={styles.colorSelector}>
                    {colors.map(((eachColor, i) => {
                        const selectedClass = color === "rgb(255, 255, 255)" ? styles.activePrimaryColor : styles.activeColor;
                        const border = eachColor === color ? selectedClass : "";
                        return (<div key={i} style={{backgroundColor: eachColor}} className={border} onClick={() => {
                            setColor(eachColor as string);
                        }}></div>)
                    }))}
                </div>
            </div>
            <div className={styles.footer}>
                <button onClick={closeModal}>CANCEL</button>
                <button onClick={createDeck}>CREATE DECK</button>
            </div>

        </form>
    )
}

export default AddDeck
