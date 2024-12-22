import { AppliedCards } from "./subComponents";

function AppliedInd({ data }) {
    return (
        <>
            <div className="flex flex-col p-2 m-1 overflow-y-auto
            h-[600px] border ">
                Must contain Applied data
                <ol className="list-decimal pl-6 text-2xl font-bold text-slate-400">

                    {data.map((item) => {
                        return <li >
                            <AppliedCards name={item.name}
                                img={item.img} email={item.email} pdf={item.pdfUrl} />
                        </li>
                    })}
                </ol>
            </div>
        </>
    );
}




export { AppliedInd }