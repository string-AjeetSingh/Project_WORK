import { useEffect, useRef, useState } from 'react';
import {
    ProfileImageSection,
    ProfileSection2, Status, Education, Experiance
    , Skills, Discription, SocialMedia
} from './subComponents';

import { requestServer } from '../../MyLib/RequestServer/requestServer';






function UserProfile({ children, isAuthenticated }) {

    const [data, setdata] = useState(null);

    async function userDetail(params) {

        const userDetial = new requestServer(process.env.REACT_APP_SERVER_URL
            + "/xtServer/api/userDetail"
            , { method: 'GET' }
            , true);

        delete (userDetial.options.body);

        userDetial.setAuthorizedFlag(isAuthenticated);
        let result = await userDetial.requestJson();

        if (result) {
            console.log('the user detail would be : ', result);
            console.log(result.json.data);

            setdata(result.json.data);
        }
        else {

        }


    }
    useEffect(() => {
        userDetail();
    }, [])

    return (
        <>
            {data ?
                <div className='p-2 flex flex-col ' >
                    <ProfileImageSection></ProfileImageSection>
                    <br></br>
                    <ProfileSection2 userName={data.userData.name}
                        title={data.userData.title}
                        email={data.userSocialData.email} />
                    <br></br>
                    <Status>{data.userData.status}</Status>
                    <Discription>{data.userData.discription}</Discription>
                    <Skills>{data.userData.skills}</Skills>
                    <Education>{data.userData.education} </Education>
                    <Experiance>{data.userData.experiance}</Experiance>
                    <hr className='border-green-800'></hr>
                    <SocialMedia email={data.userSocialData.email} />
                </div>
                : <h3>No User Data To Show</h3>}


        </>
    );
}


export { UserProfile };