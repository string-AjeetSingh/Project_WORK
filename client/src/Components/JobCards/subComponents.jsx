import { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { myContext } from './myContext';
import { commonContext } from '../../MyLib/commonContext';
import filterColors from './../../Jsons/filterColors.json';


function Container({ children }) {
    return (
        <>
            <div className=" mb-3   ">
                {children}
            </div>
        </>
    );
}


function ContainerNav({ data, common, setCommon, setContainer, children, isDefault = null, thekey }) {

    const aref = useRef(null);
    const [lstate, setlstate] = useState('border-slate-400');



    function handleClick() {
        setlstate('border-reen-200');
        setContainer(data);


        if (common.current) {
            if (common.current.previousKey !== thekey) {
                common.current.previous();
            }
        }

        if (setCommon) {
            // console.log('from ContainerNav , the typeof setcommon : ', typeof setCommon);
            setCommon({ previous: setOff, previousKey: thekey });
        }

    }

    function setOff() {
        setlstate('border-slate-400');

    }

    useEffect(() => {
        if (isDefault) {
            handleClick();
            setlstate('border-reen-200');
        }
    }, [])


    return (
        <>

            <button ref={aref} onClick={handleClick}
                className={` ${lstate} m-1 p-3 font-serif 
                hover:bg-green-700 border-2 border-green-300
                  text-green-200
               text-[1.2rem] rounded-md`}>
                {children}
            </button>
        </>
    );
}



function Card({ companyName, imgSrc, jobHeading,
    timeAgo, prev, index, location, tags,
    dataToSetOnState, setState, isDefault, __note_this_component_use_context_and_i_am_a_message__ }) {

    const { theClick } = useContext(myContext);
    // console.log('from Card : the theClick : ', theClick)
    const aref = useRef(null);
    const [lstate, setlstate] = useState(null);
    const [hoverClass, sethoverClass] = useState()
    const navigate = useNavigate();

    const cssClass = {
        card: {
            sizeIncrease: 'incSizeCard',
            opacityDecrease: 'decOpacity',
            backgroundColorRemove: 'removeBackground'
        }
    }

    function off() {
        setlstate(null);
    }

    function handleClick() {
        if (theClick.current === 'link') {
            //alert('going to use link');
            // navigate('/jobDetial/' + dataToSetOnState.no);

            return;
        }

        //console.log('from card : ', dataToSetOnState.no);
        setlstate(cssClass.card.backgroundColorRemove);
        setState(dataToSetOnState);
        //console.log('from cards the state function ; ', setState);
        // console.log('the data to set on state : ', dataToSetOnState);
        if (prev.current.off && prev.current.index !== index) {
            prev.current.off();
        }
        prev.current = { index: index, off: off }
    }

    const hoverEffect = {
        mouseEnter: useCallback(() => {
            sethoverClass(cssClass.card.sizeIncrease);
        }, []),
        mouseLeave: useCallback(() => {
            sethoverClass(null)
        }, [])
    }


    const Ago = useCallback(({ children }) => {
        return (

            <div className="flex flex-row text-[0.8rem] 
                            justify-between w-full">
                <div>{children ? children + ' ago' : null}</div>
            </div>

        );
    }, [])

    const Company = useCallback(({ companyName, src }) => {
        return (

            <div className='flex flex-row flex-wrap m-1
                            flex-start w-full items-center'>
                <img className='m-[2px] size-10 rounded-full' src={src} alt='company image'></img>
                <div className=' font-bold  text-2xl
                            ml-2'>{companyName}</div>

            </div>

        );
    }, [])


    const TheJob = useCallback(({ location, jobHeading }) => {
        return (
            <>
                <div style={{
                    lineHeight: '1'
                }} className='text-[1rem]  mt-1 mb-3 '>{jobHeading}</div>
                <div className='text-[0.8rem] relative bottom-1 
         
         '>{location ? location : "DumyBad, India"}</div>

            </>
        );
    }, [])

    const Tags = useCallback(({ tags, Worktag }) => {
        return (

            <div className='flex flex-col flex-wrap 
                    h-fit '>

                {tags.length > 0 ?
                    tags.map((item) => {
                        let out = null;
                        Object.keys(filterColors).forEach((key) => {
                            if (key === item) {

                                out = <Worktag name={item} color={filterColors[key].color}
                                    fontColor={filterColors[key].fontColor} />
                            }
                        })
                        return out;
                    })
                    : null}

            </div>

        );
    }, [])

    useEffect(() => {

        if (theClick.current !== 'link') {

            if (isDefault) {
                handleClick();
            }
        }

    }, [theClick.current])

    useEffect(() => {
        if (aref.current) {
            aref.current.addEventListener('mouseenter', hoverEffect.mouseEnter);
            aref.current.addEventListener('mouseleave', hoverEffect.mouseLeave);
        }
        return (() => {
            if (aref.current) {
                aref.current.removeEventListener('mouseenter', hoverEffect.mouseEnter);
                aref.current.removeEventListener('mouseleave', hoverEffect.mouseLeave);
            }
        })
    }, [])

    return (
        <>
            {theClick.current === 'link' ?
                <Link to={'/jobDetail/' + dataToSetOnState.no}>

                    <div style={{
                        backgroundColor: 'rgba(4, 77, 28, 1)'
                    }}
                        ref={aref} onClick={handleClick}
                        className={`transitionsForCard  flex flex-row justify-between m-2 p-2
                        rounded-lg `}>

                        <div className={` flex flex-col  
             items-start 
               text-green-200
            `}>
                            <Ago>
                                {timeAgo}
                            </Ago>

                            <Company companyName={companyName} src={imgSrc} />

                            <TheJob location={location} jobHeading={jobHeading} />

                        </div>

                        <Tags tags={tags} Worktag={Worktag} />

                    </div>
                </Link>

                :
                <div style={{

                }}
                    ref={aref} onClick={handleClick}
                    className={` transitionsForCard flex flex-row justify-between m-2 p-2
                     ${lstate} ${hoverClass} rounded-lg  `}>

                    <div
                        style={{
                            color: '#d5e7f4'
                        }} className={` flex flex-col  
             items-start  
             
            `}>
                        <Ago>
                            {timeAgo}
                        </Ago>

                        <Company companyName={companyName} src={imgSrc} />

                        <TheJob location={location} jobHeading={jobHeading} />
                    </div>

                    <Tags tags={tags} Worktag={Worktag} />

                </div>
            }

        </>
    );
}

function Filter({ data, setData, originalData }) {
    const [filterData, setfilterData] = useState({ prev: [], curr: [], app: [] });
    //console.log('the filter Data is : ', filterData);
    const [panel, setPanel] = useState({
        isActivated: false, activate: null,
        deActivate: null
    });





    function handleActivate() {
        setPanel((prev) => {
            let newOne = { ...prev };
            newOne.isActivated = true;
            return newOne;
        })
    }

    function handleDeActivate() {

        setPanel((prev) => {
            let newOne = { ...prev };
            newOne.isActivated = false;
            return newOne;
        })
    }

    function handlePanelCancle() {
        if (isSameData()) {
            handleDeActivate();
        } else {
            setfilterData((prev) => {
                let newOne = { ...prev };
                newOne.curr = [...newOne.prev];
                return newOne;
            })
            handleDeActivate();
        }
    }


    function handlePanelApply() {
        setfilterData((prev) => {
            let newOne = { ...prev };
            newOne.app = [...newOne.curr];
            newOne.prev = [...newOne.curr];
            return newOne;
        })
        handleDeActivate();

    }

    function isSameData() {
        if (filterData.prev.length === filterData.curr.length) {
            let boolResult = true;

            filterData.prev.forEach((item, index) => {
                if (filterData.curr[index] !== item) {
                    boolResult = false;
                }
            })
            return boolResult;

        } else {
            return false;
        }
    }

    useEffect(() => {
        setPanel((prev) => {
            prev.activate = handleActivate;
            prev.deActivate = handleDeActivate;
            return prev;
        })
    }, [])

    useEffect(() => {
        if (filterData.app.length > 0) {
            let containbool = false;
            filterData.app.forEach((item) => {
                if (item) {
                    containbool = true;
                }
            })

            if (containbool) {
                if (originalData) {
                    if (originalData.current.length > 0) {
                        let newArr = [];
                        let bool = false;
                        originalData.current.forEach((dataItem) => {
                            bool = false;
                            dataItem.types.forEach((type) => {
                                filterData.app.forEach((appliedType) => {
                                    if (appliedType === type) {
                                        bool = true;
                                    }
                                })
                            })
                            if (bool) {
                                newArr.push(dataItem);
                            }
                        })
                        // console.log('the new array after apply : ', newArr);
                        setData(newArr);
                    }
                }
            } else {
                //console.log('original data must be used now : ', originalData);
                setData(originalData.current);
            }
        }
    }, [filterData.app])



    return (
        <>
            <div className='flex flex-col items-center relative '>

                <div className='flex flex-row items-center text-[0.8rem] font-bold p-1 pt-2 pb-2 
             w-full  overflow-x-auto bg-green-900 '>
                    <FilterButtons index={1} name={'Remote'} color={filterColors.Remote.color}
                        fontColor={filterColors.Remote.fontColor} panelControl={panel}
                        setData={setfilterData} data={filterData} />
                    <FilterButtons index={2} name={'Part Time'} color={filterColors['Part Time'].color}
                        fontColor={filterColors['Part Time'].fontColor} panelControl={panel}
                        setData={setfilterData} data={filterData} />
                    <FilterButtons index={3} name={'Full Time'} color={filterColors['Full Time'].color}
                        fontColor={filterColors['Full Time'].fontColor} panelControl={panel}
                        setData={setfilterData} data={filterData} />
                    <FilterButtons index={4} name={'Office'} color={filterColors.Office.color}
                        fontColor={filterColors.Office.fontColor} panelControl={panel}
                        setData={setfilterData} data={filterData} />



                </div>
                {panel.isActivated ?
                    <div className='s relative p-1 w-full'>
                        <FilterConfirmation cancel={handlePanelCancle} apply={handlePanelApply} />
                    </div>
                    : null}
            </div>

        </>
    );
}

function FilterConfirmation({ apply, cancel }) {
    return (<>

        <div className='absolute flex flex-row items-center
         bg-green-900 p-2 -bottom-16 right-0 '>
            <button onClick={() => {

                if (cancel) {
                    cancel();
                }
            }} className=" m-1 p-2
      pl-4 pr-4 flex flex-row items-center
      justify-center hover:bg-green-900 active:bg-green-800 active:text-teal-950
      bg-green-950 rounded-xl 
      text-teal-700 
      border border-green-800" >
                Cancel
            </button>
            <button onClick={() => {
                if (apply) {
                    apply();
                }
            }} className=" m-1 p-2
      pl-4 pr-4 flex flex-row items-center
      justify-center hover:bg-green-900 active:bg-green-800 active:text-teal-950
      bg-green-950 rounded-xl 
      text-teal-700 
      border border-green-800" >

                Apply
            </button>
        </div>

    </>)
}

function FilterButtons({ name, color, fontColor, index,
    panelControl = { isActivated: null, activate: null, deActivate: null }, setData, data }) {
    const checkbox = useRef(null);
    const toggle = useRef(false);
    const style = {
        button: "flex flex-row items-center p-1 mr-1 shrink-0 border rounded-md " + color,
        lable: `ml-1 ${fontColor ? fontColor : ""}`
    }



    useEffect(() => {
        if (!data.curr[index]) {
            checkbox.current.checked = false;
            toggle.current = false;
        } else {
            checkbox.current.checked = true;
            toggle.current = true;
        }
    }, [data])


    function handleChange() {
        if (!panelControl.isActivated) {
            panelControl.activate();
        }
        if (checkbox.current.checked) {
            setData((prev) => {
                let newOne = { ...prev }
                newOne.curr[index] = name;
                return newOne;
            })
        } else {
            setData((prev) => {
                let newOne = { ...prev }
                newOne.curr[index] = null;
                return newOne;
            })
        }
    }

    function handleButton() {
        if (toggle.current) {
            toggle.current = false;
            checkbox.current.checked = false;
            handleChange();

        } else {
            toggle.current = true;
            checkbox.current.checked = true;
            handleChange();
        }
    }

    return (
        <>
            <button onClick={() => {
                handleButton();
            }} className={style.button}>
                <input ref={checkbox} onChange={(e) => {
                    //handleChange();
                }}
                    type='checkBox' name={name} value={name}></input>
                <lable className={style.lable}>{name}</lable>
            </button>
        </>
    );
}

function Worktag({ name, color, fontColor }) {
    return (
        <>
            <div className={`flex flex-row items-center font-bold justify-center p-1 m-1    mr-1 shrink-0
            border rounded-md  ${color} `}>
                <lable className={` text-[0.8rem] ${fontColor}`}>{name}</lable>
            </div>
        </>
    );
}


export { Container, ContainerNav, Card, Filter, Worktag };