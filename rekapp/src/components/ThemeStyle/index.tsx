import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/store';
import * as themeActions from '../../store/actions/themeActions'

function ThemeStyle({children} : {children: React.ReactNode}) {

    const dispatch = useDispatch();

    const darkMode : boolean | null = useSelector((state: RootState) => state.theme.darkMode);

    useEffect(() => {

        // BODY (DARK-THEME AND LIGHT THEME)
        if(darkMode){
            document.getElementsByTagName("body")[0].classList.remove("light-theme");
            document.getElementsByTagName("body")[0].classList.add("dark-theme");
          } else {
            document.getElementsByTagName("body")[0].classList.remove("dark-theme");
            document.getElementsByTagName("body")[0].classList.add("light-theme");
        }

        // SAVE THEME IN LOCALSTORAGE

        if(darkMode !== null) localStorage.setItem("darkMode", darkMode ? "darkMode" : "lightMode");

    }, [darkMode]);

    useEffect(() => {
        const theme = localStorage.getItem("darkMode");
        if(theme === "darkMode"){
            dispatch(themeActions.changeTheme());
        }
    }, [dispatch]);

    return (<>{children}</>)
}

export default ThemeStyle
