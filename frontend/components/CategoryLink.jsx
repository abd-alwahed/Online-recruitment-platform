import Link from "next/link";
import React from "react";

const CategoryLink = ({ title, count, link }) => {
  return (
    <Link href={link} className="">
      <div className="flex xl:w-72 w-60 px-3  my-5 justify-between">
        <p className="text-primary hover:text-gray-600 text-xl font-medium">
          {title}
        </p>
        <p className="bg-primary p-1  text-white text-lg font-medium">
          {count}
        </p>
      </div>
    </Link>
  );
};

export default CategoryLink;
