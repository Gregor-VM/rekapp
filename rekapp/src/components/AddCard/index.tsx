import {useCallback, useEffect, useState} from 'react';
import darkStyles from './add_card.module.scss';
import lightStyles from './add_card.light.module.scss';
import {useSelector, useDispatch} from 'react-redux';

import axios from '../../utils/axios';

import {RootState} from '../../store/store';
import {Card, Deck} from '../../interfaces';
import RecordAudio from '../RecordAudio';
import UploadImage from '../UploadImage';

import * as cardEditActions from '../../store/actions/cardEditActions';
import * as modalActions from '../../store/actions/modalActions';
import Loading from '../Loading';
import useThemeChanger from '../../hooks/useThemeChanger';


function AddCard({closeModal} : {closeModal: () => void}) {

    const styles = useThemeChanger(darkStyles, lightStyles);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [mounted, setMounted] = useState(false);
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [currentUIBar, setCurrentUIBar] = useState(0);

    const [base64front, setBase64front] = useState<string | undefined>();
    const [base64back, setBase64back] = useState<string | undefined>();

    const [audioDataUrlFront, setAudioDataUrlFront] = useState<string>("");
    const [audioDataUrlBack, setAudioDataUrlBack] = useState<string>("");

    const [audioUrlFront, setAudioUrlFront] = useState<string>("");
    const [audioUrlBack, setAudioUrlBack] = useState<string>("");

    const [card, setCard] = useState({front: "", back: ""});

    const deckStored : {decks: Deck[]} = useSelector((state : RootState) => (state.decks));
    const decksList = deckStored.decks.map(deck => ({name: deck.name, _id: deck._id}));
    const cardEdit = useSelector((state : RootState) => (state.cardEdit));

    

    const deckSelect : React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        localStorage.setItem("deckSelected", e.target.value);
    }

    const cardChangeHandler : React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCard({...card, [e.target.name]:e.target.value});
    };

    const createCard : React.FormEventHandler<HTMLFormElement> = async (e) => {

        setLoading(true);

        e.preventDefault();

        let cardData: Card = {
            _id: undefined,
            front: card.front,
            back: card.back,
            frontImg: {_id: undefined, data: base64front as string, title: card.front},
            backImg: {_id: undefined, data: base64back as string, title: card.back},
            frontAudio: {_id: undefined, data: audioDataUrlFront},
            backAudio: {_id: undefined, data: audioDataUrlBack}
        };

        if(cardEdit.editing){

            const updatedCard : Card = {
                _id: cardEdit.card?._id as string,
                front: card.front,
                back: card.back,
                frontImg: {_id: cardEdit.card?.frontImg?._id, data: base64front as string, title: card.front},
                backImg: {_id: cardEdit.card?.backImg?._id, data: base64back as string, title: card.back},
                frontAudio: {_id: cardEdit.card?.frontAudio?._id, data: audioDataUrlFront},
                backAudio: {_id: cardEdit.card?.backAudio?._id, data: audioDataUrlBack}
            };

            const status = await axios.put(`/card/${cardEdit.deckId}/${cardEdit?.card?._id}`, updatedCard);

            if(status.status === 200){
                dispatch(modalActions.openModal(2));
                dispatch(cardEditActions.setCardEdit(null));
            }

        }

        if(!cardEdit.editing){
            const createdCard = (await axios.post("/card/" + selected, cardData));

            if(createdCard.status !== 200){
                return window.alert("An unexpected error has happened :(");
            }
        }

        //Reset everything back
        tabTapped(0);
        setBase64back(undefined);
        setBase64front(undefined);
        setAudioDataUrlBack("");
        setAudioDataUrlFront("");
        setAudioUrlBack("");
        setAudioUrlFront("");
        setCard({front: "", back: ""});

        setLoading(false);

    };

    const tabTapped = (index: number) => {
        setCurrentUIBar(index);
    }







    useEffect(() => {
        if(decksList.length === 0){
            return;
        }
        const deckSelected = localStorage.getItem("deckSelected");
        const idSelected = decksList.find((deck) => deck._id === deckSelected);
        if(idSelected) setSelected(idSelected._id);
        else setSelected(decksList[0]._id);
    }, [decksList]);

    const createBlob = useCallback(

        async (data: string, front: boolean, text: string) => {
            // CREATE BLOB USING FETCH

        const audioBlob = await (await fetch(data)).blob();

        //CREATE A FILE

        const file = new File([await audioBlob.arrayBuffer()], text, {type: "audio/webm"})

        const url = window.URL.createObjectURL(file);

        // SET TO FRONT AND BACK USING THE FRONT BOOLEAN VARIABLE

        front ? setAudioUrlFront(url) : setAudioUrlBack(url);
        
    }, []);

    useEffect(() => {
        
        if(cardEdit.editing && !mounted){
            const currCard = cardEdit.card;
            setCard({front: currCard?.front as string, back: currCard?.back as string});
            setBase64front(currCard?.frontImg?.data);
            setBase64back(currCard?.backImg?.data);
            setAudioDataUrlFront(currCard?.frontAudio?.data as string);
            setAudioDataUrlBack(currCard?.backAudio?.data as string);

            createBlob(currCard?.frontAudio?.data as string, true, card.front);
            createBlob(currCard?.backAudio?.data as string, false, card.back);

            setMounted(true)

        }
    }, [mounted, cardEdit.card, cardEdit.editing, card.front, card.back, createBlob]);


    //RESET CARDEDIT WHEN CLICK OUTSIDE THE MODAL
    
    useEffect(() => {
        return () => {
            if(cardEdit.editing === true){
                dispatch(cardEditActions.setCardEdit(null));
            }
        }
    },[cardEdit.editing, dispatch]);

    useEffect(() => {
        console.log(base64front?.length, base64back?.length)
    }, [base64back, base64front]);

    if(loading) return <div className={styles.loading}><Loading /></div>;

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
                    <RecordAudio dataURL={audioDataUrlFront} setDataURL={setAudioDataUrlFront} url={audioUrlFront} setUrl={setAudioUrlFront} />
                    <UploadImage base64={base64front} setBase64={setBase64front} />
                    </>
                )}

                {(currentUIBar === 1) && (
                    <>
                    <h4>Back</h4>
                    <textarea name="back" value={card.back} onChange={cardChangeHandler} rows={5}></textarea>
                    <RecordAudio dataURL={audioDataUrlBack} setDataURL={setAudioDataUrlBack} url={audioUrlBack} setUrl={setAudioUrlBack} />
                    <UploadImage base64={base64back} setBase64={setBase64back} />
                    </>
                )}
                
                
                
            </div>
            <div className={styles.footer}>

                <button type="button" onClick={closeModal} className={styles.cancel}>Cancel</button>

                    {(selected === undefined) && <div className={styles.loadingSelected}></div>}
                        {((selected !== undefined) && <select defaultValue={selected} onChange={deckSelect}>
                            {decksList.map(deckName => {
                                return (
                                <option key={deckName._id} value={deckName._id}>
                                    {deckName.name}
                                    </option>)
                            })}
                    </select>)}

                <button type="submit">{cardEdit.editing ? "Update card" : "Create card"}</button>
            </div>
        </form>
        </>
    )
}

export default AddCard
