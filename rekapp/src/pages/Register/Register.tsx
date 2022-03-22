import { Link } from 'react-router-dom';
import styles from './register.module.scss';

function Register() {
    return (
        <>
        <div className={styles.container}>
            <header>
                <h2>Sing up</h2>
            </header>
            <form className={styles.registerForm}>
                <input autoComplete="new-password" type="text" placeholder="Email"></input>
                <input autoComplete="new-password" type="text" placeholder="Confirm email"></input>
                <input autoComplete="new-password" type="password" placeholder="Password"></input>
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
