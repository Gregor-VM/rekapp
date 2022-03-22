import { Link } from 'react-router-dom';
import styles from './login.module.scss';

function Login() {
    return (
        <>
        <div className={styles.container}>
            <header>
                <h2>Sing In</h2>
            </header>
            <form className={styles.loginForm}>
                <input type="text" placeholder="Email"></input>
                <input type="password" placeholder="Password"></input>
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
