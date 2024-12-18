import { AboutJob } from "../Components/AboutJob/aboutJob";
import { commonContext } from "../MyLib/commonContext";
import { useParams } from "react-router-dom";
import { requestServer } from "../MyLib/RequestServer/requestServer";
import { useEffect, useState, useRef } from 'react'

function JobDetail({ }) {
    const { no } = useParams()
    console.log('the id is : ', no);
    const [dataForAboutJob, setdataForAboutJob] = useState(null);
    console.log('the data is  : ', dataForAboutJob);

    async function fetchData() {
        console.log('from fetchData -- -- - -');
        let job = new requestServer(process.env.REACT_APP_SERVER_URL
            + '/xtServer/api/fetchAPost' + `?no=${no}`, { method: 'GET' });
        job.setAuthorizedFlag(true);
        job.noBody();
        let result = await job.requestJson();

        if (result) {
            console.log('the data we found : ', result);
            return result.json.data;
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

    return (
        <>
            <main>
                <div className="flex flex-row">

                    {dataForAboutJob ?
                        <commonContext.Provider value={{ dataForAboutJob }}>
                            <AboutJob useInJobDetailjsx />
                        </commonContext.Provider>
                        :
                        <h1>No data from server</h1>
                    }
                </div>

            </main>
        </>
    );
}


export { JobDetail }