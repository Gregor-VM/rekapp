import styles from './change_password.module.scss';

function ChangePassword() {
    return (
        <div className={styles.container}>
        <h3>Change password</h3>
            <span>
                <label>Old password</label>
                <input type="password" placeholder="Old password"></input>
            </span>
            <span>
                <label>New password</label>
                <input type="password" placeholder="New password"></input>
            </span>
            <span>
                <label>Confirm new password</label>
                <input type="password" placeholder="Confirm new password"></input>
            </span>

            <span>
                <button>Change password</button>
            </span>
        </div>
    )
}

export default ChangePassword
