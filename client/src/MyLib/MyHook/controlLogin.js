import { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ifDebugging } from "../../MyLib/ifDebugging/ifDebugging";
import { requestServer } from "../RequestServer/requestServer";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { commonContext } from "../commonContext";

let debug = new ifDebugging(process.env.REACT_APP_isDebugging);


const toServer = new requestServer
    (process.env.REACT_APP_SERVER_URL + '/xtServer/api/token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });


function useControlLogin(isHomePage = false) {

    const navigate = useNavigate();
    const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
    const [ifRegistered, setifRegistered] = useState(null);

    function nowLogout() {
        logout({
            logoutParams: {
                returnTo
                    : process.env.REACT_APP_RETURN_URL
            }
        });

    }
    //fetch('sur');

    async function isRegistered() {
        const check = new requestServer(process.env.REACT_APP_SERVER_URL +
            '/xtServer/api/isRegistered', { optionsMode: 'default' }, true);

        let result = await check.requestJson();


        if (result) {
            if (result.json.status) {
                console.log('is registered');
                return true;
            } else {
                console.log('is not registered');
                return false;
            }
        }
        else {
            console.error('an error with request');
            return 'error with server';
        }
    }

    async function theProcess() {


        if (!isLoading) {
            if (isAuthenticated) {


                toServer.setBodyCustom({ userData: user });
                let res = await toServer.requestJson();
                if (res) {
                    debug.console('the response from request if authenticated : ', res);
                }




                res = await isRegistered();
                if (res) {

                    setifRegistered(res);

                } else {
                    //alert('need to register first');
                    navigate('/welcomeUser');
                }



            } else {

                if (!isHomePage) {
                    alert('You are not Login, i navigate you to the home page');
                    navigate('/');
                } else {

                }

            }
        }

    }
    useEffect(() => {
        toServer.setAuthorizedFlag(isAuthenticated);
        theProcess();

    }, [isAuthenticated, isLoading])

    return {
        loginWithRedirect, nowLogout, isAuthenticated, isLoading, user,
        ifRegistered
    }


}




export { useControlLogin };