import { AppliedCards } from "./subComponents";

function AppliedInd({ data }) {
    return (
        <>
            <div className="flex flex-col items-center 
            p-2 m-1 overflow-y-auto 
               ">
                <div className=" p-3 min-w-[370px] 
                max-w-[700px] w-[90%] h-[600px]  overflow-y-auto">

                    <span className="text-green-200 
                    text-2xl font-serif  ">Resumes :</span><br />
                    <div className="text-green-200 text-[1.1rem]
                    relative -top-2"> Total : <b className="text-green-400">{data ? data.length : 0}</b> </div>
                    <ol className="list-decimal pl-6 
                     text-green-200  ">

                        {data.map((item) => {
                            return <li >
                                <AppliedCards name={item.name}
                                    img={item.img} email={item.email} pdf={item.pdfUrl} />
                            </li>
                        })}
                    </ol>
                </div>
            </div>
        </>
    );
}




export { AppliedInd }