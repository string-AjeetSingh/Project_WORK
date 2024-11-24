import { useEffect, useRef, useState } from 'react';
import { ProfileImageSection, 
    ProfileSection2, Status 
, Skills, Discription, SocialMedia} from './subComponents';






function UserProfile({ children }) {


    return (
        <>
            <div className='p-2 ' >
               <ProfileImageSection></ProfileImageSection>
               <br></br>
               <ProfileSection2></ProfileSection2>
               <br></br>
               <Status></Status>
               <Discription></Discription>
               <Skills></Skills>
               <hr className='border-green-800'></hr>
               <SocialMedia></SocialMedia>
            </div>
         
        </>
    );
}


export { UserProfile };