import {useState, useEffect} from 'react';
import styles from './account_settings.module.scss';
import {useSelector} from 'react-redux';
import {User} from '../../interfaces';
import { RootState } from '../../store/store';
import axios from '../../utils/axios';
import Alert from '../Alert';


function AccountSettings() {

    const user : User = useSelector((state: RootState) => state.user);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const imgLink = "https://yt3.ggpht.com/ytc/AKedOLTpvKuGuqG-anw7EaboiIh5Zb8AxdB1rFFkjIB4oQ=s48-c-k-c0x00ffffff-no-rj";

    const handleUpdateProfile = async () => {
        setLoading(true);
        const userInfo = {username, email};
        const response = await axios.put("/update-user-info", userInfo);
        if(response.status !== 200) window.alert("An unexpected error has ocurred");
        setLoading(false);
        setMsg("The profile has been updated");
    };

    useEffect(() => {
        setUsername(user.username);setEmail(user.email);
    }, [user])

    return (
        <div className={styles.container}>
            
            <div className={styles.left_box}>
                <h3>Profile Settings</h3>
                <span>
                    <label>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Someone's name"></input>
                </span>
                <span>
                    <label>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Someone's email"></input>
                </span>

                <span>
                    <button disabled={loading} onClick={handleUpdateProfile}>Update profile</button>
                </span>
                {msg !== "" && (<Alert msg={msg} setMsg={setMsg}></Alert>)}
            </div>

            <div className={styles.right_box}>
                <p>Profile picture</p>
                <img src={imgLink}></img>
                <button>Change</button>
            </div>

        </div>
    )
}

export default AccountSettings;
