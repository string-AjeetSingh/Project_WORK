import { useEffect, useState, useRef } from "react";
import { useResizeValue } from "../../MyLib/MyHook/customHook";


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

function NewProfileSection({ setBlurScreen, status = 'undefined', title = 'undefined', name = 'undefined', heading = "undefined" }) {

    const cssClass = {
        editButt: 'editButton'
    }

    function handleEdit() {
        setBlurScreen(<AddSocialMediaAndBasic type={'basic'} />);
    }
    return (
        <div className=" flex flex-col items-center  mt-1  ">
            <div style={{
                minWidth: '342px',
                backgroundColor: 'rgba(4, 77, 28, 1)',
                padding: '10px'
            }} className="w-[80%] rounded-xl 0">


                <div style={{
                }} className="flex flex-row justify-center  relative ">

                    <Heading colSpan={2} color='#d5e7f4'>{heading}</Heading>
                    <button onClick={handleEdit}

                        className={` ${cssClass.editButt} self-end p-1 mb-1 size-10 rounded-md absolute top-0 right-0`}>
                        <img src={"/stock/icon/edit.png"} className="w-full ">
                        </img>
                    </button>
                </div>

                <table style={{

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
        </div>

    );
}

function NewSkills({ setBlurScreen, dataArray = [] }) {

    const cssClass = {
        editButt: 'editButton',
        onAddAndDelete: 'onAddAndDelete',
        transitions: 'transitionAfterEdit',
        default: 'defaultAddDeleteBar',
    }
    const type = 'skills'

    const defaultDataOnlyOnce = useRef(false);   // Take only the data from the parent only once.
    const [data, setData] = useState([]);
    const [skills, setSkills] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [pick, setPick] = useState(null);   //For delete and checkbox

    const dataRef = useRef({   //ref of the data to share accross the components
        provided: null,
        updated: null
    })


    const bulletsNo = useRef({  //No of bullets in the table.
        no: 0,
        reset: () => {
            bulletsNo.current.no = 0;
        },
        newNo: () => {
            return bulletsNo.current.no += 1;
        }
    })

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
        setBlurScreen(<AddContent handleSubmit={handleAddContent} smallInput />);
    }

    function normalizeArray(arr) {
        return arr.filter(Boolean);
    }

    async function serverUpdate(value, type) {

        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + "/xtServer/api/updateUserParts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ data: { type: type, value: value } }),
            });
            //  console.log('the response : ', response);

            if (response.status === 200) {
                const result = await response.json();
                //    console.log('the result : ', result);

                if (!result.status === 1) {
                    alert("⚠️ Problem with server request, message From server : " + result.message)
                    return false;
                }
                return true;
            }

            return false;

        } catch (error) {
            console.error('Error posting data:', error);
        }


    }



    async function handleAddContent(input) {

        let value = input;
        //console.log('the input : ', input);

        if (value && value.length > 0) {

            setIsLoading(true);
            setBlurScreen(false);
            //console.log("✅ server request ");

            if (!dataRef?.current)
                return

            const data = dataRef.current;

            data.updated = [...data.provided, value];

            //console.log('the data : ', data);

            let fromServer = await serverUpdate(data.updated, type);

            if (!fromServer) {  //if failed the server request
                setIsLoading(false);
                return;
            }

            setData([...data.updated]);
            setIsLoading(false);
            //  console.log('data provided :  ', data.updated);

        } else {
            alert('⚠️ Provide value to field before submit.')
        }
    }

    async function handleDelete() {

        if (!Array.isArray(pick))
            return;


        setIsLoading(true);
        let newDataArray = [...data];

        pick.forEach((item, index) => {
            if (item) {
                newDataArray[index] = false;
            }

        })


        newDataArray = normalizeArray(newDataArray)
        let fromServer = await serverUpdate(newDataArray, type);

        if (!fromServer) {
            setIsLoading(false);
            return;
        }

        setData(newDataArray);
        setPick(null);
        setIsLoading(false);


        //Now server logic and response
    }


    useEffect(() => {
        if (!boolEdit) {
            setTransition({ opacity: 0, transform: "translateX(-20px)" })

            setPick(null);    //the delete must be disabled as not checked item.
            return;
        }

        let theTimeOut = setTimeout(() => {
            setTransition({ opacity: 1, transform: 'translateX(0px)' });
        }, 50);
        return (() => {
            clearTimeout(theTimeOut)
        })
    }, [boolEdit])


    // Data should be used to show skills and it will empty array if not array from out and empty array.
    useEffect(() => {

        //Return if the data is already kept.
        if (defaultDataOnlyOnce.current)
            return;

        if (Array.isArray(dataArray) && dataArray.length > 0) {
            setData(dataArray); // set empty array.
            defaultDataOnlyOnce.current = true;
        }

    }, [dataArray])

    useEffect(() => {
        console.log('the pick : ', pick);
    }, [pick])

    useEffect(() => {
        console.log('the data is updated with new one  :', data);
        let newArray = data.map((name, index) => (
            <div
                key={index}
                className="skillBox p-4 bg-blue-500 text-white rounded shadow flex flex-row items-center"
            >
                {boolEdit ?
                    <>
                        <BulletAndCheck setPick={setPick} index={index} onlyCheck />
                        <div>{name}</div>
                    </>
                    : name}
            </div>
        ))
        setSkills(newArray)
    }, [data, boolEdit])

    useEffect(() => {
        dataRef.current.provided = data;
    }, [data])


    return (
        <div className=" flex flex-col items-center  mt-1  ">
            <div style={{
                minWidth: '342px',
                backgroundColor: 'rgba(4, 77, 28, 1)',
                padding: '10px'
            }} className="w-[80%] rounded-xl  relative">

                {isLoading ? <LoadingComp /> : null}

                <div style={{
                }} className="flex flex-row justify-center  relative ">

                    <Heading colSpan={2} color='#d5e7f4'>{"Skills"}</Heading>
                    <button onClick={handleEdit}

                        className={` ${cssClass.editButt} self-end p-1 mb-1 size-10 rounded-md absolute top-0 right-0`}>
                        <img src={"/stock/icon/edit.png"} className="w-full ">
                        </img>
                    </button>
                </div>

                {/*Skills Box  */}
                <div className="flex flex-wrap gap-2 p-4">
                    {skills}
                </div>

                {boolEdit ?
                    <div style={{
                        opacity: Transition.opacity,
                        transform: Transition.transform
                    }}

                        className={`${cssClass.transitions}  mt-2 mb-2 flex flex-row justify-center `}>
                        <AddAndDelete isAdd onClick={handleClick} classId={'theAdd'} />
                        {pick ? <AddAndDelete onClick={handleDelete} classId={'theDelete'} /> : <AddAndDelete classId={'theDelete'} disabled />}
                    </div>
                    :
                    null
                }

            </div>
        </div>

    );
}

function NewSocialMedia({ setBlurScreen, email = 'undefined', github = 'undefined', x = 'undefined' }) {

    const cssClass = {
        editButt: 'editButton'
    }

    function handleEdit() {
        setBlurScreen(<AddSocialMediaAndBasic type={'socialMedia'} />);
    }


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
                        <tr>
                            <th style={{
                                color: 'var(--greenLight)',
                                padding: '5px'
                            }}
                                className="text-2xl relative" colSpan={2}>Social Media
                                <button onClick={handleEdit}

                                    className={` ${cssClass.editButt} self-end p-1 mb-1 size-10 rounded-md absolute top-1 right-1`}>
                                    <img src={"/stock/icon/edit.png"} className="w-full ">
                                    </img>
                                </button></th>

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

function BulletAndCheck({ onlyCheck, isCheck, no, index, setPick }) {

    function areAllFalsy(array) {
        if (!Array.isArray(array)) return false;
        return array.every(item => !item);
    }


    function handleChange(e) {
        if (e.target.checked) {

            setPick((prev) => {

                if (!prev) {
                    let newArray = [];
                    newArray[index] = true
                    return newArray;
                }

                prev[index] = true;
                return [...prev];
            })

        } else
            setPick((prev) => {

                if (!prev) {
                    return null;
                }

                prev[index] = false;

                if (areAllFalsy(prev))
                    return null;

                return [...prev];
            })

    }

    return (
        <>
            {onlyCheck ?

                <input onChange={handleChange} style={{
                    marginRight: '5px',
                }}

                    className="size-7 rounded-checkbox  " type="checkbox"></input>
                :

                <div
                    className="flex flex-col items-center ">

                    <div style={{
                        color: 'var(--greenLight)',
                        backgroundColor: 'var(--blueVeryLight)',


                    }} className=" rounded-md size-10 flex flex-col
            items-center justify-center font-bold"
                    >

                        {isCheck ?

                            <input onChange={handleChange}

                                className="size-7 " type="checkbox"></input>

                            : <span className="text-[1.1rem]">{no}</span>
                        }
                    </div>
                </div>

            }
        </>
    );
}

function TContext({ children }) {
    return (
        <>
            <div className="rounded-md break-text  ml-5">
                {children}
            </div>
        </>
    );
}

function AddAndDelete({ isAdd, classId, onClick, disabled }) {

    return (
        <>
            <button disabled={disabled} onClick={(e) => {
                e.preventDefault();
                if (onClick)
                    onClick();
            }} className={` ${disabled ? 'btn-disabled' : classId} size-10 rounded-full m-2 flex flex-row justify-center items-center`}>
                <img className="size-8" src={isAdd ? "/stock/icon/plus2.png" : "/stock/icon/delete.png"}>
                </img>
            </button>
        </>
    );
}

function BlurScreen({ children, handleClick }) {
    const screenWidth = useResizeValue(window.innerWidth)
    const theRef = useRef(null);

    useEffect(() => {
        if (!theRef.current || !handleClick)
            return;

        theRef.current.addEventListener('mousedown', handleClick);

        return (() => {
            if (!theRef.current || !handleClick)
                return;

            theRef.current.removeEventListener('mousedown', handleClick);
        })
    }, [theRef])

    return (
        <>
            <div ref={theRef}
                style={{
                    backgroundColor: "var(--greenLight-blur)",
                    zIndex: 5,
                    top: 0,
                    left: 0,
                    width: screenWidth + 'px',
                    height: '100dvh',
                }} className="fixed flex flex-row justify-center items-center">
                {children}
            </div>
        </>
    );
}

function AddSocialMediaAndBasic({ type = "basic", handleSubmit }) {
    const theRef = useRef(null);
    const theInput = useRef({ fist: "", second: "", third: "" });


    const cssClass = {
        submit: 'submitEdit'
    }

    function stopPropagation(e) {
        e.stopPropagation();
    }

    function handleChange(e, inputType) {
        if (inputType !== "first" && inputType !== "second" && inputType !== "third") {
            console.error("Please provide valid inputType to the handleChange")
            return;
        }

        theInput.current[inputType] = e.target.value;

        console.log('the input is : ', theInput.current);
    }




    useEffect(() => {
        if (!theRef.current)
            return;

        theRef.current.addEventListener('mousedown', stopPropagation);

        return (() => {
            if (!theRef.current)
                return;

            theRef.current.removeEventListener('mousedown', stopPropagation);

        })

    }, [theRef])

    return (
        <>
            <div ref={theRef} onClick={(e) => {
                e.stopPropagation();
            }} style={{
                width: '70%',
                maxWidth: "500px",
                minWidth: "340px",
                backgroundColor: "var(--blueVeryLight)"
            }} className="p-2 flex flex-col items-center  rounded-xl border border-black">

                {/* Input 1  */}
                <div className=" inputHeading self-start
                ">{type === 'basic' ? "Name :" : 'X : '}</div>
                <input onChange={(e) => {
                    handleChange(e, 'first');
                }
                }
                    placeholder="Write here..."
                    style={{
                        height: '50px',
                        border: '2px solid',
                        borderColor: 'var(--greenLight)',
                        color: 'var(--greenLight)'
                    }} className="rounded-md p-1 w-full">

                </input>


                {/* Input 2  */}
                <div className=" inputHeading self-start
                ">{type === 'basic' ? "Is :" : 'Github : '}</div>
                <input onChange={(e) => {
                    handleChange(e, 'second');
                }
                }
                    placeholder="Write here..."
                    style={{
                        height: '50px',
                        border: '2px solid',
                        borderColor: 'var(--greenLight)',
                        color: 'var(--greenLight)',
                        marginTop: "5px",
                        marginBottom: "5px",
                    }} className="rounded-md p-1 w-full">

                </input>


                {/* Input 3  */}
                {type === 'basic' ?
                    <>
                        <div className=" inputHeading self-start font-bold
                ">Status :</div>
                        <input onChange={(e) => {
                            handleChange(e, 'third');
                        }
                        }
                            placeholder="Write here..."
                            style={{
                                height: '50px',
                                border: '2px solid',
                                borderColor: 'var(--greenLight)',
                                color: 'var(--greenLight)'
                            }} className="rounded-md p-1 w-full">

                        </input>
                    </>

                    :
                    null
                }

                <button onClick={(e) => {
                    if (handleSubmit) {
                        handleSubmit(theInput.current);
                    }
                }}

                    className={`${cssClass.submit} p-2 text-2xl mt-2 rounded-md  w-fit self-end `}>
                    Submit
                </button>
            </div>
        </>
    );
}


function AddContent({ handleSubmit, smallInput }) {
    const theRef = useRef(null);
    const theInput = useRef('');

    const cssClass = {
        submit: 'submitEdit'
    }

    function stopPropagation(e) {
        e.stopPropagation();
    }

    function handleChange(e) {
        theInput.current = e.target.value;
    }



    useEffect(() => {
        if (!theRef.current)
            return;

        theRef.current.addEventListener('mousedown', stopPropagation);

        return (() => {
            if (!theRef.current)
                return;
            theRef.current.removeEventListener('mousedown', stopPropagation);

        })

    }, [theRef])

    return (
        <>
            <div ref={theRef} onClick={(e) => {
                e.stopPropagation();
            }} style={{
                width: '70%',
                maxWidth: "500px",
                minWidth: "340px",
                backgroundColor: "var(--blueVeryLight)"
            }} className="p-2 flex flex-col  rounded-xl border border-black">

                {smallInput ?
                    <input onChange={handleChange}
                        placeholder="A Skill here..."
                        style={{
                            border: '2px solid',
                            borderColor: 'var(--greenLight)',
                            color: 'var(--greenLight)'
                        }} className="rounded-md p-1" >

                    </input>
                    :
                    <textarea onChange={handleChange}
                        placeholder="Write here..."
                        style={{
                            height: '120px',
                            border: '2px solid',
                            borderColor: 'var(--greenLight)',
                            color: 'var(--greenLight)'
                        }} className="rounded-md p-1" rows="4" cols="50">

                    </textarea>
                }

                <button onClick={(e) => {
                    if (handleSubmit) {
                        handleSubmit(theInput.current);
                    }
                }}

                    className={`${cssClass.submit} p-2 text-2xl mt-2 rounded-md  w-fit self-end `}>
                    Submit
                </button>
            </div>
        </>
    );
}

function BulletShow({ name, children, setBlurScreen, dataArray, type }) {
    const padding = {
        top: 20 + 'px',
        bottom: 30 + 'px'
    }
    const [isLoading, setIsLoading] = useState(false);
    const [pick, setPick] = useState(null);   //For delete and checkbox
    const [rows, setRows] = useState([]);
    const [dataFromOut, setDataFromOut] = useState(dataArray);  //data state
    const dataRef = useRef({   //ref of the data to share accross the components
        provided: null,
        updated: null
    })
    const defaultDataOnlyOnce = useRef(false);

    const cssClass = {
        onAddAndDelete: 'onAddAndDelete',
        transitions: 'transitionAfterEdit',
        default: 'defaultAddDeleteBar',
        editButt: 'editButton'
    }

    const bulletsNo = useRef({  //No of bullets in the table.
        no: 0,
        reset: () => {
            bulletsNo.current.no = 0;
        },
        newNo: () => {
            return bulletsNo.current.no += 1;
        }
    })

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
        setBlurScreen(<AddContent handleSubmit={handleAddContent} />);
    }

    function removeAddContent() {
        setBlurScreen(false);
    }

    function normalizeArray(arr) {
        return arr.filter(Boolean);
    }

    async function serverUpdate(value, type) {

        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + "/xtServer/api/updateUserParts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ data: { type: type, value: value } }),
            });
            //  console.log('the response : ', response);

            if (response.status === 200) {
                const result = await response.json();
                //    console.log('the result : ', result);

                if (!result.status === 1) {
                    alert("⚠️ Problem with server request, message From server : " + result.message)
                    return false;
                }
                return true;
            }

            return false;

        } catch (error) {
            console.error('Error posting data:', error);
        }


    }

    async function handleAddContent(input) {

        let value = input;
        //console.log('the input : ', input);

        if (value && value.length > 0) {

            setIsLoading(true);
            setBlurScreen(false);
            //console.log("✅ server request ");

            if (!dataRef?.current)
                return

            const data = dataRef.current;

            data.updated = [...data.provided, value];

            //console.log('the data : ', data);

            let fromServer = await serverUpdate(data.updated, type);

            if (!fromServer) {  //if failed the server request
                setIsLoading(false);
                return;
            }
            /* 
        */
            setDataFromOut([...data.updated]);
            setIsLoading(false);
            //  console.log('data provided :  ', data.updated);

        } else {
            alert('⚠️ Provide value to field before submit.')
        }
    }

    async function handleDelete() {

        if (!Array.isArray(pick))
            return;


        setIsLoading(true);
        let newDataArray = [...dataFromOut];

        pick.forEach((item, index) => {
            if (item) {
                newDataArray[index] = false;
            }

        })

        newDataArray = normalizeArray(newDataArray)
        let fromServer = await serverUpdate(newDataArray, type);

        if (!fromServer) {
            setIsLoading(false);
            return;
        }

        setDataFromOut(newDataArray);
        setPick(null);
        setIsLoading(false);

        //console.log('the newDataArray : ', newDataArray);

        //Now server logic and response
    }


    useEffect(() => {
        if (!boolEdit) {
            setTransition({ opacity: 0, transform: "translateX(-20px)" })

            setPick(null);    //the delete must be disabled as not checked item.
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
        //Set default Data

        if (defaultDataOnlyOnce.current)
            return;

        console.log("✅ Default Data set");
        if (!dataArray)
            setDataFromOut([]);

        else
            setDataFromOut(dataArray);

        defaultDataOnlyOnce.current = true;

    }, [dataArray])

    useEffect(() => {
        dataRef.current.provided = dataFromOut;
        console.log("the dataFromOut : ", dataFromOut);
    }, [dataFromOut])

    useEffect(() => {
        //Content to the table form the dataArray

        if (Array.isArray(dataFromOut) && dataFromOut.length > 0) {
            bulletsNo.current.reset();

            const newRows = dataFromOut.map((item, index) => {
                let newNo = bulletsNo.current.newNo();
                return (<tr key={index}>
                    <td
                        width="15%"
                        className="p-1 formateTd"
                        style={{ paddingBottom: padding.bottom }}
                    >
                        <BulletAndCheck
                            setPick={setPick}
                            no={newNo}
                            index={index}
                            isCheck={boolEdit}
                        />
                    </td>
                    <td className="p-1 formateTd">
                        <TContext>{item}</TContext>
                    </td>
                </tr>)

            });
            setRows(newRows);
        } else {
            setRows([
                <tr key="no-items">
                    <td colSpan={2} className="p-1 text-gray-500 italic">
                        No items found.
                    </td>
                </tr>,
            ]);
        }
    }, [dataFromOut, boolEdit, padding.bottom]);



    return (
        <>
            <Wrapper >


                <div style={{
                    minWidth: '342px',
                    backgroundColor: 'rgba(4, 77, 28, 1)',
                }} className="relative flex flex-col p-2 w-[80%]  rounded-md ">

                    {isLoading ? <LoadingComp /> : null}

                    <div className="flex flex-row justify-center  relative ">

                        <Heading colSpan={2} color='#d5e7f4'>{name}</Heading>
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

                            {rows}

                        </tbody>

                    </table>

                    {boolEdit ?
                        <div style={{
                            opacity: Transition.opacity,
                            transform: Transition.transform
                        }}

                            className={`${cssClass.transitions}  mt-2 mb-2 flex flex-row justify-center `}>
                            <AddAndDelete onClick={handleClick} isAdd classId={'theAdd'} />
                            {pick ? <AddAndDelete onClick={handleDelete} classId={'theDelete'} /> : <AddAndDelete classId={'theDelete'} disabled />}
                        </div>
                        :
                        null
                    }

                </div>
            </Wrapper>
        </>
    );
}

function LoadingComp({ }) {
    return (
        <>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    top: "0px",
                    left: "0px",
                    zIndex: 5,
                    backgroundColor: 'var(--greenLight-blur)'
                }}
                className="absolute flex flex-row justify-center items-center">
                <div className="spin">

                </div>
            </div>
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
    ProfileImageSection, NewSkills,
    ProfileSection2, Discription, BulletShow, BlurScreen,
    Skills, SocialMedia, NewSocialMedia, Education, Experiance, NewProfileSection
};