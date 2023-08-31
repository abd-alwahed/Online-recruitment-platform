
import React, { useState, useEffect, use, useRef, useContext } from 'react'
import ProfileHeader from '../../../components/ProfileHeader'
import EducationCard from '../../../components/EducationCard'
import ExperienceCard from '../../../components/ExperienceCard'
import SkillsCard from '../../../components/SkillsCard'
import LanguagesCard from '../../../components/LanguagesCard'
import { axios } from "../../../utils/axios";
import { useRouter } from 'next/router'
import { responseParser } from '../../../utils/helper'
import { BASE_SERVEFR_URL } from '../../../utils/constant'
import { AuthContext } from '../../../contexts/AuthContext'
const index = () => {
  const router = useRouter();
  const id = +router.query.id

  const auth = useContext(AuthContext);
  const userid = auth?.user?.profileDetail?.id

  const companyid = auth?.user?.company?.id
  const iscom = auth.isCompany
  const [user, setUser] = useState();
  const [email, setemail] = useState();
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await axios(`/profile-details/${id}?populate=educations,experiences,languages,workingCities,militaryService,jobLevel,profileImage ,user`);
        setemail(response.data.email)
        setUser(response.data);

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, [id, refetch]);
  console.log(user)

  const handleGeneratePdf = () => {
    router.push(`/print/${id}`)


  };

  const profileInfo = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    age: user?.birthDate,
    nationality: user?.nationality,
    gender: user?.gender,
    militaryStatus: user?.militaryService?.name,
    workCite: user?.workingCities,
    jobLevel: user?.jobLevel?.details,
    currentJobStatus: user?.currentJobStatus,
    experienceYears: user?.yearsOfExperience,
    phone: user?.phone,
    email: user?.user.email,
    education: user?.educations,
    experience: user?.experiences,
    skills: user?.Skills,
    languages: user?.languages,
    img: user?.profileImage?.url ? BASE_SERVEFR_URL + user?.profileImage?.url : undefined
  }

  return (
    <div className='px-2 py-2' id="printable-content">

      <div className='flex flex-col gap-5'>
        <button className=" bg-slate-500 text-white" onClick={handleGeneratePdf}>
          Convert Profile to Pdf
        </button>


        <ProfileHeader edit={!iscom && id === userid} Fname={profileInfo.firstName} Lname={profileInfo.lastName}
          age={profileInfo.age} nationality={profileInfo.nationality}
          gender={profileInfo.gender} militaryStatus={profileInfo.militaryStatus}
          workCite={profileInfo.workCite} jobLevel={profileInfo.jobLevel}
          experience={profileInfo.experienceYears} phone={profileInfo.phone} email={profileInfo.email} img={profileInfo.img}
        />
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row  gap-5 items-baseline justify-center '>
            <EducationCard onDelete={() => setRefetch(p => !p)} edit={!iscom && id === userid} education={profileInfo?.education} />
            <SkillsCard edit={!iscom && id === userid} skills={profileInfo?.skills} />
          </div>

          <div className='flex flex-row items-baseline gap-5 justify-center'>
            <ExperienceCard onDelete={() => setRefetch(p => !p)} edit={!iscom && id === userid} experience={profileInfo?.experience} />
            <LanguagesCard onDelete={() => setRefetch(p => !p)} edit={!iscom && id === userid} languages={profileInfo?.languages} />
          </div>

        </div>
      </div>
    </div >
  )
}

export default index