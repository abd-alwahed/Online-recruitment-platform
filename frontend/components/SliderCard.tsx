import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BASE_SERVEFR_URL } from "../utils/constant";

const SliderCard = ({ imgurl, title }) => {

  return (
    <div className=" max-w-xs  pt-12  pb-8   flex flex-col bg-transparent  gap-10 items-center">
      <img
        height={150}
        width={150}
        className=" w-20 h-20 sm:h-36  sm:w-36 "
        src={imgurl}
        alt="logo-image"
      />
      <h2 className="  text-center  font-bold text-base md:text-xl  lg:text-2xl ">
        {" "}
        {title}{" "}
      </h2>
    </div>
  );
};

export default SliderCard;
