import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AppliedCards({ name, img, pdf, email }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-row items-center justify-between
            m-1 w-full border-b border-b-green-700">

                <div className="m-1 p-1 
        flex flex-col w-fit rounded-xl h-fit ">
                    <div className="flex flex-row 
            justify-between items-center">
                        <img className="size-10 rounded-full"
                            src={img ? img : '/stock/icon/defaultUser.png'}>
                        </img>
                        <div className="  ml-1 text-[1.1rem]">
                            {email ? email : 'no email'}
                        </div>
                    </div>
                    <div className=" self-end relative font-bold text-[1.2rem]
                    -top-2">
                        {name ? name : 'no name found'}

                    </div>


                </div>
                {pdf ?


                    <button onClick={() => {
                        window.open(pdf, '_blank');

                    }}
                        className=" m-1 p-2 border 
                            border-green-800 rounded-xl 
hover:bg-green-800 self-center active:bg-green-700  ">
                        <div className="flex flex-row items-center
                                 justify-center">
                            <img className="size-10 "
                                src="/stock/icon/resume.png"></img>
                            <span className="ml-2">Resume</span>
                        </div>
                    </button>


                    : <h1>No pdf found</h1>
                }
            </div>
        </>
    );
}





export { AppliedCards }