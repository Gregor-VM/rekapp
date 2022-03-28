import {useState} from 'react'
import Navbar from '../../components/Navbar';
import styles from './settings.module.scss';

import AccountSettings from './../../components/AccountSettings';
import ChangePassword from './../../components/ChangePassword';

function Settings() {

    const [settingsType, setSettingsType] = useState(0);

    const settingsView = (type: number) => {
        switch (type) {
            case 0:
                return <></>;
            case 1:
                return <AccountSettings />;
            case 2:
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
                    <li onClick={() => setSettingsType(0)}>General settings</li>
                    <li onClick={() => setSettingsType(1)}>Manage account</li>
                    <li onClick={() => setSettingsType(2)}>Change password</li>
                </ul>
            </div>

            {settingsView(settingsType)}

        </div>
        </>
    )
}

export default Settings;
