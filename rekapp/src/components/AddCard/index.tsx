import {useEffect, useState, useRef} from 'react';
import styles from './add_card.module.scss';
import {useSelector} from 'react-redux';

import axios from '../../utils/axios';

import {RootState} from '../../store/store';
import {Deck} from '../../interfaces';


function AddCard() {


    const [selected, setSelected] = useState<string | undefined>(undefined);
    const frontRef = useRef<HTMLTextAreaElement>(null);
    const backRef = useRef<HTMLTextAreaElement>(null);

    const decksList = useSelector((state : RootState) => (state.decks as Deck[]).map(deck => ({name: deck.name, _id: deck._id})));

    const deckSelect : React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        localStorage.setItem("deckSelected", e.target.value);
    }

    const createCard = async () => {
        const card = {front: frontRef.current?.value, back: backRef.current?.value};

        const createdCard = await axios.post(`/card/${selected}`, card);
        if(createdCard.status === 200){

        }

    };

    useEffect(() => {
        const deckSelected = localStorage.getItem("deckSelected");
        const idSelected = decksList.find((deck) => deck._id === deckSelected)
        if(idSelected) setSelected(idSelected._id);
        else setSelected("");
    }, [decksList]);

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <h4>Deck</h4>
                {(selected === undefined) && <div className={styles.loadingSelected}></div>}
                {((selected !== undefined) && <select defaultValue={selected} onChange={deckSelect}>
                    {decksList.map(deckName => {
                        return (
                        <option key={deckName._id} value={deckName._id}>
                            {deckName.name}
                            </option>)
                    })}
                </select>)}
                <h4>Front</h4>
                <textarea ref={frontRef} rows={5}></textarea>
                <h4>Back</h4>
                <textarea ref={backRef} rows={5}></textarea>
            </div>
            <div className={styles.footer}>
                <button onClick={createCard}>CREATE CARD</button>
            </div>
        </div>
    )
}

export default AddCard
