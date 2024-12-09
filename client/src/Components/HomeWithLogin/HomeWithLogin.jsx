import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { Section1 } from "./subComponents";
import { AboutJob } from "../Rough/AboutJob";
import { JobCards } from "../JobCards/jobCards";
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { requestServer } from "../../MyLib/RequestServer/requestServer";
import { ifDebugging } from "../../MyLib/ifDebugging/ifDebugging";
import { use, useEffect } from "react";

const debug = new ifDebugging(process.env.REACT_APP_isDebugging);
const toServer = new requestServer
    (process.env.REACT_APP_SERVER_URL + "/xtServer/api/fetchPosts"
        , { optionsMode: 'Default' }, true
    );

function HomeWithLogin({ }) {

    async function fetchPosts() {
        let res = await toServer.requestJson();
        debug.console("from fetchPosts : ", res);

    }

    useEffect(() => {
        fetchPosts();
    }, [])
    return (
        <>
            <header>
                <Header></Header>
            </header><hr className="border-[1px] 
     border-green-950"></hr>


            <main>
                <Section1 children1={<JobCards />}
                    children2={<AboutJob />}
                    theFooter={<><hr className="border-[1px] 
                        border-green-950"></hr>
                        <footer>
                            <Footer></Footer>
                        </footer></>} />

            </main>


        </>
    );
}


export { HomeWithLogin };