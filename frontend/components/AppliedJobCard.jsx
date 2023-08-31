import React from 'react'

import Male from '../assets/boy.png'
import Link from 'next/link'
const appliedJobCard = ({ jobTitle, companyName, status, img, id }) => {
  return (


    <div className=' border-b-2 border-b-gray-300 flex flex-row gap-2 items-center max-w-sm border-gray-300 border-[3px] p-4 border-l-primary  border-l-[6px]  shadow-xl  rounded-md'>
      <Link href={`job/${id}`}>
        <div className='flex flex-row gap-2' >
          <img className=' w-20 h-20' width={70} height={70} src={img ? img : Male} />
          <div className='flex flex-col  '>
            <h3 className='text-primary text-2xl'>{jobTitle}</h3>
            <h3 className=' text-gray-600 text-sm'>{status}</h3>
            <h2 className=' text-base text-sky-600'>{companyName}</h2>
          </div>
        </div>
      </Link>
    </div>

  )
}

export default appliedJobCard