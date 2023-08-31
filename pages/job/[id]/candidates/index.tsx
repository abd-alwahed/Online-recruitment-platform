import React from 'react'


import { useState, useEffect } from 'react'


import { useRouter } from 'next/router'
import { axios } from '../../../../utils/axios';
import ProfileCard from '../../../../components/ProfileCard';
import { BASE_SERVEFR_URL } from '../../../../utils/constant';
const index = () => {

  const [users, setUsers] = useState([]);
    const router = useRouter();
    const id = router.query.id;
  useEffect(() => {
    const fetchDataAsync = async () => {

      try {
        const {data} = await axios.get(`/job-requests?filters[job][id][$eq]=${id}&fields[0]=id&populate=profileDetail,profileDetail.educations,profileDetail.workingCities,profileDetail.profileImage`)
        const response = await axios(`/profile-details?populate=educations,workingCities,profileImage`);

        
        setUsers(data.map(e => e.profileDetail));

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);
  console.log(users)



  return (
    <div>

      <div className=' w-[100%] px-10 pt-5 flex flex-col lg:flex-row items-center gap-4 lg:items-start   '>
        <div className=' flex flex-row flex-wrap gap-3 justify-center'>
          {
            users?.length > 0 && users.map((e) => {
              return (
                <ProfileCard id={e.id} name={e?.firstName + " " + e?.lastName} gender={e.gender} Address={e?.workingCities && e?.workingCities[0]?.name}
                  educationlevel={e.educations && e?.educations?.[0]?.degree} yearsOFExperience={e?.yearsOfExperience} age={e?.age} img={BASE_SERVEFR_URL + e?.profileImage?.url} />
              )
            })
          }
        </div>


      </div>

    </div>
  )
}

export default index