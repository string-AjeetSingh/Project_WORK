import { useEffect, useRef, useState } from 'react';
import {
    ProfileImageSection,
    ProfileSection2, Status, Education, Experiance
    , Skills, Discription, SocialMedia
} from './subComponents';

import { requestServer } from '../../MyLib/RequestServer/requestServer';






function UserProfile({ children }) {

    const [data, setdata] = useState(null);

    async function UserDetail(params) {

        const userDetial = new requestServer(process.env.REACT_APP_SERVER_URL + "/xtServer/api/userDetail"
            , { method: 'GET' }
        );

        delete (userDetial.options.body);

        userDetial.setAuthorizedFlag(isAuthenticated);
        let result = await userDetial.requestJson();

        if (result) {
            console.log('the user detail would be : ', result);
            result(result.json.data);
        }
        else {

        }


    }
    useEffect(() => {
        UserDetail().then((data) => {

        });
    }, [])

    return (
        <>
            {data ?
                <div className='p-2 flex flex-col ' >
                    <ProfileImageSection></ProfileImageSection>
                    <br></br>
                    <ProfileSection2></ProfileSection2>
                    <br></br>
                    <Status></Status>
                    <Discription></Discription>
                    <Skills></Skills>
                    <Education></Education>
                    <Experiance></Experiance>
                    <hr className='border-green-800'></hr>
                    <SocialMedia></SocialMedia>
                </div>
                : <h3>No User Data To Show</h3>}


        </>
    );
}


export { UserProfile };