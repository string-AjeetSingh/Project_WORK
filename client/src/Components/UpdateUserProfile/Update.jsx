import { UserProfile } from "../UserProfile/UserProfile";



function TheUpdate({ isAuthenticated }) {
    return (
        <>
            <UserProfile isAuthenticated={isAuthenticated}
                useAsUpdate />
        </>
    );
}



export { TheUpdate };