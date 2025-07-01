import { useEffect, useState, useRef, useContext, createContext } from "react";
import { useResizeValue } from "../../MyLib/MyHook/customHook";

const localContext = createContext();

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

    const type = 'basic';


    const [dataFromOut, setDataFromOut] = useState({ name: null, status: null, is: null });
    const dataFormOutRef = useRef({ provided: null, updated: null });

    const [isLoading, setIsLoading] = useState(false);

    function handleEdit() {
        let data = dataFormOutRef.current.provided;
        setBlurScreen(<AddSocialMediaAndBasic handleSubmit={handleSubmit} first={'Name'} firstDefault={data.name} secondDefault={data.is} second={"Is"} third={'Status'} thirdDefault={data.status} />);
    }


    async function serverUpdate(name, title, status, type) {

        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + "/xtServer/api/updateUserParts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ data: { type: type, name: name, title: title, status: status } }),
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

    async function handleSubmit(inputObj) {

        setBlurScreen(false);

        let dataRef = dataFormOutRef.current;
        //setIsLoading(true);

        if (inputObj.first === dataRef.provided.name && inputObj.second === dataRef.provided.is && inputObj.third === dataRef.provided.status) {
            // Here source for the values are not changed.
            alert('⚠️ No Changes, as the fields are not modified ');
            return;
        }

        //Create update
        dataRef.updated = { ...dataRef.provided, name: inputObj.first, is: inputObj.second, status: inputObj.third };


        //Server call.
        let fromServer = await serverUpdate(dataRef.updated.name, dataRef.updated.is, dataRef.updated.status, type);

        setIsLoading(false);
        if (!fromServer) {  //if failed the server request
            return;
        }

        //Server call ok, then : 
        setDataFromOut(dataRef.updated);

    }

    useEffect(() => {
        //Update data from the out once. After this we will use dataFromOut state for updating the data.
        setDataFromOut({
            name: name, is: title, status: status
        })
    }, [status, title, name])

    useEffect(() => {
        //Update the Ref.
        dataFormOutRef.current.provided = dataFromOut;
        console.log('the datafromoutRef : ', dataFormOutRef.current);
    }, [dataFromOut])

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
                            <TableLable color={'#d5e7f4'} paddingTop={20}>Name</TableLable><TableValue color={'rgba(4, 77, 28, 1)'} backgroundColor={'#d5e7f4'} paddingTop={20}>{dataFromOut.name}</TableValue>
                        </tr>
                        <tr >
                            <TableLable color={'#d5e7f4'}>Is</TableLable><TableValue color={'rgba(4, 77, 28, 1)'} backgroundColor={'#d5e7f4'}>{dataFromOut.is}</TableValue>
                        </tr>
                        <tr>
                            <TableLable color={'#d5e7f4'} paddingBottom={20}>Status</TableLable><TableValue color={'rgba(4, 77, 28, 1)'} backgroundColor={'#d5e7f4'} paddingBottom={20}>{dataFromOut.status}</TableValue>
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

    const [checkAll, setCheckAll] = useState(false);

    const defaultDataOnlyOnce = useRef(false);   // Take only the data from the parent only once.
    const [data, setData] = useState([]);
    const [skills, setSkills] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [pick, setPick] = useState(null);   //For delete and checkbox

    const dataRef = useRef({   //ref of the data to share accross the components
        provided: null,
        updated: null
    })


    const newNo = useRef({  //No of bullets in the table.
        no: 0,
        reset: () => {
            newNo.current.no = 0;
        },
        genNewNo: () => {
            return newNo.current.no += 1;
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

    function normalizeTheDeletWork() {
        setPick(null);       //off the delete button.
        setCheckAll(newNo.current.genNewNo()); //communicate to uncheck checkboxs
    }

    function handleClick() {
        normalizeTheDeletWork();
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
        setCheckAll(newNo.current.genNewNo());
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
        console.log('form the outer the check all is : ', checkAll);

    }, [data, boolEdit, checkAll])

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
                <localContext.Provider value={{ checkAll }}>

                    <div className="flex flex-wrap gap-2 p-4">

                        {data.map((name, index) => (
                            <div

                                className="skillBox p-4 bg-blue-500 text-white rounded shadow flex flex-row items-center"
                            >
                                {boolEdit ?
                                    <>

                                        <BulletAndCheck forceCheck={checkAll} setPick={setPick} index={index} onlyCheck />
                                        <div>{name}</div>
                                    </>
                                    : name}
                            </div>
                        ))}
                    </div>
                </localContext.Provider>

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

    const [dataFromOut, setDataFromOut] = useState({ x: null, github: null, email: null });
    const dataFormOutRef = useRef({ provided: null, updated: null });

    const [isLoading, setIsLoading] = useState(false);

    const type = 'socialMedia';

    function handleEdit() {
        let data = dataFormOutRef.current.provided;
        setBlurScreen(<AddSocialMediaAndBasic handleSubmit={handleSubmit} first={'X'} firstDefault={data.x} secondDefault={data.github} second={"Github"} />);
    }

    async function serverUpdate(x, github, type) {

        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + "/xtServer/api/updateUserParts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ data: { type: type, x: x, github: github } }),
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

    async function handleSubmit(inputObj) {

        setBlurScreen(false);

        let dataRef = dataFormOutRef.current;
        //setIsLoading(true);

        if (inputObj.first === dataRef.provided.x && inputObj.second === dataRef.provided.github) {
            // Here source for the values are not changed.
            alert('⚠️ No Changes, as the fields are not modified ');
            return;
        }

        //Create update
        dataRef.updated = { ...dataRef.provided, x: inputObj.first, github: inputObj.second };


        //Server call.
        let fromServer = await serverUpdate(x = dataRef.updated.x, github = dataRef.updated.github, type);

        setIsLoading(false);
        if (!fromServer) {  //if failed the server request
            return;
        }

        //Server call ok, then : 
        setDataFromOut(dataRef.updated);

    }



    useEffect(() => {
        //Update data from the out once. After this we will use dataFromOut state for updating the data.

        setDataFromOut({
            email: email, x: x, github: github
        })
    }, [email, x, github])

    useEffect(() => {
        //Update the Ref.
        dataFormOutRef.current.provided = dataFromOut;
        console.log('the datafromoutRef : ', dataFormOutRef.current);
    }, [dataFromOut])


    return (
        <>
            <div className="  flex flex-col items-center justify-center text-center mt-1 relative   ">

                {isLoading ? <LoadingComp /> : null}

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
                            <TableLable color={'rgba(4, 77, 28, 1)'} paddingTop={10}>Email</TableLable><TableValue color={'#8aceff'} backgroundColor={'rgba(4, 77, 28, 1)'} paddingTop={10}>{dataFromOut.email}</TableValue>
                        </tr>
                        <tr >
                            <TableLable color={'rgba(4, 77, 28, 1)'}>X</TableLable><TableValue color={'#8aceff'} backgroundColor={'rgba(4, 77, 28, 1)'}>{dataFromOut.x}</TableValue>
                        </tr>
                        <tr>
                            <TableLable color={'rgba(4, 77, 28, 1)'} paddingBottom={20}>Github</TableLable><TableValue color={'#8aceff'} backgroundColor={'rgba(4, 77, 28, 1)'} paddingBottom={20}>{dataFromOut.github}</TableValue>
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

function BulletAndCheck({ forceCheck, onlyCheck, isCheck, no, index, setPick, i_am_using_context }) {

    const [check, setCheck] = useState(false);
    const context = useContext(localContext);


    function areAllFalsy(array) {
        if (!Array.isArray(array)) return false;
        return array.every(item => !item);
    }


    function handleChange(e) {
        console.log("check handle change ");
        setCheck(e.target.checked);

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

    useEffect(() => {
        console.log('the force check is : ', forceCheck);
        setCheck(false);

    }, [forceCheck])

    useEffect(() => {
        if (isCheck === false)
            setCheck(false);
    }, [isCheck])

    return (
        <>
            {onlyCheck ?

                <input checked={check} onChange={handleChange} style={{
                    marginRight: '5px',
                }}

                    className="size-7 rounded-checkbox  " type="checkbox"></input>
                :

                <div
                    className="flex flex-col items-center ">

                    <div style={{
                        color: 'var(--greenLight)',
                        backgroundColor: 'var(--blueVeryLight)',


                    }} className="rounded-md size-10 flex flex-col
            items-center justify-center font-bold"
                    >

                        {isCheck ?

                            <input checked={check} onChange={handleChange}

                                className="size-7 rounded-checkbox-medium" type="checkbox"></input>

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

function AddSocialMediaAndBasic({ first, second, third, firstDefault, secondDefault, thirdDefault, handleSubmit }) {

    // Props first , seconds, third is use to formate theInput object. 
    // Whatever you active you can expect the object paramter to the handleSubmit , will contain it.
    // If you give name to first , then the name you give, you will see it on the input and on submit contain in the object as paramter {first  : 'Input Value'}.

    const theRef = useRef(null);
    const [theInput, setInput] = useState({ first: '', second: '', third: "" });


    const cssClass = {
        submit: 'submitEdit'
    }

    function stopPropagation(e) {
        e.stopPropagation();
    }

    const emptyStringsToUndefined = (obj) => {
        const result = { ...obj };
        for (const key in result) {
            if (result[key] === '') {
                result[key] = 'undefined';
            }
        }
        return result;
    };


    function handleChange(e, inputType) {
        if (inputType !== "first" && inputType !== "second" && inputType !== "third") {
            console.error("Please provide valid inputType to the handleChange")
            return;
        }

        setInput({ ...theInput, [inputType]: e.target.value });
    }

    useEffect(() => {

        let newObj = { ...theInput };

        if (firstDefault) {
            newObj.first = firstDefault;
        }

        if (secondDefault) {
            newObj.second = secondDefault;
        }

        if (thirdDefault) {
            newObj.third = thirdDefault;
        }

        setInput(newObj);
    }, [firstDefault, secondDefault, thirdDefault])

    useEffect(() => {
    }, [theInput])


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


                {/* Input 1st  */}
                {first ?
                    <>
                        <div className=" inputHeading self-start
                ">{first}</div>
                        <input onChange={(e) => {
                            handleChange(e, 'first');
                        }
                        }
                            value={theInput.first}
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


                {/* Input 2  */}
                {second ?
                    <>
                        <div className=" inputHeading self-start
                ">{second}</div>
                        <input onChange={(e) => {
                            handleChange(e, 'second');
                        }
                        }
                            value={theInput.second}
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

                    </>
                    :
                    null
                }


                {/* Input 3  */}
                {third ?
                    <>
                        <div className=" inputHeading self-start font-bold
                ">{third}</div>
                        <input onChange={(e) => {
                            handleChange(e, 'third');
                        }
                        }
                            value={theInput.third}
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
                        let out = emptyStringsToUndefined(theInput);
                        console.log('out is : ', out);
                        handleSubmit(out);
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
    const [checkAll, setCheckAll] = useState(false);
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
    const newNo = useRef({  // New no for communication to BulletAndCheck comp to false the checked.
        no: 0,
        reset: () => {
            newNo.current.no = 0;
        },
        genNewNo: () => {
            return newNo.current.no += 1;
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
        normalizeTheDeletWork();
        setBlurScreen(<AddContent handleSubmit={handleAddContent} />);
    }

    function normalizeTheDeletWork() {
        setPick(null);       //off the delete button.
        setCheckAll(newNo.current.genNewNo()); //communicate to uncheck checkboxs
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
        setCheckAll(newNo.current.genNewNo());
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
                            forceCheck={checkAll}
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
                className="rounded-md absolute flex flex-row justify-center items-center">
                <div className="spin">

                </div>
            </div>
        </>
    );
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
    ProfileSection2, BulletShow, BlurScreen,
    SocialMedia, NewSocialMedia, NewProfileSection
};