import React, { useEffect, useState } from "react";
import Photo from "../assets/hero.jpg";
import CategoryCard from "../components/CategoryCard";
import CategoryLink from "./CategoryLink";
import { axios } from "../utils/axios";
import { BASE_SERVEFR_URL } from "../utils/constant";

const location = [
  {
    title: "Aleppo",
    link: "/",
    count: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    count: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    count: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    count: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    count: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    count: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    count: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    count: "23",
  },
];
const data = [
  {
    title: "Aleppo",
    link: "/",
    image: Photo,
    jobCount: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    image: Photo,
    jobCount: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    image: Photo,
    jobCount: "23",
  },
  {
    title: "Aleppo",
    link: "/",
    image: Photo,
    jobCount: "23",
  },
];

const LocationHome = () => {
  const [cities, setcities] = useState([]);
  const id = undefined
  useEffect(() => {
    const fetchDataAsync = async () => {

      try {
        const { data: response } = await axios(`/cities?populate[0]=photo`);
        console.log(response);



        setcities((response))

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);
  console.log(cities)
  return (
    <div className="bg-slate-200">
      <div className="py-10 mx-auto  container ">
        <h2 className=" text-2xl  lg:text-3xl  mb-10 text-center">
          Browse Jobs by Location
        </h2>
        <div className="flex flex-wrap w-full justify-center">
          {cities.map((item, idx) => (
            <CategoryCard
              image={BASE_SERVEFR_URL + item?.photo.url}
              link={`allJobs?city=${item?.id}`}

              key={idx}
              title={item.name}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LocationHome;
