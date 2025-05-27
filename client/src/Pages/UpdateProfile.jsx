
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { UserProfile } from "../Components/UserProfile/UserProfile";
import { LoadingScreen } from "../Components/TranstitionScreen/LoadingScreen";
import { useState, useRef, useEffect } from "react";

function UpdateProfile({ }) {
    const { isAuthenticated, isLoading, ifRegistered,
        user, loginWithRedirect, nowLogout } = useControlLogin(true);
    const loadingScreen = useRef(null);
    const [boolscreen, setboolscreen] = useState(true);


    useEffect(() => {
        //console.log('from userEffect');
        if (loadingScreen.current) {

            loadingScreen.current.on();
        }
    }, [loadingScreen.current]);


    useEffect(() => {
        if (!isLoading) {

            loadingScreen.current.off();
            setTimeout(() => {
                setboolscreen(null);
            }, 5000)

        }
    }, [isAuthenticated, isLoading])




    return (<>
        {boolscreen ? <LoadingScreen outControl={loadingScreen} /> : null}
        {isAuthenticated ?
            <div className="p-1">

                <UserProfile isAuthenticated={isAuthenticated}
                    email={user.email}
                    useAsUpdate />
            </div>
            :
            <h1>You are not authenticated</h1>
        }
    </>);
}





export { UpdateProfile };