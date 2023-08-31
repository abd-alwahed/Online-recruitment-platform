import React, { useEffect, useState } from "react";
import Logo1 from "../assets/companiesLogos/1.png";
import JobsCardHome from "./JobsCardHome";
import { axios } from "../utils/axios";
import { responseParser } from "../utils/helper";
import { BASE_SERVEFR_URL } from "../utils/constant";
import Link from "next/link";



const data = [
  {
    title: "Software developer",
    image: Logo1,
    code: "5887",
    date: "12",
    role: "IT",
    level: "junior",
    type: "part time",
    experience: "2",
    location: "Aleppo",
    company: "source code",
    link: "/",
  },
  {
    title: "Software developer",
    image: Logo1,
    code: "5887",
    date: "12",
    role: "IT",
    level: "junior",
    type: "part time",
    experience: "2",
    location: "Aleppo",
    company: "source code",
    link: "/",
  },
  {
    title: "Software developer",
    image: Logo1,
    code: "5887",
    date: "12",
    role: "IT",
    level: "junior",
    type: "part time",
    experience: "2",
    location: "Aleppo",
    company: "source code",
    link: "/",
  },
  {
    title: "Software developer",
    image: Logo1,
    code: "5887",
    date: "12",
    role: "IT",
    level: "junior",
    type: "part time",
    experience: "2",
    location: "Aleppo",
    company: "source code",
    link: "/",
  },
  {
    title: "Software developer",
    image: Logo1,
    code: "5887",
    date: "12",
    role: "IT",
    level: "junior",
    type: "part time",
    experience: "2",
    location: "Aleppo",
    company: "source code",
    link: "/",
  },
  {
    title: "Software developer",
    image: Logo1,
    code: "5887",
    date: "12",
    role: "IT",
    level: "junior",
    type: "part time",
    experience: "2",
    location: "Aleppo",
    company: "source code",
    link: "/",
  },
  {
    title: "Software developer",
    image: Logo1,
    code: "5887",
    date: "12",
    role: "IT",
    level: "junior",
    type: "part time",
    experience: "2",
    location: "Aleppo",
    company: "source code",
    link: "/",
  },
  {
    title: "Software developer",
    image: Logo1,
    code: "5887",
    date: "12",
    role: "IT",
    level: "junior",
    type: "part time",
    experience: "2",
    location: "Aleppo",
    company: "source code",
    link: "/",
  },
];

const JobsHome = () => {
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {

      try {
        const { data: response } = await axios(`/jobs?populate[company][populate][profileImg][fields][0]=url&populate[company][fields][0]=id&populate[company][fields][1]=name&populate[jobRoles][fields][0]=details&populate[jobLevel][fields][0]=details&fields[0]=yearOfExperience&fields[1]=address&fields[2]=jobType&fields[3]=jobTitle`);



        setjobs(response)

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);
  console.log(jobs + "DSad")
  return (
    <div className="py-10 bg-slate-200 ">
      <div className=" ">
        <h2 className=" text-2xl pt-5 lg:text-3xl  mb-10 text-center">
          Recent Jobs
        </h2>
        <p className="my-5 text-gray-600 text-center text-lg font-medium">
          Checkout Our Latest Open Jobs.
        </p>
      </div>
      <div className="w-full xl:px-36 px-5 flex flex-wrap justify-center">
        {jobs.map((item, idx) => (
          <JobsCardHome
            link={`job/${item?.id}`}
            code={item?.id}
            experience={item?.yearOfExperience}
            image={BASE_SERVEFR_URL + "" + item?.company?.profileImg?.url}
            level={item?.age}
            location={item?.address}
            role={item?.jobRoles[0].details}
            title={item?.jobTitle}
            type={item?.jobType}
            key={idx}
            company={item?.company?.name}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Link href={`allJobs`}
          className="inline-block rounded  px-10 py-3 my-7  font-medium 
         transition hover:scale-110 hover:shadow-xl focus:outline-none text-white text-2xl focus:ring bg-primary"
        >
          See All Jobs
        </Link>
      </div>
    </div>
  );
};

export default JobsHome;
