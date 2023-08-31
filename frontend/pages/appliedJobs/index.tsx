import React, { useContext, useEffect, useState } from 'react'
import AppliedJobCard from '../../components/AppliedJobCard'
import { AuthContext } from '../../contexts/AuthContext';
import { axios } from '../../utils/axios';
import { BASE_SERVEFR_URL } from '../../utils/constant';


const index = () => {
  const auth = useContext(AuthContext);
  console.log(auth)
  const idUser = auth.user.profileDetail.id
  const appliedJobs = [{
    jobTitle: "Angular Developer",
    companyName: "codzecc"
  },
  {
    jobTitle: "Angular Developer",
    companyName: "codzeccc"
  },
  {
    jobTitle: "Angular Developer",
    companyName: "codzeccc"
  },
  {
    jobTitle: "Angular Developer",
    companyName: "codzeccc"
  },

  ]
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {

      try {
        const { data: response } = await axios(`/job-requests?populate=job,job.company,job.company.profileImg,profileDetail&filters[profileDetail][id][$eq]=${idUser}`);

        setjobs(response)

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync()
  }, []);
  console.log({ jobs })



  return (
    <div className='border-b-2 m-auto border-b-gray-300 items-center max-w-xl border-gray-300 border-[3px] p-4 border-l-primary  border-l-[6px]  shadow-xl  rounded-md'>
      <h2 className='text-primary px-3 text-2xl border-b-2 pb-2 border-gray-300  font-bold    '>Applied Jobs</h2>
      <div className=' py-3 w-full flex flex-col items-center gap-5 justify-center'>
        {
          jobs?.length > 0 && jobs.map((e) => {
            return (
              <AppliedJobCard status={e?.status} jobTitle={e?.job?.jobTitle} companyName={e?.job?.company?.name} img={BASE_SERVEFR_URL + e?.job?.company?.profileImg?.url} id={e?.job?.id} />
            )

          })
        }
      </div>

    </div>
  )
}

export default index