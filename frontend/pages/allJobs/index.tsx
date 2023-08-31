import React from 'react'
import CompaniesHome from '../../components/CompaniesHome'
import { useState, useEffect } from 'react';
import HeroSearchInput from '../../components/HeroSearchInput'

import { responseParser } from '../../lib/helper';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import { BASE_SERVEFR_URL } from '../../utils/constant';
import JobsCardHome from '../../components/JobsCardHome';
import { axios } from '../../utils/axios';
function generateAPIUrl(category, location, search) {
    const params = new URLSearchParams({
        "populate[company][populate][profileImg][fields][0]": "url",
        "populate[company][fields][0]": "id",
        "populate[company][fields][1]": "name",
        "populate[jobRoles][fields][0]": "details",
        "populate[jobLevel][fields][0]": "details",
        "fields[0]": "yearOfExperience",
        "fields[1]": "address",
        "fields[2]": "jobType",
        "fields[3]": "jobTitle"
    });

    if (category) params.append("filters[jobRoles][id][$eq]", category);
    if (location) params.append("filters[city][id][$eq]", location);
    if (search) params.append("filters[jobTitle][$contains]", search);

    return `jobs?${params.toString()}`;
}
const index = () => {
    const [search, setsearch] = useState();
    const searchParams = useSearchParams()
    const router = useRouter()
    const category = searchParams?.get('category')
    const title = searchParams?.get('title')
    const city = searchParams?.get('city')

    console.log(category, title, city)
    const handleSearch = (e) => {
        setsearch(e.target.value);
        console.log(search);
    };
    const handleSubmit = (e) => {
        router.push(`allJobs?title=${search}`)
    };

    const [jobs, setjobs] = useState([]);

    useEffect(() => {

        const api = generateAPIUrl(category, city, title)
        console.log(api)
        const fetchDataAsync = async () => {

            try {
                const { data: response } = await axios(api)


                setjobs(response)


            } catch (error) {

                console.error(error);
            }
        };

        fetchDataAsync();
    }, [category, city, title]);
    console.log(jobs, 'dsa')

    return (
        <div className=' felx flex-col justify-center items-center'>
            <div className=' px-28'>
                <HeroSearchInput onChange={handleSearch} onSubmit={handleSubmit} />
            </div>

            <CompaniesHome />

            <div className="py-10 bg-slate-200 ">

                <div className="w-full xl:px-36 px-5 flex flex-wrap justify-center">
                    {jobs.length > 0 && jobs.map((item, idx) => (
                        <JobsCardHome
                            link={`job/${item?.id}`}
                            code={item?.id}
                            experience={item?.yearOfExperience}
                            image={BASE_SERVEFR_URL + item?.company?.profileImg?.url}
                            level={item?.jobLevel?.details}
                            location={item?.address}
                            role={item?.jobRoles[0].details}
                            title={item?.jobTitle}
                            type={item?.jobType}
                            key={idx}
                            company={item?.company?.name}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default index