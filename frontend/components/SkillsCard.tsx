import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
const SkillsCard = ({ skills, edit }) => {
    return (
        <div className=' px-5 w-[100%]  py-4  border-gray-300 border-[3px]  shadow-2xl  rounded-md border-l-primary  border-l-[6px] max-w-[300px] bg-secondary items-center'>
            <div className='flex flex-row items-center  gap-1'>
                <FontAwesomeIcon className='text-primary text-xl' icon={faCodeBranch} />
                <h2 className='text-primary px-3 text-xl  font-bold  pb-2  '>Skills</h2>
                {edit ? <button className='bg-primary  hover:bg-secondary  text-secondary hover:border-primary  hover:border-2 hover:text-primary transition duration-300  Hover:text-primary rounded-md px-4 py2'><Link href="/employee/skills/edit"> Edit</Link></button> : ""}

            </div>
            <ul className='  mx-10 flex flex-row flex-wrap gap-2'>
                {`${skills}`}
            </ul>
        </div>
    )
}

export default SkillsCard