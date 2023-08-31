import React from 'react'

const JobDetailsCard = ({ id, gender, jobRole, age, carerrLevel, education, jobType, experience, salary }) => {
    return (
        <div>
            <div className=' py-4  border-gray-300 border-[3px]  shadow-2xl  rounded-md border-l-primary   border-l-[6px] max-w-lg bg-secondary items-center '>
                <h2 className='text-primary px-3 text-xl  font-bold border-gray-300 border-b-2 pb-2 '>Job Details</h2>
                <div className='flex flex-col gap-5 p-5 m-5  '>
                    <div className=' py-4 border-b-2 border-gray-300 flex flex-row gap-5 px-3'>
                        <p className='text-primary font-bold'>Gender:</p>
                        <p >{gender}</p>
                        <p className='text-primary font-bold'>job role:</p>
                        <p> {jobRole?.map((e) => e.details)}</p>
                    </div>
                    <div className=' py-4 border-b-2 border-gray-300 flex flex-row gap-5  px-3 '>
                        <p className='text-primary font-bold'>Age:</p>
                        <p > {age}</p>
                        <p className='text-primary font-bold'>Career Level:</p>
                        <p> {carerrLevel}</p>
                    </div>

                    <div className=' py-4 border-b-2 border-gray-300 flex flex-row gap-5 px-3'>
                        <p className='text-primary font-bold'>Experience:</p>
                        <p > {experience}</p>
                        <p className='text-primary font-bold'>Salary:</p>
                        <p> {salary}</p>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default JobDetailsCard