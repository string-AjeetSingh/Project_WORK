import { AboutJob } from "../Components/AboutJob/aboutJob";
import { AppliedInd } from "../Components/AppliedIndividuals/AppliedInd";
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
            + '/xtServer/api/usersApplied' + `?no=${no}`, { method: 'GET' }, true);
        job.setAuthorizedFlag(true);
        job.noBody();
        let result = await job.requestJson();
        console.log('From appliedDetail the result is :  ', result);

        if (result) {
            if (result.json.status) {
                console.log('From appliedDetail the data we found : ', result);
                return result.json.applied;
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
            setData(res);
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
            <main className="flex flex-row justify-center">
                {isAuthenticated ?
                    <>

                        <div className='p-2 flex flex-col w-full 
                        border rounded-2xl border-green-600
                        max-w-[900px] min-w-[370px]'>

                            {dataForAboutJob ?
                                <commonContext.Provider value={{ dataForAboutJob }}>
                                    <AboutJob useInProviderJobDetailjsx
                                        isAuthenicated={isAuthenticated} />
                                    <hr className="w-full mt-7 mb-1 rounded-xl border-1 
                border-green-800"></hr>
                                </commonContext.Provider>
                                :
                                <h1>No data from server</h1>
                            }
                            {data ?
                                <AppliedInd data={data} />
                                : <h1>No User Applied</h1>}

                        </div>
                    </>

                    : null}

            </main>

        </>
    );
}


export { ProviderJobDetail }