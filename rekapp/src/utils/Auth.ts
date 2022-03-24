import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();



class AuthClass {

    async login(email: string, password: string) {
        const response = await axios.post("http://localhost:3001/auth/login", {email, password});
        if(response.status === 200){
            cookies.set('token', response.data.token);
        }
    }

    async register (username: string, email: string, password: string) {
        const response = await axios.post("http://localhost:3001/auth/register", {username, email, password});
        if(response.status === 200){
            cookies.set('token', response.data.token);
        }
    }

    isAuth () {
        return (cookies.get("token")) ? true : false;
    }

    logout() {
        cookies.remove('token');
    }

    getToken () {
        return cookies.get("token");
    }


}


const Auth = new AuthClass();


export default Auth;