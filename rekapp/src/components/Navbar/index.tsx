import {useState, useEffect, createRef} from 'react';
import styles from "./navbar.module.scss";

import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import * as actions from '../../store/actions/modalActions';

import AddCardButton from '../AddCardButton';
import { RootState } from '../../store/store';
import Auth from '../../utils/Auth';

function Navbar() {
    const [menu, setMenu] = useState(false);
    const [open, setOpen] = useState(false);

    const imgLink = "https://yt3.ggpht.com/ytc/AKedOLTpvKuGuqG-anw7EaboiIh5Zb8AxdB1rFFkjIB4oQ=s48-c-k-c0x00ffffff-no-rj";

    const dispatch = useDispatch();
      
    const isHome = (useLocation()).pathname === "/";
    const count : {count: number, total: number | null} = useSelector((state: RootState) => state.practiceCount);
    const profileMenuRef : React.LegacyRef<HTMLDivElement> = createRef();

    const openMenu = () => {
        setMenu(true);
    }

    const closeMenu = () => {
        setMenu(false);
    }

    const openModal = () => {
        dispatch(actions.openModal(0));
    };

    const openProfileMenu = () => {
        setOpen(prev => !prev);
    };

    const handleLogout = () => {
        Auth.logout();
        window.location.href = "/";
    };


    return (
        <>

        {open && (<div onClick={() => setOpen(false)} className={styles.outside}></div>)}

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
                {(count.total && <span>{count.count}/{count.total}</span>)}

                <img onClick={openProfileMenu} className={styles.profile} title="Profile" alt="profile" src={imgLink}></img>


                <div ref={profileMenuRef} style={{display: open ? undefined : "none"}} className={styles.profileMenu}>
                    <img src={imgLink}></img>
                    <div ref={profileMenuRef}>
                        <p>GregorVM</p>
                        <small>john@email.com</small>
                    </div>

                    <span>
                        <button>Manage my account</button>
                        <button onClick={handleLogout}>Logout</button>
                    </span>
                </div>

            </div>
        </nav>
        </>
    )
}

export default Navbar
