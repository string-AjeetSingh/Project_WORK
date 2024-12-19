import { TheUpdate } from "../Components/UpdateUserProfile/Update";
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { UserProfile } from "../Components/UserProfile/UserProfile";


function UpdateProfile({ }) {
    const { isAuthenticated, isLoading, ifRegistered,
        user, loginWithRedirect, nowLogout } = useControlLogin(true);

    if (!isLoading) {
        return (<>
            {isAuthenticated ?
                <UserProfile isAuthenticated={isAuthenticated}
                    email={user.email}
                    useAsUpdate />
                :
                <h1>You are not authenticated</h1>
            }
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>
}




export { UpdateProfile };