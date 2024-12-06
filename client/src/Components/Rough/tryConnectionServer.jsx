import { useState, useRef, useEffect } from "react";
import url from './../../Jsons/url.json';
import { requestServer, ifDebugging } from "../../MyLib/RequestServer/requestServer";

function TryConnection({ children }) {
    const { isWorking, setisWorking } = useState(null);


    async function fetchIt() {
        let debug = new ifDebugging(process.env.REACT_APP_isDebugging);

        let toServer = new requestServer('/xtServer/api/hello', { optionsMode: 'default' },
            process.env.REACT_APP_isDebugging);

        let result = await toServer.requestJson();
        debug.dLog('result here : ', result);

    }

    useEffect(() => {

        let debug = new ifDebugging(process.env.REACT_APP_isDebugging);
        debug.dLog('from d log');

    }, [])


    return (
        <>
            <div>
                <br /><br />
                <hr className="border-4 border-slate-400"></hr>
                <button className="rounded-full font-serif text-3xl p-3 pl-5 pr-5 m-2
                 text-red-300 bg-pink-700 border border-gray-200
                 hover:border-dotted active:scale-90"
                    onClick={fetchIt}
                >
                    Fetch it
                </button>
            </div>
        </>
    );


}



export { TryConnection };
