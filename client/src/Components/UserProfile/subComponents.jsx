import { useEffect, useState } from "react";

function ProfileImageSection({ children, screen }) {

    const [width, setwidth] = useState(window.innerWidth);

    function handleResize() {
        setwidth(window.innerWidth);

    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return (() => {
            window.removeEventListener('resize', handleResize);
        });

    }, [])


    if (width <= 550 && width > 380) {

        return (<>
            <div className="bg-slate-700 p-5 flex flex-row
           rounded-2xl border-2 border-green-800  ">
                <div className="size-36 relative top-14
            border-2 border-green-900
             rounded-full bg-slate-500 "></div>

            </div>
        </>);
    }
    else if (width <= 380) {

        return (<>
            <div className="bg-slate-700 p-5 flex flex-row
           rounded-2xl border-2 border-green-800  ">
                <div className="size-28 relative top-12
            border-2 border-green-900
             rounded-full bg-slate-500 "></div>
            </div>
        </>);
    }
    else {
        return (<>
            <div className="bg-slate-700 p-5 flex flex-row
           rounded-2xl border-2 border-green-800 max-w-[650px] ">
                <div className="size-40 relative top-16
            border-2 border-green-900
             rounded-full bg-slate-500 "></div>

            </div>
        </>);
    }

}

function ProfileSection2({ children }) {
    return (<>
        <div className="m-2 p-1 flex flex-col items-end">

            <div className="font-serif 
            text-3xl  text-green-700
             ">
                User Name</div>
            <div className="font-serif text-[1.1rem]
        relative bottom-1  text-green-700">email@gmail.com</div>

            <div className="font-serif text-3xl
       self-start mt-7 top-5 
       text-green-700
       relative ">A Web Developer</div>
        </div>
    </>);
}

function Status({ }) {
    return (<>
        <CommonWrapper>
            <div className="font-serif text-[1.3rem]
       self-start 
       relative bottom-1">
                <i>Status</i>
            </div>
            <input
                className="rounded-xl border
            w-[50%] min-w-72
            border-blue-700 bg-transparent">
            </input>
        </CommonWrapper>

    </>);
}

function Discription({ }) {
    return (<>

        <CommonWrapper>
            <div className="font-serif text-[1.3rem]
       self-start 
       relative bottom-1">
                <i>Discription</i>
            </div>
            <input
                className="rounded-xl border
              w-[70%] min-w-72 h-32 
            border-blue-700 bg-transparent">
            </input>

        </CommonWrapper>


    </>);
}

function Skills({ }) {
    return (<>

        <CommonWrapper>
            <div className="font-serif text-[1.3rem]
       self-start 
       relative bottom-1">
                <i>Skills</i>
            </div>
            <div
                className="flex flex-row flex-wrap p-2
            rounded-xl border
              w-[70%] min-w-72  h-32 
            border-blue-700 bg-transparent">
                <SkillsCards>C++</SkillsCards>
                <SkillsCards>HTMl</SkillsCards>
                <SkillsCards>CSS</SkillsCards>
                <SkillsCards>Nodejs</SkillsCards>
                <SkillsCards>Expressjs</SkillsCards>
                <SkillsCards>MongoDb</SkillsCards>

            </div>
        </CommonWrapper>

    </>);
}

function SkillsCards({ children }) {
    return (<>

        <div className=" h-fit w-fit font-bold
    rounded-md p-2 m-1 border-blue-600 border
    text-blue-400 bg-blue-900">
            {children}
        </div>
    </>);
}

function CommonWrapper({ children }) {
    return (<>
        <div className="flex-col m-1 mb-5
        p-4 rounded-xl
        text-blue-400 border-l
        border-b
         border-green-800">
            {children}
        </div>
    </>);
}



function SocialMedia({ }) {
    return (<>
        <div className="m-1 flex flex-row flex-wrap justify-between">

            <div className="m-1">
                <div className="font-serif font-bold text-[1.2rem]">Email : </div>
                <span className="relative bottom-2">Mirosoft@gmail.com</span>
            </div>
            <div className="m-1">
                <div className="font-serif font-bold text-[1.2rem]">X : </div>
                <span className="relative bottom-2">Mirosoft</span>
            </div>

            <div className="m-1">
                <div className="font-serif font-bold text-[1.2rem]">GitHub : </div>
                <span className="relative bottom-2">Mirosoft_Comunnity</span>
            </div>

        </div>
    </>);
}

export {
    ProfileImageSection,
    ProfileSection2, Status, Discription,
    Skills, SocialMedia
};