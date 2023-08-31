import React, { useEffect, useState } from "react";
import Photo from "../assets/hero.jpg";
import CategoryCard from "../components/CategoryCard";
import { axios } from "../utils/axios";
import { BASE_SERVEFR_URL } from "../utils/constant";

const data = [
  {
    title: "IT / SoftWear Development",
    link: "/",
    image: Photo,
    jobCount: "23",
  },
  {
    title: "IT / SoftWear Development",
    link: "/",
    image: Photo,
    jobCount: "23",
  },
  {
    title: "IT / SoftWear Development",
    link: "/",
    image: Photo,
    jobCount: "23",
  },
  {
    title: "IT / SoftWear Development",
    link: "/",
    image: Photo,
    jobCount: "23",
  },
];
const Categories = [
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
  {
    title: "IT / development",
    link: "/",
    count: "23",
  },
];

const CategoriesHome = () => {
  const [jobRoles, setjobsRoles] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {

      try {
        const { data: response } = await axios(`/job-roles?populate[0]=image`);
        console.log(response);



        setjobsRoles((response))

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);
  console.log(jobRoles)
  return (
    <div className="py-10 mx-auto container ">
      <h2 className=" text-2xl  lg:text-3xl  mb-10 text-center">
        Browse Jobs by Category
      </h2>
      <div className="flex flex-wrap gap-10 justify-center">
        {jobRoles.map((item, idx) => (
          <CategoryCard
            image={BASE_SERVEFR_URL + item?.image.url}
            link={`allJobs?category=${item?.id}`}
            key={idx}
            title={item?.details}
          />
        ))}
      </div>

    </div>
  );
};

export default CategoriesHome;
