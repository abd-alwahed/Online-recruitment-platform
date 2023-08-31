import React from 'react'
import Link from 'next/link'
const JobEditCard = ({id,title,numOfCandidates}) => {
  return (
    <div>
          <div className=' border-b-2 border-b-gray-300 flex flex-row gap-2 items-center max-w-sm border-gray-300 border-[3px] p-4 border-l-primary  border-l-[6px]  shadow-xl  rounded-md'>
            <div>
                <div className='flex flex-row justify-between items-center  '>
                    <h2 className='text-primary  text-xl  font-bold  pb-2'>{title}</h2>
                    <p className='text-gray-400 text-xs'> {numOfCandidates} Candidates</p>
                </div>
                
                <div className='flex flex-row gap-5 pt-3 '>
                    <Link href={`/Edit`}>
                        <button className=' bg-primary transition duration-300  hover:translate-y-1 text-white rounded-md px-4 py-1'> Edit Job</button>
                    </Link>
                    <Link href={`/Candidates`}>
                        <button className=' bg-primary transition duration-300  hover:translate-y-1 text-white rounded-md px-4 py-1'> Candidates</button>
                    </Link>
                    <button className=' bg-red-600 transition duration-300  hover:translate-y-1 text-white rounded-md px-4 py-1'> Delete</button>
                </div>
            </div>
          </div>
    </div>
  )
}

export default JobEditCard