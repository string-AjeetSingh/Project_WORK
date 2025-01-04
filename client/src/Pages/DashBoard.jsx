import { UserProfile } from "../Components/UserProfile/UserProfile";
import { Header } from "../Components/Header/header";
import { Footer } from "../Components/Footer/footer";
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { commonContext } from "../MyLib/commonContext";
import { ProviderStatus } from "../Components/ProviderStatus/providerStatus";
import { LoadingScreen } from "../Components/TranstitionScreen/LoadingScreen";
import { useRef, useEffect, useState } from "react";

function DashBoard({ }) {

    const { isAuthenticated, isLoading, user,
        loginWithRedirect, nowLogout } = useControlLogin();
    const loadingScreen = useRef(null);
    const offLoadingScreenFromChild = useRef(null);
    const [boolscreen, setboolscreen] = useState(true);

    useEffect(() => {
        console.log('from userEffect');
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
        {isAuthenticated ?
            <>
                <div className="p-1">

                    <header >
                        <commonContext.Provider value={{ user }}>
                            <Header logout={nowLogout} search_Link ></Header>
                        </commonContext.Provider>
                    </header>
                    <hr className="border-[1px] 
                                 border-green-950"></hr>
                    <main>

                        <UserProfile isAuthenticated={isAuthenticated} iAmReady={offLoadingScreenFromChild} />


                    </main>

                    <footer>
                        <Footer></Footer>
                    </footer>
                </div>

            </>

            : <h3>you are not authenticated to see this, please login</h3>}
    </>);

}

export { DashBoard }