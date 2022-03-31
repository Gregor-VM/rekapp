import {useState} from 'react';
import axios from '../../utils/axios';
import Alert from '../Alert';

import styles from './change_password.module.scss';

function ChangePassword() {

    const [password, setPassword] = useState({old: "", new: "", confirm: ""});
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleChangePasswordInput : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(prev => ({...prev, [e.target.name]:e.target.value}));
    };

    const handleChangePassword = async () => {
        if(password.new.length > 5 && password.new === password.confirm){
            setLoading(true);
            const passwords = {oldPassword: password.old, newPassword: password.new};
            const response = await axios.put("/change-password", passwords);
            if(response.status !== 200) window.alert("An unexpected error has ocurred");
            setLoading(false);
            setMsg("The password has been changed");
        } else {
            setMsg("The password is too short");
        }
    };  


    return (
        <div className={styles.container}>
        <h3>Change password</h3>
            <span>
                <label>Old password</label>
                <input onChange={handleChangePasswordInput} value={password.old} name="old" type="password" placeholder="Old password"></input>
            </span>
            <span>
                <label>New password</label>
                <input onChange={handleChangePasswordInput} value={password.new} name="new" type="password" placeholder="New password"></input>
            </span>
            <span>
                <label>Confirm new password</label>
                <input onChange={handleChangePasswordInput} value={password.confirm} name="confirm" type="password" placeholder="Confirm new password"></input>
            </span>

            <span>
                <button disabled={loading} onClick={handleChangePassword}>Change password</button>
            </span>
            {msg !== "" && (<Alert msg={msg} setMsg={setMsg}></Alert>)}
        </div>
    )
}

export default ChangePassword
