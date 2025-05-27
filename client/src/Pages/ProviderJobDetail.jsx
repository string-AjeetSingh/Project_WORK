import { AboutJob, DeleteWork } from "../Components/AboutJob/aboutJob";
import { AppliedInd } from "../Components/AppliedIndividuals/AppliedInd";
import { commonContext } from "../MyLib/commonContext";
import { useParams } from "react-router-dom";
import { requestServer } from "../MyLib/RequestServer/requestServer";
import { useEffect, useState, useRef } from 'react'
import { LoadingScreen } from "../Components/TranstitionScreen/LoadingScreen";
import { useControlLogin } from "../MyLib/MyHook/controlLogin";
import { useNavigate } from "react-router-dom";


function ProviderJobDetail({ }) {
    const loadingScreen = useRef(null);
    const navigate = useNavigate();
    const { no } = useParams()
    const [dataForAboutJob, setdataForAboutJob] = useState(null);
    const [data, setData] = useState(null);
    const [boolScreen, setboolscreen] = useState(true);
    const { isAuthenticated, isLoading, ifRegistered,
        user, loginWithRedirect, nowLogout } = useControlLogin(true);

    async function fetchData() {
        //console.log('from fetchData -- -- - -');
        let job = new requestServer(process.env.REACT_APP_SERVER_URL
            + '/xtServer/api/fetchAPost' + `?no=${no}`, { method: 'GET' });
        job.setAuthorizedFlag(isAuthenticated);
        job.noBody();
        let result = await job.requestJson();

        if (result) {

            loadingScreen.current.off();
            setTimeout(() => {
                setboolscreen(false);
            }, 5000)

            if (result.json.status) {
                return result.json.data;
            } else {
                return false;
            }
        } else {
            loadingScreen.current.off();
            setTimeout(() => {
                setboolscreen(false);
            }, 5000)
            return false;
        }
    }

    async function appliedDetail() {
        //console.log('from appliedDetail -- -- - -');
        let job = new requestServer(process.env.REACT_APP_SERVER_URL
            + '/xtServer/api/usersApplied' + `?no=${no}`, { method: 'GET' }, true);
        job.setAuthorizedFlag(isAuthenticated);
        job.noBody();
        let result = await job.requestJson();
        //console.log('From appliedDetail the result is :  ', result);

        if (result) {
            if (result.json.status) {
                //console.log('From appliedDetail the data we found : ', result);
                return result.json.applied;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    async function deleteJob(deleteButton) {
        //console.log('from deleteJob -- -- - -');
        //console.log('the deleteButton is : ', deleteButton);
        deleteButton.current.innerHTML = 'Processing';
        let job = new requestServer(process.env.REACT_APP_SERVER_URL
            + '/xtServer/api/deleteWork' + `?no=${no}`, { method: 'GET' }, true);
        job.setAuthorizedFlag(isAuthenticated);
        job.noBody();
        let result = await job.requestJson();
        //console.log('From deleteJob the result is :  ', result);

        deleteButton.current.innerHTML = 'Delete';

        if (result) {
            if (result.json.status) {
                //console.log('From deleteJob the data we found : ', result);
                alert('Deleted');
                navigate('/provider');
            } else {
                alert(result.json.message);
            }
        } else {
            alert('Some kind of error from server');
        }

    }

    //console.log("the data is : ", data);
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
        //console.log('from userEffect');
        if (loadingScreen.current) {
            loadingScreen.current.on();
        }

        return (() => {
            loadingScreen.current.cancel();
        })
    }, [loadingScreen.current]);

    return (
        <>  {boolScreen ? <LoadingScreen outControl={loadingScreen} /> : null}
            <main className="flex flex-row justify-center pt-5 pb-5">
                {isAuthenticated ?
                    <>

                        {dataForAboutJob ?
                            <div className='p-2 flex flex-col w-full 
                        border rounded-2xl border-green-600
                        max-w-[900px] min-w-[360px]'>

                                <commonContext.Provider value={{ dataForAboutJob }}>
                                    <AboutJob useInProviderJobDetailjsx
                                        isAuthenicated={isAuthenticated} />
                                    <hr className="w-full mt-7 mb-1 rounded-xl border-1 
                border-green-800"></hr>
                                </commonContext.Provider>
                                {data ?
                                    <AppliedInd data={data} />
                                    : <h1>No User Applied</h1>}
                                <hr className="w-full mt-7 mb-1 rounded-xl border-1 
                border-green-800"></hr>
                                <DeleteWork handleButton={deleteJob} />

                            </div>
                            :
                            <h1 className="text-3xl font-serif text-green-300">No data from server</h1>
                        }
                    </>

                    : null}

            </main>

        </>
    );
}


export { ProviderJobDetail }