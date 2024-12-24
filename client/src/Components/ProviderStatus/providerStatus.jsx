import { useEffect, useState } from "react";
import { requestServer } from "../../MyLib/RequestServer/requestServer";
import { Card } from "./subComponents";
import { CommonWrapper } from "./subComponents";

function ProviderStatus({ isAuthenticated }) {

    const [data, setdata] = useState(null);
    async function fetchUserPosts(params) {
        let fetchPosts = new requestServer(process.env.REACT_APP_SERVER_URL
            + 'xtServer/api/fetchUserPosts', { method: 'GET' });

        fetchPosts.noBody();
        fetchPosts.setAuthorizedFlag(isAuthenticated);
        let result = await fetchPosts.requestJson();

        console.log('from FetchUserPosts, the response is ', result);
        if (result) {
            if (result.json.status) {
                // alert('found the data');
                console.log('the userPosts is  :', result.json);
                return result.json.data;
            }
            else {
                // alert('not found the data');
                return false;

            }
        }
    }

    console.log('the data is ', data);
    useEffect(() => {
        fetchUserPosts().then((res) => {
            if (res) {
                setdata(res);
            }
        })
    }, [])
    return (
        <>

            <h1 className="text-3xl text-green-800 
            font-serif m-1 p-1">
                Provided Work :
            </h1>

            <div className="flex flex-row    ">
                <CommonWrapper>
                    <div className=" flex flex-row flex-wrap
             overflow-y-auto min-w-[350px]  m-1 w-full justify-center
            h-96">
                        {data instanceof Array ?
                            data.map((item) => {
                                return <Card companyName={item.companyName} theClick={'link'}
                                    imgSrc={item.img} jobHeading={item.jobData.title}
                                    timeAgo={null} location={item.location} docNo={item.no}
                                />
                            })
                            :
                            <h3>No Data To Show</h3>}
                    </div>

                </CommonWrapper>
            </div>

        </>
    );
}


export { ProviderStatus }