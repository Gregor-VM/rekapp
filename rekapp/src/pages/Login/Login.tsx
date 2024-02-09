import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import darkStyles from './login.module.scss';
import lightStyles from './login.light.module.scss';

import Auth from './../../utils/Auth';
import {useHistory} from 'react-router-dom';
import useThemeChanger from '../../hooks/useThemeChanger';

function Login() {

    const styles = useThemeChanger(darkStyles, lightStyles);

    const [remember, setRemember] = useState<boolean>(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const submitHandler : React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await Auth.login(email, password);

        if(remember) localStorage.setItem("remember", "true");
        else localStorage.removeItem("remember");

        history.push("/");
    }

    const loginAsGuest: React.MouseEventHandler<HTMLButtonElement> = async () => {

        await Auth.loginGuest();

        if(remember) localStorage.setItem("remember", "true");
        else localStorage.removeItem("remember");

        history.push("/");
    }

    const rememberHandler : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setRemember(e.target.checked);
    }

    useEffect(() => {
        const doRemember = localStorage.getItem("remember");
        if(doRemember === "true"){
            if(Auth.isAuth()){
                window.location.href = "/";
            }
            setRemember(true);
        }

    }, []);

    return (
        <>
        <h2 className={styles.title}>REKAPP</h2>
        <div className={styles.container}>
            <header>
                <h2>Sing In</h2>
            </header>
            <form onSubmit={submitHandler} className={styles.loginForm}>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <button className={styles.loginBtn}>Sing in</button>

                <div className={styles.options}>
                    <span>
                        <input onChange={rememberHandler} checked={remember} id="remember" type="checkbox"></input>
                        <label htmlFor="remember">Remember me!</label>
                    </span>
                    <a href="/">Forgot password?</a>
                </div>
            </form>
            
        </div>

        <div className={styles.container2}>
            <p className={styles.sign_up_msg}>Don't have an account? <Link to="/register">Sign up</Link> <span className={styles.text_muted}>or</span> <button className={styles.link} onClick={loginAsGuest}>Continue as guest</button></p>
        </div>

        </>
    )
}

export default Login
