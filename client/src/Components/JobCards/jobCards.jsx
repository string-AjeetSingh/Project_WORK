import { useEffect, useRef, useState } from 'react';
import list from '../Rough/list.json';
import { Container, ContainerNav, Card } from './subComponents';

function JobCards({ children }) {

    let [cardsArr, setCardsArr] = useState([]);
    let [navItemArr, setnavItemArr] = useState([]);

    let docs = list.docs;
    let navItemCommon = useRef(null);
    let prevCard = useRef({});

    for (let i = 0; i < docs.length; i++) {
        docs[i].index = i;
    }

    function setCommon(val) {
        navItemCommon.current = val;
    }

    function setContainer(docs) {
        let arr = [];
        for (let i = 0; i < docs.length; i++) {
            arr.push(
                <Card key={docs[i].index}
                    prev={prevCard} index={docs[i].index}
                    companyName={docs[i].CompanyName} imgSrc={docs[i].ImgSrc}
                    jobHeading={docs[i].JobHeading} tag={docs[i].Tag} timeAgo={docs[i].TimeAgo} />
            )
        }
        setCardsArr([...arr]);
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
                    key={1} >

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

            console.log(`counter = ${counter}`);
            console.log(`arr2 below :`);
            console.log(arr2);

            setnavItemArr([...arr2]);

        }
    }

    useEffect(() => {

        let result = calibrate(10, docs.length - 1);
        console.log(`the calibrated data below : `);
        console.log(`the total no of data: ${docs.length - 1}`);
        console.log(result);

        divideData(result);

    }, [])
    return (
        <>

            <div className="sticky  top-0 border-2
        bg-blue-950 
        border-gray-900 h-50 ">
                <div className="m-4">i am nav bar</div>
            </div>

            <div className="flex flex-row justify-center
        item-center ">

                <div className="flex flex-col ">

                    <Container >
                        {cardsArr}
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