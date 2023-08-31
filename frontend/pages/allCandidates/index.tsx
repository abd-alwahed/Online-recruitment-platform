import React from 'react'
import ProfileCard from '../../components/ProfileCard'
import FilterCandidates from '../../components/FilterCandidates'
import { useState, useEffect } from 'react'
import { axios } from '../../utils/axios'
import { BASE_SERVEFR_URL } from '../../utils/constant'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
const index = () => {
  const s = useSearchParams();
  
  
  const [users, setUsers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchDataAsync = async () => {
      const url = new URL('http://localhost:3000'+router.asPath);
      
      const params = {
        age: url.searchParams.get('age'),
        cities: url.searchParams.get('cities'),
        experience: url.searchParams.get('experience'),
        genders: url.searchParams.get('genders'),
        jobRoles: url.searchParams.get('jobRoles'),
        jobLevels: url.searchParams.get('jobLevels'),
        militaryStatus: url.searchParams.get('militaryStatus')
    };
    
    // Convert undefined values to null
    for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] === undefined) {
            params[key] = '';
        }
    }
      let pa = "&";
      if (params?.age) {
        pa += "filters[age][$gte]="+params?.age;
        pa += '&';
      }
      if (params?.experience) {
        pa += "filters[yearsOfExperience][$gte]="+params?.experience;
        pa += '&';
      }
      if (params?.cities) {
        pa += params?.cities.split(',').map((e, id) => `filters[workingCities][id][$in][${id}]=${e}`).join('&')
        pa += '&';
      }
      if (params?.genders) {
        pa += params?.genders.split(',').map((e, id) => `filters[gender][$in][${id}]=${e}`).join('&')
        pa += '&';
      }

      if (params?.jobRoles) {
        pa += params?.jobRoles.split(',').map((e, id) => `filters[jobRoles][id][$in][${id}]=${e}`).join('&')
        pa += '&';
      }
      if (params?.jobLevels) {
        pa += params?.jobLevels.split(',').map((e, id) => `filters[jobLevel][id][$in][${id}]=${e}`).join('&')
        pa += '&';
      }
      if (params?.militaryStatus) {
        pa += params?.militaryStatus.split(',').map((e, id) => `filters[militaryService][id][$in][${id}]=${e}`).join('&')
        pa += '&';
      }
      
      try {
        const response = await axios(`/profile-details?populate=educations,workingCities,profileImage,jobLevel,jobRoles,militaryService${pa}`);
        setUsers(response.data as any);
      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, [router]);
  console.log(users)



  return (
    <div>

      <div className=' w-[100%] px-10 pt-5 flex flex-col lg:flex-row items-center gap-4 lg:items-start   '>

        <FilterCandidates />
        <div className=' flex flex-row flex-wrap gap-3 justify-center'>
          {
            users?.length > 0 && users.map((e) => {
              return (
                <ProfileCard id={e.id} name={e?.firstName + " " + e?.lastName} gender={e.gender} Address={e?.workingCities && e?.workingCities[0]?.name}
                  educationlevel={e.educations && e?.educations?.[0]?.degree} yearsOFExperience={e?.yearsOfExperience} age={e?.birthDate} img={BASE_SERVEFR_URL + e?.profileImage.url} />
              )
            })
          }
        </div>


      </div>

    </div>
  )
}

export default index