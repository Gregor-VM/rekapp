import {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import darkStyles from './register.module.scss';
import lightStyles from './register.light.module.scss';

import Auth from '../../utils/Auth';
import useThemeChanger from '../../hooks/useThemeChanger';

function Register() {

    const styles = useThemeChanger(darkStyles, lightStyles);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const history = useHistory();

    const handleRegister: React.FormEventHandler<HTMLFormElement> = (e) => {

        e.preventDefault();

        if(email !== confirmEmail){
            setError("Emails doesn't match");
            return;
        }

        Auth.register(username, email, password);

        history.push("/");

    };

    return (
        <>
        <h2 className={styles.title}>REKAPP</h2>
        <div className={styles.container}>
            <header>
                <h2>Sing up</h2>
            </header>
            <form onSubmit={handleRegister} className={styles.registerForm}>
            <input onChange={(e) => setUsername(e.target.value)} value={username} autoComplete="new-password" type="text" placeholder="Username"></input>
                <input onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="new-password" type="text" placeholder="Email"></input>
                <input onChange={(e) => setConfirmEmail(e.target.value)} value={confirmEmail} autoComplete="new-password" type="text" placeholder="Confirm email"></input>
                <input onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="new-password" type="password" placeholder="Password"></input>
                {error !== "" && <p>{error}</p>}
                <button className={styles.registerBtn}>Sing up</button>
            </form>
            
        </div>

        <div className={styles.container2}>
            <p className={styles.sign_in_msg}>Already have an account? <Link to="/login">Sing in</Link></p>
        </div>

        </>
    );
}

export default Register
