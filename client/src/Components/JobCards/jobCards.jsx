import { useEffect, useRef, useState } from 'react';
import list from '../Rough/list.json';
import { Container, ContainerNav, Card, Filter } from './subComponents';
import { useContext, createContext } from 'react';
import { myContext as jobContext } from "./myContext"
import { myContext } from '../HomeWithLogin/myContext';
import './jobCards.css';

function JobCards({ children, link, __note_this_component_use_context_and_i_am_a_message__ }) {

    const { dataFromServer, setDataForAboutJob, setdataFromServer
        , originalData
    } = useContext(myContext);

    let [cardsArr, setCardsArr] = useState([]);
    let [navItemArr, setnavItemArr] = useState([]);
    let [key1, setkey1] = useState(1);
    let forwardToCard = useRef(link ? 'link' : 'local');

    let docs;

    ////console.log('the data from server is : ', dataFromServer);


    if (dataFromServer) {
        // //console.log('getted the goind to use this data in JobCards : ', dataFromServer);
        docs = dataFromServer;
    }
    else {
        alert('using old data ');
        //console.log('using old data ');
        docs = list.docs;
    }

    let navItemCommon = useRef(null);
    let prevCard = useRef({});

    for (let i = 0; i < docs.length; i++) {
        docs[i].index = i;
    }

    function setCommon(val) {
        navItemCommon.current = val;
    }

    /* 
    
    function setContainer(docs) {
        let arr = [];
        for (let i = 0; i < docs.length; i++) {
            arr.push(
                <Card key={docs[i].index}
                prev={prevCard} index={docs[i].index} dataToSetOnState={docs[i]}
                companyName={docs[i].CompanyName} imgSrc={docs[i].ImgSrc} setState={setStateForCards}
                jobHeading={docs[i].JobHeading} tag={docs[i].Tag} timeAgo={docs[i].TimeAgo} />
            )
        }
        setCardsArr([...arr]);
    }
    */

    function setContainer(docs) {

        if (docs) {
            let arr = [];
            for (let i = 0; i < docs.length; i++) {
                ////console.log('the console about docs : ', docs);
                arr.push(
                    <Card key={docs[i].index}
                        prev={prevCard} index={docs[i].index} dataToSetOnState={docs[i]} location={docs[i].location}
                        companyName={docs[i].companyName} imgSrc={docs[i].img} setState={setDataForAboutJob}
                        jobHeading={docs[i].jobData.title} tags={docs[i].types} timeAgo={docs[i].TimeAgo}
                        isDefault={i === 0 ? true : false} />
                )
            }
            setCardsArr([...arr]);
        }
    }

    function calibrate(each, total) {

        const cd = total / each;
        const remainder = total % each;
        let navItemCount = null;

        if (cd > 0) {
            if (cd < 1) {

                navItemCount = 1;
                return {
                    navItemCount: navItemCount,
                    remainder: remainder,
                    remainderOnly: true
                }
            } else {
                navItemCount = parseInt(cd) + 1;
                return {
                    navItemCount: navItemCount,
                    remainder: remainder,
                    each: each
                }
            }
        }
        else {
            return {
                navItemCount: 0
            }
        }
    }

    function divideData(calibrationData) {

        if (calibrationData.remainderOnly) {
            setnavItemArr([
                <ContainerNav
                    data={docs} common={navItemCommon}
                    setContainer={setContainer} isDefault={true}
                    key={key1} >

                    {calibrationData.navItemCount}
                </ContainerNav>
            ]);
        }
        else if (calibrationData.navItemCount === 0) {
            setnavItemArr(
                "---"
            );

            setCardsArr(<div>No Job found</div>);
        }
        else {
            let arr1 = [];
            let arr2 = [];
            let counter = 0;

            for (let i = 1; i <= calibrationData.navItemCount; i++) {
                arr1 = [];

                if (i === calibrationData.navItemCount) {

                    if (calibrationData.remainder !== 0) {
                        for (let j = 1; j <= calibrationData.remainder; j++) {
                            arr1.push(docs[counter]);
                            counter++;
                        }
                    } else {
                        for (let j = 1; j <= calibrationData.each; j++) {
                            arr1.push(docs[counter]);
                            counter++;
                        }
                    }

                } else {
                    for (let j = 1; j <= calibrationData.each; j++) {

                        arr1.push(docs[counter]);
                        counter++;
                    }
                }
                // //console.log("type of setCommon : ", typeof setCommon);
                arr2.push(<ContainerNav
                    data={[...arr1]} common={navItemCommon}
                    setCommon={setCommon}
                    setContainer={setContainer}
                    isDefault={i === 1 ? true : false}
                    thekey={i}
                >
                    {i}
                </ContainerNav>);
            }

            // //console.log(`counter = ${counter}`);
            // //console.log(`arr2 below :`);
            // //console.log(arr2);

            setnavItemArr([...arr2]);

        }
    }

    useEffect(() => {

        forwardToCard.current = link ? 'link' : 'local';

        let result = calibrate(10, docs.length === 1 ? docs.length : docs.length - 1);
        //console.log(`the calibrated data below : `);
        //console.log(`the total no of data: ${docs.length - 1}`);
        //console.log(result);

        setkey1((prev) => {
            return prev + 1;
        })

        divideData(result);

    }, [dataFromServer, link])
    return (
        <>



            <div className="flex flex-col  ">
                <div className="flex flex-col w-full ">

                    <Filter originalData={originalData}
                        data={dataFromServer} setData={setdataFromServer} />

                    <Container >
                        <jobContext.Provider value={{ theClick: forwardToCard }} >

                            {cardsArr}
                        </jobContext.Provider>
                    </Container>

                    <div className='overflow-auto'>
                        {navItemArr}
                    </div>

                </div>

            </div>

        </>
    );
}


export { JobCards };