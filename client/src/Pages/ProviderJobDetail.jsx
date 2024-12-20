import { AboutJob } from "../Components/AboutJob/aboutJob";
import { commonContext } from "../MyLib/commonContext";
import { useParams } from "react-router-dom";
import { requestServer } from "../MyLib/RequestServer/requestServer";
import { useEffect, useState, useRef } from 'react'
import { LoadingScreen } from "../Components/TranstitionScreen/LoadingScreen";


function ProviderJobDetail({ }) {
    const loadingScreen = useRef(null);
    const { no } = useParams()
    console.log('the id is : ', no);
    const [dataForAboutJob, setdataForAboutJob] = useState(null);
    console.log('the data is  : ', dataForAboutJob);
    const [boolScreen, setboolscreen] = useState(true);

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

    useEffect(() => {
        fetchData().
            then((res) => {
                if (res) {
                    setdataForAboutJob(res)
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
                <div className="flex flex-row">

                    {dataForAboutJob ?
                        <commonContext.Provider value={{ dataForAboutJob }}>
                            <AboutJob useInProviderJobDetailjsx />
                        </commonContext.Provider>
                        :
                        <h1>No data from server</h1>
                    }
                </div>
                <div>
                    Must contain Applied data
                </div>

            </main>

        </>
    );
}


export { ProviderJobDetail }