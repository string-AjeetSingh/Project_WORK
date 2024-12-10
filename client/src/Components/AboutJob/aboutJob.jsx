import { useRef, useEffect } from "react";
import { useContext } from 'react';
import { myContext } from "../HomeWithLogin/myContext";
import { Link } from "react-router-dom";


function AboutJob({ children, __note_this_component_use_context_and_i_am_a_message__ }) {

    const { dataForAboutJob } = useContext(myContext);


    useEffect(() => {
        console.log('Form About Job recieved doc : ', dataForAboutJob);
    }, [dataForAboutJob])

    if (dataForAboutJob) {
        return (<>
            <div className="p-2 text-green-200">
                <div className="flex flex-row justify-start 
            items-center mb-2">
                    <div className="rounded-full size-10
                mr-2  bg-slate-500">

                    </div>
                    <div className="font-serif text-2xl text-green-700
                font-bold">
                        {dataForAboutJob ? dataForAboutJob.companyName : "DummyMirosoft"}
                    </div>
                </div>


                <div className="text-[1.2rem] font-serif underline
               w-[60%] min-w-[320px]">

                    {dataForAboutJob ? dataForAboutJob.jobData.title
                        :
                        "Dummy Software Designer"}

                </div>
                <div className="flex flex-row justify-end">
                    <button className="rounded-full font-serif font-bold
                text-2xl p-2 pr-5 pl-5 m-1 border-2  text-green-800
                 border-green-700
                 bg-blue-400 hover:border-black 
                 active:bg-blue-600 active:text-blue-400">

                        Apply
                    </button>

                </div>
                <hr className="w-full mt-1 mb-1 rounded-xl border-1 
                border-slate-500"></hr>

                <div className="font-serif text-2xl text-slate-500 font-bold">
                    About:
                </div>
                <div className="relative left-5">
                    {dataForAboutJob.jobData.description ?
                        dataForAboutJob.jobData.description
                        :
                        "no discription"}
                </div><br></br>

                <div className="font-serif text-2xl text-slate-500 font-bold">
                    Qualification:
                </div>
                <div className="relative left-5">

                    {dataForAboutJob.jobData.qualifications ?
                        <ul className="list-disc pl-5">
                            {dataForAboutJob.jobData.qualifications.map((val) => {
                                return (<li>{val}</li>)
                            })}
                        </ul>
                        :
                        "no qualification"}
                </div>
                <div className="font-serif text-2xl text-slate-500 font-bold">
                    Requirements:
                </div>
                <div className="relative left-5">
                    {dataForAboutJob.jobData.requirements ?
                        <ul className="list-disc pl-5">
                            {dataForAboutJob.jobData.requirements.map((val) => {
                                return (<li>{val}</li>)
                            })}
                        </ul>
                        :
                        "no requirement"}
                </div>

                <div className="font-serif text-2xl text-slate-500 font-bold">
                    Responsibilities:
                </div>
                <div className="relative left-5">
                    - Dummy row about some thing. <br></br>
                    - Dummy row about some thing <br></br>
                    - Dummy row about some thing <br></br>
                    - Dummy row about some thing <br></br>
                    - Dummy row about some thing <br></br>
                </div>

                <hr className="w-full mt-1 mb-1 rounded-xl border-1 
                border-slate-500"></hr>
                <div className="m-1 flex flex-row flex-wrap justify-between">

                    <div className="m-1">
                        <div className="font-serif font-bold  text-slate-500
                        text-[1.2rem]">Email : </div>
                        <span className="relative bottom-2">
                            Mirosoft@gmail.com
                            {dataForAboutJob.jobSocialData.email.length > 1 ?
                                dataForAboutJob.jobSocialData.email
                                :
                                "Dummy@gmail.coim"}
                        </span>

                    </div>
                    <div className="m-1">
                        <div className="font-serif font-bold  text-slate-500 
                        text-[1.2rem]">X : </div>
                        <span className="relative bottom-2">
                            {dataForAboutJob.jobSocialData.x.length > 1 ?
                                <Link to={dataForAboutJob.jobSocialData.x}>
                                    {<span className="text-blue-400">
                                        {dataForAboutJob.jobSocialData.x}</span>}</Link>
                                :
                                "Dummy@x"}

                        </span>
                    </div>

                    <div className="m-1">
                        <div className="font-serif font-bold  text-slate-500
                        text-[1.2rem]">GitHub : </div>
                        <span className="relative bottom-2">
                            {dataForAboutJob.jobSocialData.github.length > 1 ?
                                <Link to={dataForAboutJob.jobSocialData.github}>
                                    {<span className="text-blue-400">
                                        {dataForAboutJob.jobSocialData.github}</span>}</Link>
                                :
                                "Dummy@gihub"}
                        </span>
                    </div>

                </div>
            </div>
        </>);
    }
    else {

    }

}

export { AboutJob };