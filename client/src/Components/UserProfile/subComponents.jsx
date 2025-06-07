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

function Wrapper({ children, style }) {
    return (
        <>
            <div style={style} className="flex flex-col items-center justify-center mt-1">
                {children}
            </div>
        </>
    );
}

function NewProfileSection({ status = 'undefined', title = 'undefined', name = 'undefined' }) {
    return (
        <div className=" flex flex-row justify-center mt-1   ">

            <table style={{
                minWidth: '342px',
                backgroundColor: 'rgba(4, 77, 28, 1)',
                padding: '10px'
            }}
                className="  w-[80%] rounded-xl ">
                <tbody>

                    <tr className="" >
                        <TableLable color={'#d5e7f4'} paddingTop={20}>Name</TableLable><TableValue color={'rgba(4, 77, 28, 1)'} backgroundColor={'#d5e7f4'} paddingTop={20}>{name}</TableValue>
                    </tr>
                    <tr >
                        <TableLable color={'#d5e7f4'}>Is</TableLable><TableValue color={'rgba(4, 77, 28, 1)'} backgroundColor={'#d5e7f4'}>{title}</TableValue>
                    </tr>
                    <tr>
                        <TableLable color={'#d5e7f4'} paddingBottom={20}>Status</TableLable><TableValue color={'rgba(4, 77, 28, 1)'} backgroundColor={'#d5e7f4'} paddingBottom={20}>{status}</TableValue>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

function NewSocialMedia({ email = 'undefined', github = 'undefined', x = 'undefined' }) {
    return (
        <>
            <div className=" flex flex-col items-center justify-center text-center mt-1   ">

                <table style={{
                    minWidth: '342px',
                    backgroundColor: 'var(--blueVeryLight)',
                    padding: '10px'
                }}
                    className="w-[80%] rounded-xl ">
                    <thead>

                        <tr >
                            <th style={{
                                color: 'var(--greenLight)',
                                padding: '5px'
                            }}
                                className="text-2xl  " colSpan={2}>Social Media</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr >
                            <TableLable color={'rgba(4, 77, 28, 1)'} paddingTop={10}>Email</TableLable><TableValue color={'#8aceff'} backgroundColor={'rgba(4, 77, 28, 1)'} paddingTop={10}>{email}</TableValue>
                        </tr>
                        <tr >
                            <TableLable color={'rgba(4, 77, 28, 1)'}>X</TableLable><TableValue color={'#8aceff'} backgroundColor={'rgba(4, 77, 28, 1)'}>{x}</TableValue>
                        </tr>
                        <tr>
                            <TableLable color={'rgba(4, 77, 28, 1)'} paddingBottom={20}>Github</TableLable><TableValue color={'#8aceff'} backgroundColor={'rgba(4, 77, 28, 1)'} paddingBottom={20}>{github}</TableValue>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

function TableLable({ children, paddingTop, paddingBottom, color }) {
    return (
        <td width="30%" style={{
            color: color ? color : null,
            paddingTop: paddingTop ? paddingTop + 'px' : null,
            paddingBottom: paddingBottom ? paddingBottom + 'px' : null,
            fontSize: '1.3rem'
        }} className=" text-center font-bold ">{children}</td>
    );
}
function TableValue({ children, paddingTop, paddingBottom, backgroundColor, color }) {
    return (
        <td style={{
            paddingTop: paddingTop ? paddingTop + 'px' : null,
            paddingBottom: paddingBottom ? paddingBottom + 'px' : null,
        }}
            className="p-2 font-bold ">
            <div style={{
                backgroundColor: backgroundColor ? backgroundColor : null,
                color: color ? color : null,

            }}
                className="p-1 pl-5 pr-5 rounded-2xl w-fit"
            >{children}</div></td>
    );
}

function Heading({ children, color, colSpan }) {
    return (
        <>
            <div style={{
                color: color ? color : null,
                padding: '5px'
            }}
                colSpan={colSpan ? colSpan : null}
                className="text-2xl self-center font-bold  " >{children}</div>
        </>
    );

}

function TableHeading({ children, color, colSpan }) {
    return (
        <>
            <th style={{
                color: color ? color : null,
                padding: '5px'
            }}
                colSpan={colSpan ? colSpan : null}
                className="text-2xl  " >{children}</th>
        </>
    );
}

function BulletAndCheck({ isCheck, no }) {

    return (

        <div
            className="flex flex-col items-center ">

            <div style={{
                color: 'var(--greenLight)',
                backgroundColor: 'var(--blueVeryLight)',


            }} className=" rounded-md size-10 flex flex-col
            items-center justify-center font-bold"
            >

                {isCheck ?

                    <input

                        className="size-7 " type="checkbox"></input>

                    : <span className="text-[1.1rem]">{no}</span>
                }
            </div>
        </div>

    );
}

function TContext({ children }) {
    return (
        <>
            <div className="rounded-md  ml-5">
                {children}
            </div>
        </>
    );
}

function AddAndDelete({ isAdd, classId, onClick }) {
    return (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                if (onClick)
                    onClick();
            }} className={` ${classId} size-10 rounded-full m-2 flex flex-row justify-center items-center`}>
                <img className="size-8" src={isAdd ? "/stock/icon/plus2.png" : "/stock/icon/delete.png"}>
                </img>
            </button>
        </>
    );
}

function BlurScreen({ children }) {
    return (
        <>
            <div style={{
                backgroundColor: "var(--greenLight-blur)",
                zIndex: 5,
                top: 0,
                left: 0,
                width: '100vh',
                height: '100dvh',
            }} className="fixed h-full w-full flex flex-row justify-center items-center">
                {children}
            </div>
        </>
    );
}

function AddContent({ }) {

    return (
        <>
            <div onClick={(e) => {
                e.stopPropagation();
            }} style={{
                width: '70%',
                maxWidth: "500px",
                minWidth: "340px",
                backgroundColor: "var(--blueVeryLight)"
            }} className="p-2 rounded-xl">
                <input type="text">
                </input>

                <button>
                    Submit
                </button>
            </div>
        </>
    );
}

function NewDescription({ children, setBlurScreen, closeBlurScreen }) {
    const padding = {
        top: 20 + 'px',
        bottom: 30 + 'px'
    }
    const cssClass = {
        onAddAndDelete: 'onAddAndDelete',
        transitions: 'transitionAfterEdit',
        default: 'defaultAddDeleteBar',
        editButt: 'editButton'
    }

    const [boolEdit, setBoolEdit] = useState(false);
    const [Transition, setTransition] = useState({ opacity: 0, transform: 'translateX(-20px)' })

    function handleEdit() {
        if (boolEdit) {
            setBoolEdit(false);

        } else {
            setBoolEdit(true);
        }
    }

    function handleClick() {
        setBlurScreen(<AddContent />);
    }

    useEffect(() => {
        if (!boolEdit) {
            setTransition({ opacity: 0, transform: "translateX(-20px)" })
            return;
        }

        let theTimeOut = setTimeout(() => {
            setTransition({ opacity: 1, transform: 'translateX(0px)' });
        }, 50);
        return (() => {
            clearTimeout(theTimeOut)
        })
    }, [boolEdit])

    useEffect(() => {
        if (!closeBlurScreen)
            return;

        window.addEventListener('mousedown', closeBlurScreen);

        return (() => {
            if (!closeBlurScreen)
                return;
            window.removeEventListener('mousedown', closeBlurScreen);
        })
    }, [closeBlurScreen])



    return (
        <>
            <Wrapper >

                <div style={{
                    minWidth: '342px',
                    backgroundColor: 'rgba(4, 77, 28, 1)',
                }} className="flex flex-col p-2 w-[80%]  rounded-md ">

                    <div className="flex flex-row justify-center  relative ">

                        <Heading colSpan={2} color='#d5e7f4'>Description</Heading>
                        <button
                            onClick={handleEdit}
                            className={` ${cssClass.editButt} self-end p-1 mb-1 size-10 rounded-md absolute top-0 right-0`}>
                            <img src={boolEdit ? "/stock/icon/cross.png" : "/stock/icon/edit.png"} className="w-full ">
                            </img>
                        </button>
                    </div>

                    <table style={{
                        color: 'var(--blueVeryLight)'
                    }} className=" self-center  m-2">
                        <tbody>

                            <tr>
                                <td style={{
                                    paddingBottom: padding.bottom
                                }} width={'15%'} className="p-1 formateTd ">
                                    <BulletAndCheck no={1} isCheck />
                                </td>
                                <td className="p-1 formateTd">
                                    <TContext>{'I am ajeet Singh and i am jjjjjjj punjab, Hoshiarpur.'}</TContext>
                                </td>
                            </tr>
                            <tr>
                                <td width={'15%'} className="formateTd p-1  ">
                                    <BulletAndCheck no={1} />
                                </td>
                                <td className="p-1 formateTd">
                                    <TContext>{'I am ajeet Singh and i am from punjab, Hoshiarpur. kldjfaljaj lkfalja ldflasjf lafjslafj sadlkfjsal j aj j asdjf la'}</TContext>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                    {boolEdit ?
                        <div style={{
                            opacity: Transition.opacity,
                            transform: Transition.transform
                        }}

                            className={`${cssClass.transitions}  mt-2 mb-2 flex flex-row justify-center `}>
                            <AddAndDelete onClick={handleClick} isAdd classId={'theAdd'} />
                            <AddAndDelete classId={'theDelete'} />
                        </div>
                        :
                        null
                    }

                </div>
            </Wrapper>
        </>
    );
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
                Description :
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
        //console.error("the children must be a array");
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
    ProfileSection2, Discription, NewDescription, BlurScreen,
    Skills, SocialMedia, NewSocialMedia, Education, Experiance, NewProfileSection
};