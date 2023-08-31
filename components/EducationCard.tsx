import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { axios } from '../utils/axios'
import { toast } from 'react-toastify'
const EducationCard = ({ education, edit, onDelete }) => {
    const handleDelete = async (id) => {
        await axios.delete('/education-levels/'+id);
        toast.success('deleted');
        onDelete()
    }
    return (
        <div className=' px-5 w-[100%]  py-4  border-gray-300 border-[3px]  shadow-2xl  rounded-md border-l-primary  border-l-[6px] max-w-[680px] bg-secondary items-center'>
            <div className='flex flex-row items-center  gap-1 '>
                <FontAwesomeIcon className='text-primary text-xl' icon={faGraduationCap} />
                <h2 className='text-primary px-3 text-xl  font-bold    '>Education</h2>
                {edit ? <button className='bg-primary  hover:bg-secondary  text-secondary hover:border-primary  hover:border-2 hover:text-primary transition duration-300  Hover:text-primary rounded-md px-4 py2'><Link href="/employee/education/add?edit=1"> Add</Link></button> : ""}
            </div>
            <ul >
                {
                    education?.map((e) => {
                        return (
                            <li className='pt-5'>
                                <ul className='text-sm border-b-2 border-b-gray-300'>
                                    <li className='pb-2 font-bold text-base'>{e.degree}</li>
                                    <li className='pb-2 text-black font-[500]' > {e.department} <span className='text-primary'>At</span> {e.university}</li>
                                    <li className='pb-2 font-bold text-primary'>Start Date: <span className='text-black font-[500]'>{e.startDate}</span>  </li>
                                    <li className='pb-2 font-bold text-primary'>End Date: <span className='text-black font-[500]'> {e?.endDate || 'Working Now'} </span></li>
                                </ul>
                                {edit ? <button onClick={()=>handleDelete(e.id)}
                                className='bg-red-600 mt-2  inline hover:bg-secondary 
                                 text-secondary hover:border-red-600  hover:border-2 hover:text-red-600 
                                 transition duration-300  Hover:text-red-600 rounded-md px-4 py2'>Delete</button> : ""}


                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default EducationCard