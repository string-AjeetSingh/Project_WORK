import { ProviderStatus } from "../ProviderStatus/providerStatus";
import { ButtonAnimation } from "../../MyLib/Animation/animation";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestServer } from "../../MyLib/RequestServer/requestServer";


function ProvideWork({ isAuthenticated, email }) {
    const butt = useRef(null);
    const navigate = useNavigate();
    const [data, setdata] = useState(null);

    async function providerDetail(params) {
        let provider = new requestServer(process.env.REACT_APP_SERVER_URL + '/xtServer/api/providerDetail'
            , { method: 'GET' }
        )
        provider.setAuthorizedFlag(isAuthenticated);
        provider.noBody();
        let result = await provider.requestJson();
        if (result) {
            if (result.json.status) {

                setdata(result.json.data);
            } else {
                alert('false from server , the message is : ', result.json.message);
            }
        } else {
            alert('some kind of error from server');
        }
    }
    console.log('the data is : ', data);
    useEffect(() => {
        providerDetail();
    }, [])

    return (
        <>
            <div className="flex flex-col justify-center items-center m-3">

                <div className="size-36 relative 
        border-2 border-green-700 overflow-hidden
        rounded-full bg-slate-500 ">
                    {data ? <img src={data.userData.img} alt='profile Img'></img> : null}
                </div>
                <button onClick={() => {
                    navigate('/dashboard');
                }}
                    className="m-1 mt-4  text-[1rem] rounded-md bg-green-950
                        border-[2px] hover:bg-green-800 active:bg-green-900
                        text-green-200 w-80 self-center rounded-tl-2xl
                        border-green-950 p-1">
                    <div className='flex flex-row justify-center items-center'>

                        <img src='/stock/icon/switch2.png'
                            className='size-7 mr-2'></img>
                        <span >Switch To User</span>
                    </div>
                </button>
            </div>
            <div className="m-2 p-1 flex flex-col items-end">

                <div className="font-serif  font-bold self-end
            text-3xl  text-green-300
             ">
                    {data ? data.userData.name : 'User Name'}</div>

                <div className="font-serif text-[1.1rem]
        relative bottom-1  text-green-200">
                    {email ? email : ' email@gmail.com'}</div>

            </div>
            <div>
                <button ref={butt} title="Create Job, so one can Apply on it"
                    onClick={async () => {
                        await ButtonAnimation(butt);
                        navigate('/createPost');
                    }}
                    className=" m-4 border-2 border-green-700 font-serif ml-7
                 text-teal-600 overflow-hidden p-2 rounded-2xl bg-teal-950 
                 flex flex-row justify-center items-center">
                    <img className="w-16 relative  " src="/provider2.png"></img>
                </button>
            </div><hr className="border-green-800">
            </hr>

            <ProviderStatus isAuthenticated={isAuthenticated} />

        </>
    );
}





export { ProvideWork }