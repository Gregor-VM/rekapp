import {useState, useEffect, createRef} from 'react';
import styles from './account_settings.module.scss';
import {useSelector, useDispatch} from 'react-redux';
import {User} from '../../interfaces';
import { RootState } from '../../store/store';
import axios from '../../utils/axios';
import Alert from '../Alert';
import useSelectImg from '../../hooks/useSelectImg';

import * as userActions from './../../store/actions/userActions';


function AccountSettings() {

    const user : User = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const inputRef = createRef<HTMLInputElement>();

    const {base64, name, selectFile, fileSelected} = useSelectImg({ref: inputRef});

    const handleUpdateProfile = async () => {
        setLoading(true);
        const userInfo = {username, email, profileImg: (base64 === "" ? undefined : base64)};
        const response = await axios.put("/update-user-info", userInfo);
        if(response.status !== 200) window.alert("An unexpected error has ocurred");
        dispatch(userActions.setUser(userInfo));
        setLoading(false);
        setMsg("The profile has been updated");
    };

    useEffect(() => {
        setUsername(user.username);setEmail(user.email);
    }, [user]);

    const currentImg = () => {
        if(base64 === "" && !user.profileImg){
            return "/user.svg";
        } else if(user.profileImg !== "" && base64 === ""){
            return user.profileImg;
        } else {
            return base64;
        }
    }

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
                <input onChange={fileSelected} ref={inputRef} accept="jpg" type="file" hidden={true} />
                <img alt={name} src={currentImg()}></img>
                <button onClick={selectFile}>Change</button>
            </div>

        </div>
    )
}

export default AccountSettings;
