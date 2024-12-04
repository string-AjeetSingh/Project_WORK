import { useAuth0 } from "@auth0/auth0-react";

function LoginTry({ }) {

    const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading Please Wait ...</div>
    }
    if (isAuthenticated) {
        console.log('below user : ', user);

    }

    return (
        <>
            <div className="p-10 border-2 m-1 text-3xl font-serif  border-red-400">
                Using login now working on it.
                <p>Below , let's test it</p>
                <br>
                </br>

            </div>
            <div className="flex flex-row justify-center">
                <button className=" font-bold text-2xl p-1 m-2 text-center pl-5 pr-5 
                 bg-pink-400 border-2 border-black rounded-xl active:bg-red-500" onClick={() => { loginWithRedirect(); }}>
                    Login
                </button>
                <button className=" font-bold text-2xl p-1 m-2 text-center pl-5 pr-5 
                 bg-pink-400 border-2 border-black rounded-xl active:bg-red-500"
                    onClick={() => {
                        logout({
                            logoutParams: {
                                returnTo
                                    : 'http://localhost:3000/rough'
                            }
                        });
                    }}>
                    Logout
                </button>
            </div>
        </>
    );
}

export { LoginTry }
