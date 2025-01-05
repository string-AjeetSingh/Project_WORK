
import { HomeWithLogin } from './../Components/HomeWithLogin/HomeWithLogin';
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../Components/TranstitionScreen/LoadingScreen';
import { useRef, useState, useEffect } from 'react';

function Search({ }) {
    const loadingScreen = useRef(null);
    const offLoadingScreenFromChild = useRef(null);
    const [boolscreen, setboolscreen] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, ifRegistered,
        user, loginWithRedirect, nowLogout } = useControlLogin(true);

    useEffect(() => {
        //console.log('from userEffect');
        if (loadingScreen.current) {
            offLoadingScreenFromChild.current = {
                off: () => {
                    loadingScreen.current.off();
                    setTimeout(() => {
                        setboolscreen(null);
                    }, 5000)
                }
            }
            loadingScreen.current.on();
        }
    }, [loadingScreen.current]);


    return (<>
        {boolscreen ? <LoadingScreen outControl={loadingScreen} /> : null}
        {isAuthenticated ? ifRegistered ? <HomeWithLogin iAmReady={offLoadingScreenFromChild}
            useAsSearch logout={nowLogout}
            user={user} isAuthenticated={isAuthenticated} /> : null
            : navigate('/')}
    </>);
}




export { Search }