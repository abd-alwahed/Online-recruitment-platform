import React from 'react'

const JobRequirements = ({JobRequirements}) => {
  return (
    <div>
        <div className=' py-4  border-gray-300 border-[3px]  shadow-2xl  rounded-md border-l-primary  border-l-[6px] max-w-lg bg-secondary items-center'>
            <h2 className='text-primary px-3 text-xl  font-bold border-gray-300 border-b-2 pb-2  '>Job Requirements</h2>
            <div className='p-5 m-5 rounded-md bg-gray-200'>
                <p>
                      {JobRequirements}
                </p>
            </div>
        </div>
    </div>
  )
}

export default JobRequirements