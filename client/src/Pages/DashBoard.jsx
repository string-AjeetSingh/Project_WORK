import { UserProfile } from "../Components/UserProfile/UserProfile";
import { Header } from "../Components/Header/header";
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { commonContext } from "../MyLib/commonContext";


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
        loginWithRedirect, nowLogout } = useControlLogin(true);

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
                        <UserProfile />
                    </main>

                    <footer>

                    </footer>

                </>

                : null}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>

}

export { DashBoard }