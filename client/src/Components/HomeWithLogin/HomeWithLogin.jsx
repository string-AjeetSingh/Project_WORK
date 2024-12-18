import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { Section1, NoSearchResult } from "./subComponents";
import { AboutJob } from "../AboutJob/aboutJob";
import { JobCards } from "../JobCards/jobCards";
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { requestServer } from "../../MyLib/RequestServer/requestServer";
import { ifDebugging } from "../../MyLib/ifDebugging/ifDebugging";
import { useState, useEffect, useRef } from "react";
import { commonContext } from "../../MyLib/commonContext";
import { myContext } from "./myContext";
import { flushSync } from "react-dom"
import { useParams } from "react-router-dom";



const debug = new ifDebugging(process.env.REACT_APP_isDebugging);
const toServer = new requestServer
    (process.env.REACT_APP_SERVER_URL + "/xtServer/api/fetchPosts"
        , { optionsMode: 'default' }, false
    );

function HomeWithLogin({ logout, user, isAuthenticated, useAsSearch }) {
    const size = useResizeValue(window.innerWidth);
    const [dataForAboutJob, setDataForAboutJob] = useState(null);
    const [dataFromServer, setdataFromServer] = useState(null);
    const { search } = useParams();

    console.log('data from server : ', dataFromServer);
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


    async function fetchSearch() {

        let tags = tagsForSearch(search);

        const searchServer = new requestServer(process.env.REACT_APP_SERVER_URL +
            '/xtServer/api/search', { method: 'POST' }, true
        )
        searchServer.setAuthorizedFlag(isAuthenticated);
        searchServer.setContentType('application/json');
        searchServer.setBodyProperty('data', { tags: tags });

        let result = await searchServer.requestJson();
        if (result) {
            console.log('the response from search :', result);
            if (result.json.status) {
                setdataFromServer(result.json.data);
            } else {
                // alert('no matching results');
                setdataFromServer({ noSearchResult: true });
            }
        }
    }

    useEffect(() => {
        if (!useAsSearch) {
            fetchPosts();
        }
        else {
            fetchSearch();
        }
    }, [])

    if (dataFromServer) {
        if (dataFromServer.noSearchResult) {
            return (
                <>
                    <header >
                        <commonContext.Provider value={{ user, isAuthenticated, setdataFromServer }}>
                            <Header logout={logout} search_Link={useAsSearch ? false : true} ></Header>
                        </commonContext.Provider>
                    </header><hr className="border-[1px] 
     border-green-950"></hr>

                    <main>
                        <NoSearchResult />
                    </main><hr className="border-[1px] 
     border-green-950"></hr>

                    <footer>
                        <Footer></Footer>
                    </footer>

                </>
            );
        }
    }

    return (
        <>
            <header >
                <commonContext.Provider value={{ user, isAuthenticated, setdataFromServer }}>
                    <Header logout={logout} search_Link={useAsSearch ? false : true} ></Header>
                </commonContext.Provider>
            </header><hr className="border-[1px] 
     border-green-950"></hr>


            <main>

                {dataFromServer ? <myContext.Provider value={{
                    dataFromServer, setDataForAboutJob,
                    dataForAboutJob
                }}>

                    <Section1 children1={size < 700 ? <JobCards link /> : <JobCards link={false} />}
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





















//functions ahead ..................................................................
function tagsForSearch(string) {

    let tags = string.split(' ');
    tags = tags.filter((item) => item != '')
    return tags;

}