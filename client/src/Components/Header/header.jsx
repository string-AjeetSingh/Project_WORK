import { UserButton, OtherPanel } from "./subComponents";
import { useResizeValue } from "../../MyLib/MyHook/customHook";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { commonContext } from "../../MyLib/commonContext";
import { requestServer } from "../../MyLib/RequestServer/requestServer";

function Header({ children, login, logout, key, search_Link }) {
    const size = useResizeValue(window.innerWidth);
    const [panelno, setpanelno] = useState(1);
    const refSearch = useRef(null);
    const [theUserImg, settheUserImg] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, setdataFromServer } = useContext(commonContext);

    const panel = [
        <div className="flex flex-col absolute  z-20 
         w-[100%] p-1 h-[80vh] overflow-y-auto border border-black bg-green-900
         "
            style={{
                top: '55px'
            }}
        >
            <div className="   flex flex-row justify-between items-center ">
                <input ref={refSearch} className="rounded-md   w-[80%]
              bg-green-950 border-t border-t-green-600 
              placeholder-green-200 text-green-200
              text-[1rem] p-2 m-1  hover:bg-green-800
              "
                    type="search" placeholder=" Search Jobs"></input>

                <button onClick={handleSearchButton}
                    className="m-1  text-[1rem] rounded-md pr-4 pl-4
                        border-t border-t-teal-800  hover:bg-green-800 active:bg-green-900
                        text-green-200 bg-teal-950
                        p-2">
                    <img className="w-5 h-6" src="/stock/icon/search.png">
                    </img>
                </button>
            </div>
            <button onClick={() => {
                navigate('/');
            }} title="Home"
                className="m-1  text-[rem] rounded-md bg-green-950
            border-[2px] hover:bg-green-800 active:bg-green-900
            text-green-200
            border-transparent p-1">
                <div className="flex flex-row justify-center items-center">
                    <img src="/stock/icon/home.png" className="size-7 m-1"></img>
                    <span>Home </span>
                </div>
            </button>
            <button onClick={() => {
                navigate('/createPost');
            }}
                className="m-1  text-[rem] rounded-md bg-green-950
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200
                        border-transparent p-1">
                <div className="flex flex-row items-center justify-center">
                    <img src="/stock/icon/provide.png" className="size-7 m-1"></img>
                    <span>Provide Work </span>
                </div>
            </button>
        </div >, null]

    async function theSearch() {
        if (search_Link) {
            // alert('goina use link ');

            if (refSearch.current.value.length > 0) {
                navigate('/theSearch/' + refSearch.current.value)
            }
            else {
                alert('please write some thing to search for');
                return false;
            }

            return true;

        }

        let tags = null;

        if (refSearch.current.value.length > 0) {
            tags = tagsForSearch(refSearch.current.value);
            // //console.log('the tags from :', tags);
        }
        else {
            alert('please write some thing to search for');
            return false;
        }




        const search = new requestServer(process.env.REACT_APP_SERVER_URL +
            '/xtServer/api/search', { method: 'POST' }, true
        )
        search.setAuthorizedFlag(isAuthenticated);
        search.setContentType('application/json');
        search.setBodyProperty('data', { tags: tags });
        let result = await search.requestJson();
        if (result) {
            //console.log('the response from search :', result);
            if (result.json.status) {
                setdataFromServer(result.json.data);
            } else {
                alert('no matching result');
                setdataFromServer({ noSearchResult: true });
            }
        }


    }

    async function ProfileImg() {
        //console.log('from ProfileImg -- -- - -');
        let job = new requestServer(process.env.REACT_APP_SERVER_URL
            + '/xtServer/api/profileImg', { method: 'GET' }, true);
        job.setAuthorizedFlag(isAuthenticated);
        job.noBody();
        let result = await job.requestJson();
        //console.log('From ProfileImg the result is :  ', result);

        if (result) {
            if (result.json.status) {
                //console.log('From ProfileImg the data we found : ', result);
                return result.json.url;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    async function handleSearch(event) {
        if (event.key === 'Enter') {
            await theSearch();
        }
    }
    async function handleSearchButton() {


        await theSearch();
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

    useEffect(() => {
        ProfileImg().then((res) => {
            settheUserImg(res);
        })
    }, [])


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
                        <div className="text-2xl font-serif mr-1 text-black">ORK</div>
                    </div>
                    <img className="size-12" src="/logoSmall.png" alt="Logo" />
                </div>
                {/* Above fist side of the nav */}

                <div className="flex flex-row items-center">

                    {size < 561 ? <OtherPanel theSize={504} setPanel={setpanelno} /> :
                        <>
                            <button onClick={() => {
                                navigate('/');
                            }} title="Home"
                                className="m-1  text-[0.7rem] rounded-md
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200
                        border-transparent p-1">
                                <div className="flex flex-col items-center">
                                    <img src="/stock/icon/home.png" className="size-7 m-1"></img>
                                    <span>Home </span>
                                </div>
                            </button>

                            <button onClick={() => {
                                navigate('/createPost');
                            }} title="Provide Work"
                                className="m-1  text-[0.7rem] rounded-md
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200 
                        border-transparent p-1">
                                <div className="flex flex-col items-center">
                                    <img src="/stock/icon/provide.png" className="size-7 m-1"></img>
                                    <span>Provide Work </span>
                                </div>
                            </button>


                            <div>
                                <input ref={refSearch} className="rounded-md  bg-transparent 
                      bg-green-950 border-[2px] border-green-950
                      placeholder-green-200 text-green-200 
                      text-[1rem] p-1 m-1  hover:bg-green-800
                      focus:bg-green-800"
                                    type="search" placeholder=" Search Jobs"></input>
                            </div>

                        </>
                    }
                    <UserButton userImg={theUserImg} login={login} logout={logout} ></UserButton>
                </div>



            </div>
            <div className="flex flex-col ">
                {panel[panelno]}
            </div>
        </>
    );
}

export { Header };















//functions ahead ..................................................................
function tagsForSearch(string) {

    let tags = string.split(' ');
    tags = tags.filter((item) => item != '')
    return tags;

}