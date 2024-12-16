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
        }
    }

    async function theProcess() {

        const profileImg = new requestServer(process.env.REACT_APP_SERVER_URL
            + '/xtServer/api/profileImg', {
            method: 'GET'
        })
        if (!isLoading) {
            if (isAuthenticated) {


                toServer.setBodyCustom({ userData: user });
                let res = await toServer.requestJson();
                if (res) {
                    debug.console('the response from request if authenticated : ', res);
                }

                res = await isRegistered();
                if (res) {
                    profileImg.setAuthorizedFlag(isAuthenticated);
                    delete (profileImg.options.body);
                    res = await profileImg.requestJson();
                    if (res) {
                        debug.console('profile img is : ', res.json.url);
                    }
                } else {
                    alert('need to register first');
                }


            } else {

                if (!isHomePage) {
                    alert('You are not Login, i navigate you to the home page');
                    navigate('/');
                } else {
                    /* 
                    
                    toServer.setBodyCustom({ userData: user });
                    toServer.requestJson().
                    then((res) => {
                        debug.console('the response from request not authenticated : ', res);
                    });
                    */
                }

            }
        }

    }
    useEffect(() => {
        toServer.setAuthorizedFlag(isAuthenticated);
        theProcess();

    }, [isAuthenticated, isLoading])

    return {
        loginWithRedirect, nowLogout, isAuthenticated, isLoading, user
    }


}




export { useControlLogin };