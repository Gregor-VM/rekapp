import {useEffect, useState} from 'react';
import styles from './add_card.module.scss';
import {useSelector} from 'react-redux';

import axios from '../../utils/axios';

import {RootState} from '../../store/store';
import {Deck} from '../../interfaces';
import RecordAudio from '../RecordAudio';


function AddCard() {


    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [currentUIBar, setCurrentUIBar] = useState(0);

    const [card, setCard] = useState({front: "", back: ""});

    const decksList = useSelector((state : RootState) => (state.decks as Deck[]).map(deck => ({name: deck.name, _id: deck._id})));

    const deckSelect : React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        localStorage.setItem("deckSelected", e.target.value);
    }

    const cardChangeHandler : React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCard({...card, [e.target.name]:e.target.value});
    };

    const createCard : React.FormEventHandler<HTMLFormElement> = async (e) => {        

        e.preventDefault();

        const createdCard = await axios.post(`/card/${selected}`, card);
        if(createdCard.status === 200){
            setCard({front: "", back: ""});
            tabTapped(0);
        }

    };

    const tabTapped = (index: number) => {
        setCurrentUIBar(index);
    }

    useEffect(() => {
        const deckSelected = localStorage.getItem("deckSelected");
        const idSelected = decksList.find((deck) => deck._id === deckSelected);
        if(idSelected) setSelected(idSelected._id);
        else setSelected(decksList[0]._id);
    }, [decksList]);

    return (
        <>

        <div className={styles.toggleBar}>
            <div className={styles.barOptions}>
                <span className={currentUIBar === 0 ? styles.activeTab : ""} onClick={() => tabTapped(0)}>Front</span>
                <span className={currentUIBar === 1 ? styles.activeTab : ""} onClick={() => tabTapped(1)}>Back</span>
            </div>
            <div className={styles.backgroundBar}>
                <div className={styles.bar + " " 
                + ((currentUIBar === 1 ? styles.rightAnimation : styles.leftAnimation))}></div>
            </div>
        </div>

        <form onSubmit={createCard} className={styles.container}>
            <div className={styles.body}>

                {(currentUIBar === 0) && (
                    <>
                    <h4>Front</h4>
                    <textarea name="front" value={card.front} onChange={cardChangeHandler} rows={5}></textarea>
                    <RecordAudio />
                    </>
                )}

                {(currentUIBar === 1) && (
                    <>
                    <h4>Back</h4>
                    <textarea name="back" value={card.back} onChange={cardChangeHandler} rows={5}></textarea>
                    <RecordAudio />
                    </>
                )}
                
                
            </div>
            <div className={styles.footer}>

                    {(selected === undefined) && <div className={styles.loadingSelected}></div>}
                        {((selected !== undefined) && <select defaultValue={selected} onChange={deckSelect}>
                            {decksList.map(deckName => {
                                return (
                                <option key={deckName._id} value={deckName._id}>
                                    {deckName.name}
                                    </option>)
                            })}
                    </select>)}

                <button type="submit">CREATE CARD</button>
            </div>
        </form>
        </>
    )
}

export default AddCard
