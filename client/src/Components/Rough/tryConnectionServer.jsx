import { useState, useRef, useEffect } from "react";
import url from './../../Jsons/url.json';

function TryConnection({ children }) {
    const { isWorking, setisWorking } = useState(null);

    function fetchIt() {
        fetch(url.requestUrl + '/xtServer/api/hello').
            then((res) => {
                console.log(res);
            })
    }

    useEffect(() => {
        fetch('')
    })


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
