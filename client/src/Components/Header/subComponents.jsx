import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { commonContext } from "../../MyLib/commonContext";
import { useContext } from "react";
import { useResizeValue } from "../../MyLib/MyHook/customHook";

function UserButton({ login, logout, __note_this_component_use_context_and_i_am_a_message__ }) {
    const [toggle, settoggle] = useState(true);
    const { user } = useContext(commonContext);
    const arefImg = useRef(null);


    const panel = [
        <div className=" flex flex-col absolute
         p-2 m-1 min-w-[250px] z-20
         bg-green-900 border border-green-950"
            style={{
                right: '3px'
            }}
        >
            <div className="font-serif text-green-200"> {user ? user.email : 'No login yet'}</div>
            <hr className="border-green-700  m-1"></hr>

            {user ? <button className="m-1  text-[1rem] rounded-md
                     border-[2px] hover:bg-green-800 active:bg-green-900
                      text-green-200
                       border-green-950 p-1"
                onClick={login}> DashBoard</button> : null}

            {login ? <button className="m-1  text-[1rem] rounded-md
                     border-[2px] hover:bg-green-800 active:bg-green-900
                      text-green-200
                       border-green-950 p-1"
                onClick={login}> login</button> : null}

            {logout ? <button className="m-1  text-[1rem] rounded-md
                     border-[2px] hover:bg-green-800 active:bg-green-900
                      text-green-200
                       border-green-950 p-1"
                onClick={logout}> logout</button> : null}

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
            <div>

                <button onClick={() => {
                    handleClick();
                }}
                    className="size-10 border-none relative
            rounded-full    overflow-hidden
            bg-cyan-700 m-1 mr-1">

                    <img ref={arefImg} className="w-full" alt="a img"
                        src={user ? '/stock/icon/defaultUser.png' : '/stock/icon/defaultUser.png'}></img>


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