import {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.scss';

import Auth from './../../utils/Auth';
import {useHistory} from 'react-router-dom';



function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const submitHandler : React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await Auth.login(email, password);
        history.push("/");
    }

    return (
        <>
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
                        <input type="checkbox"></input>
                        <label>Remember me!</label>
                    </span>
                    <a href="#">Forgot password?</a>
                </div>
            </form>
            
        </div>

        <div className={styles.container2}>
            <p className={styles.sign_up_msg}>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>

        </>
    )
}

export default Login
