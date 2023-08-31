import React from 'react'
import Tips from "../../components/Tips"
import { title } from 'process'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useState,useEffect } from 'react';
import { axios } from '../../utils/axios';
import Link from 'next/link';


function index() {
    const auth = useContext(AuthContext);
  console.log(auth)
  const idUser = auth.user.id
  console.log(idUser)
  const [user, setUser] = useState();
  const [email, setemail] = useState();
  useEffect(() => {
    const fetchDataAsync = async () => {
     
      try {
        const response = await axios(`/users/${idUser}?populate=profileDetail,profileDetail.educations,profileDetail.experiences,profileDetail.languages,profileDetail.workingCities,profileDetail.militaryService,profileDetail.jobLevel,profileDetail.profileImage&fields[0]=id&fields[1]=email`);

        console.log(response.data)

        setemail(response.data.email)
        setUser(response.data.profileDetail);

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, [idUser]);
  console.log(user)
  const percent= (user?.experiences?.length>2?20:user?.experiences?.length*10)+(user?.profileImage?20:0)+(user?.Skills?20:0)+(user?.educations?.length>2?20:user?.educations?.length*10)+(user?.languages?.length>2?20:user?.languages?.length*10)

  console.log(percent)
    return (
        <div className=" px-10 text-base flex flex-col justify-center items-center    ">
            <div className=' w-full border-b-2 border-b-gray-300 flex flex-col gap-2 items-center max-w-xl border-gray-300 border-[3px] p-4 border-l-primary  border-l-[6px]  shadow-xl  rounded-md'>
                <h3 className='w-full text-primary  text-xl  font-bold  pb-2 border-b-primary border-b-2'>Your Current CV Score</h3>
                
                <svg className='text-primary max-w-[10rem]' viewBox="0 0 36 36">
                    <path
                    className=' stroke-primary fill-none  stroke-1'
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#444"
                    stroke-width="1"
                    stroke-dasharray={`${percent}, 100`}
                     />
                     
                     <text  x="14.5" y="20" className=' fill-primary' font-size="5" >{percent>100?100:percent}%</text> 
                 </svg>

                
                
            </div>
            <div className='  px-16 w-full items-stretch   flex-col border-b-2 border-b-gray-300 flex gap-2  max-w-xl border-gray-300 border-[3px] p-4 border-l-primary  border-l-[6px]  shadow-xl  rounded-md'>
                <h3 className='w-full block text-primary  text-xl  font-bold  pb-2 border-b-primary border-b-2'>Tips to improve your cv</h3>
                 <Link href={`profile/${user?.id}`}>
                <div className='flex items-center gap-5 py-3 justify-center    bg-gray-200 px-2 rounded-lg flex-row '>
                    <div className='flex flex-col items-center gap-2 justify-center '>
                        <p>add Exprience</p>
                        <p className='text-xs text-gray-400'>please add Exprience</p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>
                        <p>current Score</p>
                        <p> <span className='text-primary'>{user?.experiences?.length}/2</span></p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>

                        <p>Add Score</p>
                        <p> <span className='text-red-500'>+{user?.experiences?.length>2?'20':user?.experiences?.length*10}</span></p>
                    </div>
                </div>
                </Link>
                <Link href={`profile/${user?.id}`}>
                <div className='flex items-center gap-5 py-3 justify-center bg-gray-200 px-2 rounded-lg flex-row '>
                    <div className='flex flex-col items-center gap-2 justify-center '>
                        <p>add Skill</p>
                        <p className='text-xs text-gray-400'>please add Skill</p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>
                        <p>current Score</p>
                        <p> <span className='text-primary'>{user?.Skills?"1":"0"}/1</span></p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>

                        <p>Add Score</p>
                        <p> <span className='text-red-500'>+{user?.Skills?"20":"0"}</span></p>
                    </div>
                </div>
                </Link>
                <Link href={`profile/${user?.id}`}>
                <div className='flex items-center gap-5 py-3 justify-center bg-gray-200 px-2 rounded-lg flex-row '>
                    <div className='flex flex-col items-center gap-2 justify-center '>
                        <p>add Image</p>
                        <p className='text-xs text-gray-400'>please add Image</p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>
                        <p>current Score</p>
                        <p> <span className='text-primary'>{user?.profileImage?"1":"0"}/1</span></p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>

                        <p>Add Score</p>
                        <p> <span className='text-red-500'>{user?.profileImage?"+20":"0"}</span></p>
                    </div>
                </div>
                </Link>
                <Link href={`profile/${user?.id}`}>
                <div className='flex items-center gap-5 py-3 justify-center bg-gray-200 px-2 rounded-lg flex-row '>
                    <div className='flex flex-col items-center gap-2 justify-center '>
                        <p>add Education</p>
                        <p className='text-xs text-gray-400'>please add Education</p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>
                        <p>current Score</p>
                        <p> <span className='text-primary'>{user?.educations?.length}/2</span></p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>

                        <p>Add Score</p>
                        <p> <span className='text-red-500'>+{user?.educations?.length>2?"20":user?.educations?.length*10}</span></p>
                    </div>
                </div>
                </Link>
                <Link href={`profile/${user?.id}`}>
                <div className='flex items-center gap-5 py-3 justify-center bg-gray-200 px-2 rounded-lg flex-row '>
                    <div className='flex flex-col items-center gap-2 justify-center '>
                        <p>add languages</p>
                        <p className='text-xs text-gray-400'>please add languages</p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>
                        <p>current Score</p>
                        <p> <span className='text-primary'>{user?.languages?.length}/2</span></p>
                    </div>
                    <div className='flex flex-col items-center gap-2 justify-center    '>

                        <p>Add Score</p>
                        <p> <span className='text-red-500'>+{user?.languages?.length>2?"20":user?.languages?.length*10}</span></p>
                    </div>
                </div>
                </Link>
                
            </div>
        </div>
    )
}

export default index