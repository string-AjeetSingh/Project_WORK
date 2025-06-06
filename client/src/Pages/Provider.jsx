import { useState, useRef, useEffect } from "react";
import { LoadingScreen } from "../Components/TranstitionScreen/LoadingScreen";
import { Header } from "../Components/Header/header";
import { Footer } from "../Components/Footer/footer";
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { commonContext } from "../MyLib/commonContext";
import { ProvideWork } from "../Components/ProvideWork/ProvideWork";

function Provider({ }) {
    const { isAuthenticated, isLoading, user,
        nowLogout } = useControlLogin();
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
                setboolscreen(false);
            }, 5000)

        }
    }, [isLoading])


    return (
        <>
            {boolscreen ? <LoadingScreen outControl={loadingScreen} /> : null}
            {isAuthenticated ?
                <>

                    <header >
                        <commonContext.Provider value={{ user }}>
                            <Header logout={nowLogout} search_Link ></Header>
                        </commonContext.Provider>
                    </header><hr className="border-[1px] 
                              border-green-950"></hr>
                    <div className="pb-1">
                        <main className="flex flex-row justify-center ">
                            <div className='p-2 flex flex-col w-full 
                        border rounded-2xl border-green-800
                        max-w-[900px] min-w-[360px] '>
                                <ProvideWork isAuthenticated={isAuthenticated} email={user ? user.email : null} />
                            </div>
                        </main>

                        <footer>
                            <Footer></Footer>
                        </footer>
                    </div>
                </>
                : null}

        </>
    );
}




export { Provider }