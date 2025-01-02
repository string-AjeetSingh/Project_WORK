import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { commonContext } from "../../MyLib/commonContext";
import { useContext } from "react";
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { useNavigate } from "react-router-dom";

function UserButton({ login, logout, __note_this_component_use_context_and_i_am_a_message__,
    userImg
}) {
    const [toggle, settoggle] = useState(true);
    const { user } = useContext(commonContext);
    const arefImg = useRef(null);
    const navigate = useNavigate(null);

    const panel = [
        <div className=" flex flex-col absolute 
         p-2 m-1 min-w-[250px] z-20 items-start 
         bg-green-900 border border-green-950"
            style={{
                right: '3px'
            }}
        >
            <div className="font-serif m-1 text-[1.2rem] 
             text-green-200"> {user ? user.email : 'No login yet'}</div>
            <hr className="border w-full  border-slate-400  mt-1 mb-1"></hr>

            {user ? <button className="m-1 flex flex-row w-fit self-end
              text-[1rem] rounded-md justify-center items-center
                     border-[2px] hover:bg-green-800 active:bg-green-900
                      text-green-200 bg-slate-600
                       border-green-950 p-1"
                onClick={() => {
                    login ? login() : navigate('/dashboard');
                }}> <img className="size-8 rounded-2xl mr-2"
                    src="./stock/icon/dashboard.png"></img> DashBoard</button> : null}

            {login ? <button className="m-1  flex flex-row w-fit self-end
            text-[1rem] rounded-md justify-center items-center
                     border-[2px] hover:bg-green-800 active:bg-green-900
                      text-green-200  bg-slate-600
                       border-green-950 p-1"
                onClick={login}> <img className="size-8 rounded-2xl mr-2"
                    src="./stock/icon/login.png"></img>
                login</button> : null}

            {logout ? <button className="m-1 flex flex-row w-fit self-end
             text-[1rem] rounded-md justify-center items-center
                     border-[2px] hover:bg-green-800 active:bg-green-900
                      text-green-200 bg-slate-600
                       border-green-950 p-1"
                onClick={logout}> <img className="size-7 rounded-2xl mr-2"
                    src="./stock/icon/logout.png"></img>
                logout</button> : null}

        </div>, null]

    const [panelno, setpanelno] = useState(1);

    function panelOn() {
        //alert('On');
        setpanelno(0);
    }
    function panelOff() {
        //alert('Off');
        setpanelno(1);
    }

    function handleClick() {
        toggle ? settoggle(false) : settoggle(true);
        toggle ? panelOn() : panelOff();
    }



    return (
        <>
            <div >

                <button onClick={() => {
                    handleClick();
                }}
                    className="size-10 border-none relative
            rounded-full    overflow-hidden 
            bg-cyan-700 m-1 mr-2">

                    {user ?
                        <img ref={arefImg} className="w-full" alt="a img"
                            src={userImg ? userImg : '/stock/icon/defaultUser.png'}></img>
                        :
                        <img ref={arefImg} className="w-full" alt="a img"
                            src={'/stock/icon/noUser3.png'}></img>
                    }


                </button>
                {panel[panelno]}
            </div>
        </>
    );
}


function OtherPanel({ theSize, setPanel }) {
    const [toggle, settoggle] = useState(true);
    //const [panelno, setpanelno] = useState(1);
    const size = useResizeValue(window.innerWidth);


    function panelOn() {
        //alert('On');
        setPanel(0);
    }
    function panelOff() {
        //alert('Off');
        setPanel(1);
    }

    function handleClick() {
        toggle ? settoggle(false) : settoggle(true);
        toggle ? panelOn() : panelOff();
    }
    useEffect(() => {

        if (size >= theSize) {
            // console.log('the size : ', size);
            // alert('time to off');
            panelOff();
        }
    }, [size, theSize])

    return (
        <>

            <div className="flex flex-col  ">

                <button onClick={handleClick} className="m-1  text-[1rem] rounded-md
                     border-[2px] hover:bg-green-800 active:bg-green-900
                      text-green-200
                       border-green-950 p-1">
                    DropDown

                </button>
            </div>


        </>
    );
}

export { UserButton, OtherPanel }