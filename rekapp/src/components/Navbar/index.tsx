import {useState} from 'react';
import styles from "./navbar.module.scss";

import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import * as actions from '../../store/actions/modalActions';

import AddCardButton from '../AddCardButton';
import { RootState } from '../../store/store';

function Navbar() {
    const [menu, setMenu] = useState(false);

    const dispatch = useDispatch();
      
    const isHome = (useLocation()).pathname === "/";
    const {progress: {total, current}} = useSelector((state: RootState) => state.cards);

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

        {(isHome && <AddCardButton />)}

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
                
                {(isHome && <button onClick={openModal}>CREATE DECK</button>)}
                {(total && <span>{current}/{total}</span>)}

                <h4>Gregor</h4>
                <img alt="profile" src="https://yt3.ggpht.com/ytc/AKedOLTpvKuGuqG-anw7EaboiIh5Zb8AxdB1rFFkjIB4oQ=s48-c-k-c0x00ffffff-no-rj"></img>
            </div>
        </nav>
        </>
    )
}

export default Navbar
