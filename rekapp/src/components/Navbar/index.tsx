import {useState} from 'react'
import styles from "./navbar.module.scss";

import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/modalActions';

function Navbar() {
    const [menu, setMenu] = useState(false);

    const dispatch = useDispatch();

    const openMenu = () => {
        setMenu(true);
    }

    const closeMenu = () => {
        setMenu(false);
    }

    const openModal = () => {
        dispatch(actions.openModal(0));
    };

    return (
        <>
        <div className={styles.menubar + " " + (menu ? styles.openMenu : styles.closeMenu)}>
            Menu
        </div>
        {menu && (<div className={styles.out} onClick={closeMenu}></div>)}
        <nav className={styles.navbar}>
            <div>
            <div className={styles.menu} onClick={openMenu}>
                <div></div><div></div><div></div>
            </div>
            <h2>
                REKAPP
            </h2>
            </div>

            <div className={styles.profileContainer}>
                <button onClick={openModal}>CREATE DECK</button>
                <h4>Gregor</h4>
                <img alt="profile" src="https://yt3.ggpht.com/ytc/AKedOLTpvKuGuqG-anw7EaboiIh5Zb8AxdB1rFFkjIB4oQ=s48-c-k-c0x00ffffff-no-rj"></img>
            </div>
        </nav>
        </>
    )
}

export default Navbar
