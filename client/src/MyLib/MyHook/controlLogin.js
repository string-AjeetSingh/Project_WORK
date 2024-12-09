import { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ifDebugging } from "../../MyLib/ifDebugging/ifDebugging";
import { requestServer } from "../RequestServer/requestServer";


let debug = new ifDebugging(process.env.REACT_APP_isDebugging);


const toServer = new requestServer
    (process.env.REACT_APP_SERVER_URL + '/xtServer/api/token', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' }, credentials: 'include'
    });


function useControlLogin(isHomePage = false) {

    const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();


    function nowLogout() {
        logout({
            logoutParams: {
                returnTo
                    : process.env.REACT_APP_RETURN_URL
            }
        });
    }
    //fetch('sur');
    useEffect(() => {

        if (isAuthenticated) {


            toServer.setBody({ authorized: isAuthenticated, userData: user });
            toServer.requestJson().
                then((res) => {
                    debug.console('the response from request if authenticated : ', res);
                });

        } else {

            if (isHomePage) {

            }
            toServer.setBody({ authorized: isAuthenticated, userData: user });
            toServer.requestJson().
                then((res) => {
                    debug.console('the response from request not authenticated : ', res);
                });


        }

    }, [isAuthenticated])

    return {
        loginWithRedirect, nowLogout, isAuthenticated, isLoading
    }


}




export { useControlLogin };