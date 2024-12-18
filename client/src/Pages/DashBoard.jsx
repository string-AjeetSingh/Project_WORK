import { UserProfile } from "../Components/UserProfile/UserProfile";
import { Header } from "../Components/Header/header";
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { commonContext } from "../MyLib/commonContext";
import { ProviderStatus } from "../Components/ProviderStatus/providerStatus";

function DashBoard({ }) {

    /* 
     <header >
                <commonContext.Provider value={{ user }}>
                    <Header logout={logout} ></Header>
                </commonContext.Provider>
            </header><hr className="border-[1px] 
     border-green-950"></hr>


      if (!isLoading) {
        return (<>
            {isAuthenticated ? <HomeWithLogin logout={nowLogout} user={user} /> : <HomeWithoutLogin
                login={loginWithRedirect} user={user} />}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>
    */


    const { isAuthenticated, isLoading, user,
        loginWithRedirect, nowLogout } = useControlLogin();

    if (!isLoading) {
        return (<>
            {isAuthenticated ?
                <>

                    <header >
                        <commonContext.Provider value={{ user }}>
                            <Header logout={nowLogout} ></Header>
                        </commonContext.Provider>
                    </header>
                    <hr className="border-[1px] 
                     border-green-950"></hr>
                    <main>
                        <div className="text-3xl font-serif m-1 p-1 
                        text-green-700" >
                            DashBoard</div>
                        <hr className="border-green-600 m-1"></hr>
                        <UserProfile isAuthenticated={isAuthenticated} />
                        <hr className="border-green-600 m-1"></hr>
                        <br />
                        <ProviderStatus isAuthenticated={isAuthenticated} />
                    </main>

                    <footer>

                    </footer>

                </>

                : <h3>you are not authenticated to see this, please login</h3>}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>

}

export { DashBoard }