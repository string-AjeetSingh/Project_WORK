import { UserButton, OtherPanel } from "./subComponents";
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header({ children, login, logout, key }) {
    const size = useResizeValue(window.innerWidth);
    const [panelno, setpanelno] = useState(1);
    const refSearch = useRef(null);
    const navigate = useNavigate();

    const panel = [
        <div className="flex flex-col absolute  z-20
         w-full p-1
         "
            style={{
                top: '55px'
            }}
        >
            <div className="  bg-green-950 flex flex-row justify-between items-center">
                <input ref={refSearch} className="rounded-md  bg-transparent w-[80%]
              bg-green-950 border-t border-t-green-600 
              placeholder-green-200 text-green-200
              text-[1rem] p-2 m-1  hover:bg-green-800
              "
                    type="search" placeholder=" Search Jobs"></input>
                <button onClick={handleSearchButton} className="m-1  text-[1rem] rounded-md pr-4 pl-4
                        border-t border-t-teal-800  hover:bg-green-800 active:bg-green-900
                        text-green-200 bg-teal-950
                        p-2">
                    <img className="w-5 h-6" src="./stock/icon/search.png">
                    </img>
                </button>
            </div>
        </div >, null]

    function handleSearch(event) {
        if (event.key === 'Enter') {
            alert('going to handle search');
        }
    }
    function handleSearchButton() {

        alert('going to handle search');

    }

    useEffect(() => {

        if (refSearch.current) {

            refSearch.current.addEventListener('keydown', handleSearch);
        }
        return (() => {
            if (refSearch.current) {
                refSearch.current.removeEventListener('keydown', handleSearch)
            }
        })
    })


    return (
        <>
            <div key={key}
                className="flex flex-row flex-wrap  justify-between  ">

                <div
                    onClick={() => {
                        navigate('/');
                    }} className="flex flex-row  justify-between items-center select-none ">
                    <div className="flex flex-row justify-center items-end   m-1 p-1">
                        <div className="text-green-800 text-4xl 
                        font-serif font-bold">W</div>
                        <div className="text-2xl font-serif mr-1">ORK</div>
                    </div>
                    <img className="size-9" src="./logo.png" alt="Logo" />
                </div>
                {/* Above fist side of the nav */}

                <div className="flex flex-row items-center">

                    {size < 505 ? <OtherPanel theSize={504} setPanel={setpanelno} /> :
                        <>
                            <button className="m-1  text-[1rem] rounded-md
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200
                        border-green-950 p-1">
                                Jobs
                            </button>

                            <div>
                                <input className="rounded-md  bg-transparent 
                      bg-green-950 border-[2px] border-green-950
                      placeholder-green-200 text-green-200
                      text-[1rem] p-1 m-1  hover:bg-green-800
                      focus:bg-green-800"
                                    type="search" placeholder=" Search Jobs"></input>
                            </div>

                        </>
                    }
                    <UserButton login={login} logout={logout} ></UserButton>
                </div>



            </div>
            <div className="flex flex-col ">
                {panel[panelno]}
            </div>
        </>
    );
}

export { Header };