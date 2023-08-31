import Link from "next/link";
import React from "react";

const CategoryCard = ({ title, image, jobsCount, link }) => {
  return (
    <Link href={link} className="xl:w-72 w-full xl:m-3 m-3 ">
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="p-3 h-60 w-full px-3  rounded-md flex justify-between items-end   bg-white hover:shadow-lg cursor-pointer  hover:transition hover:-translate-y-2"
      >
        <div className="bg-white p-1 px-3 rounded-md opacity-70">
          <p className=" text-black   text-lg font-medium">{title}</p>
        </div>

      </div>
    </Link>
  );
};

export default CategoryCard;
