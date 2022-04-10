import Auth from '../../utils/Auth';
import axios from '../../utils/axios';
import styles from './delete_account.module.scss';

function DeleteAccount() {

    const handleDeleteAccount = async () => {
        const response = await axios.delete("/delete-account");
        if(response.status === 204){
            Auth.logout();
        }
    };

    return (
        <div className={styles.container}>
            <h2>Delete Account</h2>
            <span>
                <img alt="delete account" src="/delete.svg"></img>
                <small>If you delete your account, there's no going back. All of your information on this site will be deleted.</small>
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </span>
        </div>
    )
}

export default DeleteAccount
