import {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import styles from './add_deck.module.scss';

import axios from '../../utils/axios';

import * as modalActions from '../../store/actions/modalActions';
import * as deckActions from '../../store/actions/decksActions';

import { Deck } from '../../interfaces';

function AddDeck() {

    const colors = ["#ff0000", "#d9ff00", "#ff8717",
     "#8f4000", "#20ff02", "#00e1ff", "#2f00ff", "#9900ff", "#ff00f2"];

    const [color, setColor] = useState("#ff0000");
    const nameRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const createDeck = async () => {

        dispatch(modalActions.closeModal());

        const deck : Deck = {
            _id: undefined,
            name: (nameRef.current?.value as string),
            backgroundColor: color,
            backgroundImage: "null",
            cards: []
        }

        const createdDeck : Deck = (await axios.post("/deck", deck)).data;
        dispatch(deckActions.createDeck(createdDeck));

    }

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <h4>Name:</h4>
                <input ref={nameRef} autoComplete="new-password" autoFocus type="text" placeholder="NAME OF THE DECK" />
                <h4>Color:</h4>
                <div className={styles.colorSelector}>
                    {colors.map(((eachColor, i) => {
                        const border = eachColor === color ? "4px solid black" : "4px solid transparent"
                        return (<div key={i} style={{backgroundColor: eachColor, border}} onClick={() => {
                            setColor(eachColor);
                        }}></div>)
                    }))}
                </div>
            </div>
            <div className={styles.footer}>
                <button onClick={createDeck}>CREATE DECK</button>
            </div>

        </div>
    )
}

export default AddDeck
