import { AboutJob } from "../Components/AboutJob/aboutJob";
import { commonContext } from "../MyLib/commonContext";
import { useParams } from "react-router-dom";
import { requestServer } from "../MyLib/RequestServer/requestServer";
import { useEffect, useState, useRef } from 'react'
import { LoadingScreen } from "../Components/TranstitionScreen/LoadingScreen";
import { useControlLogin } from "../MyLib/MyHook/controlLogin";


function ProviderJobDetail({ }) {
    const loadingScreen = useRef(null);
    const { no } = useParams()
    const [dataForAboutJob, setdataForAboutJob] = useState(null);
    const [data, setData] = useState(null);
    const [boolScreen, setboolscreen] = useState(true);
    const { isAuthenticated, isLoading, ifRegistered,
        user, loginWithRedirect, nowLogout } = useControlLogin(true);

    async function fetchData() {
        console.log('from fetchData -- -- - -');
        let job = new requestServer(process.env.REACT_APP_SERVER_URL
            + '/xtServer/api/fetchAPost' + `?no=${no}`, { method: 'GET' });
        job.setAuthorizedFlag(true);
        job.noBody();
        let result = await job.requestJson();

        if (result) {
            if (result.json.status) {
                //console.log('the data we found : ', result);
                loadingScreen.current.off();
                setTimeout(() => {
                    setboolscreen(false);
                }, 5000)
                return result.json.data;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async function appliedDetail() {
        console.log('from appliedDetail -- -- - -');
        let job = new requestServer(process.env.REACT_APP_SERVER_URL
            + '/xtServer/api/usersApplied' + `?no=${no}`, { method: 'GET' });
        job.setAuthorizedFlag(true);
        job.noBody();
        let result = await job.requestJson();

        if (result) {
            if (result.json.status) {
                console.log('From appliedDetail the data we found : ', result);
                return { theUser: result.json.user, applied: result.json.applied };
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    console.log("the data is : ", data);
    useEffect(() => {
        fetchData().
            then((res) => {
                if (res) {
                    setdataForAboutJob(res)
                }
            })

        appliedDetail().then((res) => {
            if (res) {
                setData({ user: res.theUser, applied: res.applied });
            }
        })
    }, [])

    useEffect(() => {
        //alert("running loadingscreen effect");
        console.log('from userEffect');
        if (loadingScreen.current) {
            loadingScreen.current.on();
        }

        return (() => {
            loadingScreen.current.cancel();
        })
    }, [loadingScreen.current]);

    return (
        <>  {boolScreen ? <LoadingScreen outControl={loadingScreen} /> : null}
            <main>
                {isAuthenticated ?
                    <>
                        <div className="flex flex-row">

                            {dataForAboutJob ?
                                <commonContext.Provider value={{ dataForAboutJob }}>
                                    <AboutJob useInProviderJobDetailjsx
                                        isAuthenicated={isAuthenticated} />
                                </commonContext.Provider>
                                :
                                <h1>No data from server</h1>
                            }
                        </div>
                        <div>
                            Must contain Applied data
                        </div>
                    </>

                    : null}

            </main>

        </>
    );
}


export { ProviderJobDetail }