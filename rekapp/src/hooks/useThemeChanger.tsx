import {useSelector} from 'react-redux';
import { RootState } from '../store/store';

interface SassStyles {
    [className: string]: string
}

function useThemeChanger(darkStyles : SassStyles, lightStyles : SassStyles) {

    const darkMode : boolean | null = useSelector((state: RootState) => state.theme.darkMode);
    
    return (darkMode ?  darkStyles : lightStyles);
}

export default useThemeChanger
