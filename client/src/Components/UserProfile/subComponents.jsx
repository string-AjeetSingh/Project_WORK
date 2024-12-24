import { useEffect, useState, useRef } from "react";

function ProfileImageSection({ screen, imgSrc }) {

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


    if (width <= 550 && width > 462) {

        return (<>
            <div className={`${screen ? screen : 'bg-slate-700'} p-5 flex flex-row self-center
           rounded-2xl border-2 border-green-800 w-[80%]  `}>
                <div className="size-24 relative top-14  overflow-hidden
            border-2 border-green-900
             rounded-full bg-slate-500 ">
                    <img className="w-full"
                        src={imgSrc ? imgSrc : './stock/icon/defaultUser.png'}></img>
                </div>

            </div>
        </>);
    }
    else if (width <= 462) {

        return (<>
            <div className={`${screen ? screen : 'bg-slate-700'} p-5 flex flex-row self-center
           rounded-2xl border-2 border-green-800  min-w-[315px] `}>
                <div className="size-20 relative top-12 overflow-hidden
            border-2 border-green-900
             rounded-full bg-slate-500 ">
                    <img className="w-full"
                        src={imgSrc ? imgSrc : './stock/icon/defaultUser.png'}></img>
                </div>
            </div>
        </>);
    }
    else {
        return (<>
            <div className={`${screen ? screen : 'bg-slate-700'} p-5 flex flex-row self-center
           rounded-2xl border-2 border-green-800 max-w-[650px] w-[80%] `}>
                <div className="size-32 relative top-16 overflow-hidden
            border-2 border-green-900
             rounded-full bg-slate-500 ">
                    <img className="w-full"
                        src={imgSrc ? imgSrc : './stock/icon/defaultUser.png'}></img>
                </div>

            </div>
        </>);
    }

}

function ProfileSection2({ children, userName, email, title }) {
    return (<>
        <div className="m-2 p-1 flex flex-col items-end">

            <div className="font-serif font-bold  self-end
            text-4xl  text-green-300 
             ">
                {userName ? userName : 'User Name'}</div>

            <div className="font-serif text-[1.1rem]
        relative bottom-1  text-green-200">
                {email ? email : ' email@gmail.com'}</div>


            <div className="font-serif text-3xl
       self-start mt-7 top-5  
       text-green-300
       relative ">
                {title ? title : 'A Web Developer'}</div>
        </div>
    </>);
}

function Status({ children }) {
    const theInput = useRef(null);


    useEffect(() => {

        if (theInput) {
            {
                children ? theInput.current.value = children :
                    theInput.current.value = 'no value provided'
            }

        }
    }, [])


    return (<>
        <CommonWrapper>
            <div className="font-serif text-[1.4rem]
       self-start  text-green-300 font-bold
       relative bottom-1">
                Status :
            </div>
            <input ref={theInput}
                className=" text-[1.2rem] pl-3
            w-[50%] min-w-72  relative bottom-2
            border-blue-700 bg-transparent">
            </input>
        </CommonWrapper>

    </>);
}

function Discription({ children }) {
    const theInput = useRef(null);


    useEffect(() => {

        if (theInput) {
            {
                children ? theInput.current.value = children :
                    theInput.current.value = 'no value provided'
            }

        }
    }, [])


    return (<>

        <CommonWrapper>
            <div className="font-serif text-[1.4rem]
         text-green-300 font-bold mb-1
       relative ">
                Discription :
            </div>
            <textarea ref={theInput} readOnly
                className="rounded-md  relative bottom-2 
              w-[45%] min-w-72 h-48 pl-2 pr-2 text-[1.1rem]
            border-green-800 bg-transparent">
            </textarea>

        </CommonWrapper>


    </>);
}

function Experiance({ children }) {

    const theInput = useRef(null);


    useEffect(() => {

        if (theInput) {
            {
                children ? theInput.current.value = children :
                    theInput.current.value = 'no value provided'
            }

        }
    }, [])
    return (<>

        <CommonWrapper>
            <div className="font-serif text-[1.4rem]
       self-start text-green-300 font-bold
       relative bottom-1">
                Experiance
            </div>
            <textarea ref={theInput} readOnly
                className="rounded-xl relative bottom-2
              w-[45%] min-w-72 h-64 pl-3
            border-blue-700 bg-transparent">
            </textarea>

        </CommonWrapper>


    </>);
}

function Education({ children }) {

    const theInput = useRef(null);


    useEffect(() => {

        if (theInput) {
            {
                children ? theInput.current.value = children :
                    theInput.current.value = 'no value provided'
            }

        }
    }, [])

    return (<>

        <CommonWrapper>
            <div className="font-serif text-[1.4rem]
       self-start  text-green-300 font-bold
       relative bottom-1">
                Education
            </div>
            <textarea ref={theInput} readOnly
                className="rounded-xl relative bottom-2
              w-[45%] min-w-72 h-32 pl-3
            border-blue-700 bg-transparent">
            </textarea>

        </CommonWrapper>


    </>);
}

function Skills({ children }) {



    if (!(children instanceof Array)) {
        console.error("the children must be a array");
        return (
            <>
                {null}
            </>
        );

    }
    else {
        return (<>
            <CommonWrapper>
                <div className="font-serif text-[1.3rem]
           self-start text-green-300 font-bold
           relative bottom-1">
                    Skills
                </div>
                <div
                    className="flex flex-row flex-wrap p-2
                rounded-xl border
                  w-[45%] min-w-72  h-40 
                border-green-800 bg-transparent">

                    {children.length > 0 ? children.map((item) => {
                        return <SkillsCards>{item}</SkillsCards>
                    }) : <SkillsCards>No skills mentioned</SkillsCards>}

                </div>
            </CommonWrapper>

        </>);
    }


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
        <div className="flex-col m-1 
        p-2 rounded-xl
        text-green-200 ">
            {children}
        </div>
    </>);
}



function SocialMedia({ email, github, x }) {
    return (<>
        <div className="m-1 flex flex-col flex-wrap justify-between text-green-200">

            {email ?
                <div className="m-1">
                    <div className="font-serif text-green-300
                    font-bold text-[1.4rem]">Email : </div>
                    <span className="relative bottom-2">{email}</span>
                </div>
                : null}

            {x ?
                <div className="m-1">
                    <div className="font-serif text-green-300
                    font-bold text-[1.2rem]">X : </div>
                    <span className="relative bottom-2">{x}</span>
                </div>
                : null}

            {github ?
                <div className="m-1">
                    <div className="font-serif font-bold text-green-300
                    text-[1.2rem]">GitHub : </div>
                    <span className="relative bottom-2">{github}</span>
                </div>
                : null}

        </div>
    </>);
}

export {
    ProfileImageSection,
    ProfileSection2, Status, Discription,
    Skills, SocialMedia, Education, Experiance
};