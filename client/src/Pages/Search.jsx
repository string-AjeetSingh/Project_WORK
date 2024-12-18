
import { HomeWithLogin } from './../Components/HomeWithLogin/HomeWithLogin';
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { useNavigate } from 'react-router-dom';

function Search({ }) {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, ifRegistered,
        user, loginWithRedirect, nowLogout } = useControlLogin(true);

    if (!isLoading) {
        return (<>
            {isAuthenticated ? ifRegistered ? <HomeWithLogin useAsSearch logout={nowLogout}
                user={user} isAuthenticated={isAuthenticated} /> : null
                : navigate('/')}
        </>);
    }
    return <div className="text-2xl font-bold ">Loading Please wait</div>
}


export { Search }