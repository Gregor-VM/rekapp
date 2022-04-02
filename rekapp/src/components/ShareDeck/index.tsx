import {useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from '../../utils/axios';

import styles from './share_deck.module.scss';

function ShareDeck() {

    const [emails, setEmails] = useState<never[] | string[]>([]);
    const [typed, setTyped] = useState("");

    const deckId = useSelector((state : RootState) => state.viewCards);

    const addEmail: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if(emails !== []){
            if((emails as string[]).includes(typed))return;
        }

        const response = await axios.post(`/deck/share/${typed}/${deckId}`);
        if(response.status === 200){
            setEmails(prev => [...prev, typed]);
        }

        setTyped("");
    }

    const removeEmail = async (email: string) => {

        const response = await axios.delete(`/deck/share/${email}/${deckId}`);
        if(response.status === 204){
            const newEmails = emails.filter(item => item !== email);
            setEmails(newEmails);
        }
    }

    const getEmails = useCallback(
        async () => {
            const response = await axios.get(`/deck/share/${deckId}`);
            if(response.status === 200 && response.data !== []){
                interface UserShareWith {
                    username: string
                    email: string
                    profileImg: string
                };
                const getEmails = response.data.map((item: UserShareWith) => item.email);
                setEmails(getEmails);
            }
        },
        [setEmails]
    )

    useEffect(() => {
        getEmails();
    }, [])

    return (
        <div className={styles.container}>
            <h2>Share Deck</h2>
            <form onSubmit={addEmail} className={styles.type_email}><input value={typed} onChange={(e) => setTyped(e.target.value)} type="text" placeholder="Type email to share"></input><button>Add</button></form>
            <div className={styles.emails}>
                {emails.map((email, i) => (<span><p>{email}</p><i onClick={() => removeEmail(email)} className="fas fa-times"></i></span>))}
            </div>
            {/* .map(div) */}

            <div className={styles.btn}><button>Done</button></div>
        </div>
    )
};

export default ShareDeck;
