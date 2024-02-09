
import {useEffect, useCallback} from 'react';

import Auth from './../../utils/Auth';
import {useHistory} from 'react-router-dom';

function Demo() {

    const history = useHistory();

    const loginAsGuest = useCallback(
      async () => {
        await Auth.loginGuest();
        localStorage.setItem("remember", "true");
        history.push("/");
    }, [history]);

    useEffect(() => {
      loginAsGuest();
    }, [loginAsGuest])

    return <div></div>
}

export default Demo;
