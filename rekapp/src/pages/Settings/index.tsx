import {useParams, useHistory} from 'react-router-dom';
import styles from './settings.module.scss';

import Navbar from '../../components/Navbar';
import AccountSettings from './../../components/AccountSettings';
import ChangePassword from './../../components/ChangePassword';

function Settings() {

    const {option} : {option: string} = useParams();
    const history = useHistory();

    const settingsView = (option: string) => {
        switch (option) {
            case "manage-account":
                return <AccountSettings />;
            case "change-password":
                return <ChangePassword />;
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
                    <li onClick={() => history.push("/settings/general-settings")}>General settings</li>
                    <li onClick={() => history.push("/settings/manage-account")}>Manage account</li>
                    <li onClick={() => history.push("/settings/change-password")}>Change password</li>
                </ul>
            </div>

            {settingsView(option)}

        </div>
        </>
    )
}

export default Settings;
