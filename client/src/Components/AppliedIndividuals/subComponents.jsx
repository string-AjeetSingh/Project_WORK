import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AppliedCards({ name, img, pdf, email }) {
    const navigate = useNavigate();
    return (
        <>

            <button className="m-1 p-2 border 
        flex flex-col w-fit rounded-2xl h-fit ">
                <div className="flex flex-row 
            justify-between items-center">
                    <img className="size-10 rounded-full"
                        src={img ? img : '/stock/icon/defaultUser.png'}>
                    </img>
                    <div className="font-serif font-bold ml-1 p-1 text-[1.1rem]">
                        {email ? email : 'no email'}
                    </div>
                </div>
                <div className=" self-end relative -top-5">
                    {name ? name : 'no name found'}
                </div>
                {pdf ?

                    <button onClick={() => {
                        navigate('/' + pdf.replace(/\/\//g, "/"));
                    }}
                        className=" m-1 p-1
                 hover:border-green-500 self-center  ">
                        Pdf Doc
                    </button>

                    : <h1>No pdf found</h1>}

            </button>
        </>
    );
}





export { AppliedCards }