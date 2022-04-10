import {useParams, useHistory} from 'react-router-dom';
import styles from './settings.module.scss';

import Navbar from '../../components/Navbar';
import AccountSettings from './../../components/AccountSettings';
import ChangePassword from './../../components/ChangePassword';
import DeleteAccount from '../../components/DeleteAccount';

function Settings() {

    const {option} : {option: string} = useParams();
    const history = useHistory();

    const settingsView = (option: string) => {
        switch (option) {
            case "manage-account":
                return <AccountSettings />;
            case "change-password":
                return <ChangePassword />;
            case "delete-account":
                return <DeleteAccount />;
            default:
                return <></>;
        }
    }

    return (
        <>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ul>
                    <li style={{backgroundColor: option === "manage-account" ? "#ff5a1d" : ""}} onClick={() => history.push("/settings/manage-account")}>Manage account</li>
                    <li style={{backgroundColor: option === "change-password" ? "#ff5a1d" : ""}} onClick={() => history.push("/settings/change-password")}>Change password</li>
                    <li style={{backgroundColor: option === "delete-account" ? "#ff5a1d" : ""}} onClick={() => history.push("/settings/delete-account")}>Delete account</li>
                </ul>
            </div>

            {settingsView(option)}

        </div>
        </>
    )
}

export default Settings;
