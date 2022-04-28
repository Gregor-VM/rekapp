import {useState, createRef, useEffect, useCallback} from 'react';
import styles from "./navbar.module.scss";

import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import * as userActions from '../../store/actions/userActions';

import AddCardButton from '../AddCardButton';
import { RootState } from '../../store/store';
import Auth from '../../utils/Auth';
import { User } from '../../interfaces';
import axios from '../../utils/axios';

function Navbar() {
    const [menu, setMenu] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
      
    const isHome = (useLocation()).pathname === "/";
    const count : {count: number, total: number | null} = useSelector((state: RootState) => state.practiceCount);

    const user : User = useSelector((state: RootState) => state.user);

    const profileMenuRef : React.LegacyRef<HTMLDivElement> = createRef();

    const openMenu = () => {
        setMenu(true);
    }

    const closeMenu = () => {
        setMenu(false);
    }

    const openProfileMenu = () => {
        setOpen(prev => !prev);
    };

    const handleLogout = () => {
        Auth.logout();
        window.location.href = "/";
    };

    const handleSettings = () => {
        history.push("/settings/manage-account");
    }

    const getUserInfo = useCallback(
        async () => {
            const userInfo: User = (await (axios.get("/user-info"))).data;
            dispatch(userActions.setUser(userInfo));
        },
        [dispatch],
    );

    useEffect(() => {
        if(user.username === "" || user.email === ""){
            getUserInfo();
        }
    }, [getUserInfo, user.username, user.email]);


    return (
        <>

        {open && (<div onClick={() => setOpen(false)} className={styles.outside}></div>)}

        {(isHome && <AddCardButton />)}

        <div className={styles.menubar + " " + (menu ? styles.openMenu : styles.closeMenu)}>
            <ul className={styles.side_menu}>

                <div className={styles.mobileProfile}>

                    <img src={user.profileImg ? user.profileImg : "/user.svg"} alt="profile"></img>
                    <div>
                        <p>{user.username}</p>
                        <small>{user.email}</small>
                    </div>

                </div>

                <li onClick={() => history.push("/")}><i className="fas fa-home"></i>Home</li>
                <li onClick={() => history.push("/shared-with-me")}><i className="fas fa-share-alt"></i>Shared With Me</li>
                <li onClick={() => history.push("/settings/manage-account")}><i className="fas fa-cog"></i>Settings</li>
                <li className={styles.mobile} onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Logout</li>
            </ul>
        </div>
        {menu && (<div className={styles.out} onClick={closeMenu}></div>)}
        <nav className={styles.navbar}>
            <div>
            <div className={styles.menu} onClick={openMenu}>
                <div></div><div></div><div></div>
            </div>
            <h2 className={styles.title} onClick={() => history.push("/")}>
                REKAPP
            </h2>
            </div>

            <div className={styles.profileContainer}>
                
                {(count.total && <span>{count.count + 1}/{count.total}</span>)}

                <img onClick={openProfileMenu} className={styles.profile} title="Profile" alt="profile" src={user.profileImg ? user.profileImg : "/user.svg"}></img>


                <div ref={profileMenuRef} style={{display: open ? undefined : "none"}} className={styles.profileMenu}>
                    <img src={user.profileImg ? user.profileImg : "/user.svg"} alt="profile"></img>
                    <div ref={profileMenuRef}>
                        <p>{user.username}</p>
                        <small>{user.email}</small>
                    </div>

                    <span>
                        <button onClick={handleSettings}>Manage my account</button>
                        <button onClick={handleLogout}>Logout</button>
                    </span>
                </div>

            </div>
        </nav>
        </>
    )
}

export default Navbar
