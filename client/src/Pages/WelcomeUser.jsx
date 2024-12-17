import { use } from "react";
import { CreateUserProfile } from "../Components/CreateUserProfile/createUserProfile";
import { useControlLogin } from "../MyLib/MyHook/controlLogin";



function WelcomeUser({ }) {
    const { isAuthenticated, isLoading, user,
        loginWithRedirect, nowLogout } = useControlLogin();

    if (!isLoading) {
        if (isAuthenticated) {
            return (
                <>

                    <main>
                        <CreateUserProfile email={user.email}
                            isAuthenticated={isAuthenticated} />
                    </main>
                </>
            );
        }
        else {
            return (
                <>
                    <h3>Not loged in</h3>
                </>
            );
        }

    }

}


export { WelcomeUser }