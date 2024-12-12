import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { Section1 } from "./subComponents";
import { AboutJob } from "../AboutJob/aboutJob";
import { JobCards } from "../JobCards/jobCards";
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { requestServer } from "../../MyLib/RequestServer/requestServer";
import { ifDebugging } from "../../MyLib/ifDebugging/ifDebugging";
import { useState, useEffect, useRef } from "react";
import { commonContext } from "../../MyLib/commonContext";
import { myContext } from "./myContext";
import { flushSync } from "react-dom"



const debug = new ifDebugging(process.env.REACT_APP_isDebugging);
const toServer = new requestServer
    (process.env.REACT_APP_SERVER_URL + "/xtServer/api/fetchPosts"
        , { optionsMode: 'default' }, false
    );

function HomeWithLogin({ logout, user }) {
    const size = useResizeValue(window.innerWidth);
    const [dataForAboutJob, setDataForAboutJob] = useState(null);
    const [dataFromServer, setdataFromServer] = useState(null);

    // console.log('data from server : ', dataFromServer);
    console.log(' aboutJob data : ', dataForAboutJob);

    async function fetchPosts() {

        let res = await toServer.requestJson();
        // debug.console("from fetchPosts : ", res);
        if (res) {
            flushSync(() => {
                setdataFromServer(res.json.data);
            })
        }
        else {
            debug.alert('Fail to get data from server , check consolo or call the admin for help');
        }


    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <>
            <header >
                <commonContext.Provider value={{ user }}>
                    <Header logout={logout} ></Header>
                </commonContext.Provider>
            </header><hr className="border-[1px] 
     border-green-950"></hr>


            <main>
                {dataFromServer ? <myContext.Provider value={{
                    dataFromServer, setDataForAboutJob,
                    dataForAboutJob
                }}>

                    <Section1 children1={size < 700 ? <JobCards link /> : <JobCards />}
                        children2={size < 700 ? null : <AboutJob />}
                        theFooter={<><hr className="border-[1px] 
    border-green-950"></hr>
                            <footer>
                                <Footer></Footer>
                            </footer></>} />

                </myContext.Provider> : <h3>No dataFromServer</h3>}


            </main>


        </>
    );
}


export { HomeWithLogin };