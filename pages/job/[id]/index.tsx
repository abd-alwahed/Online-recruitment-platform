import Link from 'next/link'
import React, { useContext } from 'react'
import JobDetailsCard from '../../../components/JobDetailsCard'
import JobDescriptionCard from '../../../components/JobDescriptionCard'
import JobRequirementsCard from '../../../components/JobRequirementsCard'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { axios } from '../../../utils/axios'
import { AuthContext } from '../../../contexts/AuthContext'
import { toast } from 'react-toastify'

const index = () => {
    const auth = useContext(AuthContext);
    console.log(auth)
    const router = useRouter();
    const userid = auth.user?.id
    const companyid = auth.user?.company?.id
    const [appliedBefore, setAppliedBefore] = useState(false);
    const isComany = auth.isCompany
    const id = router.query.id;
    const [jobDetails, setJobDetails] = useState();
    console.log(id)
    const job = {
        id: jobDetails?.id,
        jobDate: jobDetails?.JobDate,
        jobTitle: jobDetails?.jobTitle,
        gender: jobDetails?.gender,
        jobrole: jobDetails?.jobRoles,
        age: jobDetails?.age,
        carrerLevel: jobDetails?.address,
        education: jobDetails?.education,
        salary: jobDetails?.salary,
        jobType: jobDetails?.jobType,
        experience: jobDetails?.yearOfExperience,
        numberOfCandidates: jobDetails?.numberOfCandidates,
        jobDescription: jobDetails?.jobDescription,
        jobRequirements: jobDetails?.jobRequirements,
        idComapny: jobDetails?.company.id
    }
    const handleDeleteJob = async () => {
        await axios.delete('/jobs/' + jobDetails?.id);
        toast.success('deleted successfully');
        router.push(`/company/${companyid}`);
    }
    const handleApply = async () => {
        const data = {
            job: job.id,
            profileDetail: auth.user.profileDetail.id
        };
        await axios.post('/job-requests', { data });
        toast.success('Applied sucessfully !!')

        setAppliedBefore(true);
    };
    useEffect(() => {
        const fetchDataAsync = async () => {

            try {
                const { data: response } = await axios(`/jobs/${id}?populate=jobRoles,company `);
                console.log({ response });
                if (!auth.isCompany) {
                    const { data } = await axios.get(`/job-requests?filters[profileDetail][id][$eq]=${auth.user.profileDetail.id}&filters[job][id][$eq]=${response.id}&fields[0]=id&populate[profileDetail][fields][0]=id`)

                    if (data.length > 0) {
                        setAppliedBefore(true);
                    }
                }
                else {
                    const { data } = await axios.get(`/job-requests?filters[job][id][$eq]=${response.id}&fields[0]=id&populate[profileDetail][fields][0]=id`)

                    response.numberOfCandidates = data.length;

                }
                setJobDetails(response)

            } catch (error) {

                console.error(error);
            }
        };

        id ? fetchDataAsync() : " "
    }, [id]);

    console.log(jobDetails)


    return (<div>
        <div className='flex flex-row h-36 px-4 bg-primary items-center justify-evenly'>
            <div className='flex flex-col items-center gap-2'>
                <h2 className=' text-white text-3xl'>{job.jobTitle}</h2>

                {companyid === job?.idComapny && isComany ?
                    <div className='  flex flex-row gap-5'>
                        <button onClick={handleDeleteJob} className='bg-red-600 transition duration-300 hover:bg-primary hover:text-red-600 hover:border-red-600 hover:border-2 text-secondary rounded-md px-4 py2'>Delete job</button>

                    </div> : ""
                }
                {!isComany ? <div className=' flex flex-col items-center gap-2'>

                    <button onClick={handleApply} disabled={appliedBefore} className={` bg-secondary  ${!appliedBefore ? "hover:bg-primary  hover:border-secondary  hover:border-2 hover:text-secondary" : ""} transition duration-300  text-primary rounded-md px-4 py2`}>{appliedBefore ? 'Already Applied' : 'Apply'} </button>

                </div> : ""}
            </div>
            {companyid === job?.idComapny && isComany ? <div className=' flex flex-col items-center gap-2'>
                <h2 className='text-5xl text-secondary'>{job.numberOfCandidates}</h2>
                <p className='text-secondary '>Candidates</p>
                <Link href={`${job.id}/candidates`}>
                    <button className=' bg-secondary  hover:bg-primary  hover:border-secondary  hover:border-2 hover:text-secondary transition duration-300  text-primary rounded-md px-4 py2'>See Candidates</button>
                </Link>
            </div> : ""}



        </div>
        <div className=' py-10 flex flex-row justify-center gap-5 flex-wrap '>
            <JobDetailsCard
                id={job.id}
                gender={job.gender}
                jobRole={job.jobrole} age={job.age} carerrLevel={job.carrerLevel}
                education={job.education} jobType={job.jobType}
                salary={job.salary}
                experience={job.experience} />

            <JobDescriptionCard jobRole={job.jobrole} jobDescription={job.jobDescription} />
            <JobRequirementsCard JobRequirements={job.jobRequirements} />

        </div>

    </div>

    )
}

export default index