import {
  faLocation,
  faLocationDot,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BASE_SERVEFR_URL } from "../utils/constant";

const JobsCardHome = ({
  image,
  title,
  code,
  role,
  level,
  type,
  experience,
  location,
  company,
  link,
}) => {
  console.log(code)
  return (
    <Link href={'http://localhost:3000/' + link} className=" max-w-md w-full">
      <div className=" p-3 rounded-md max-w-md   bg-white hover:shadow-lg cursor-pointer m-5 hover:transition hover:-translate-y-2 ">
        <div className="flex items-center">
          <img
            className="w-20 rounded-full m-3 h-20"
            src={image}
          />
          <div className="p-3">
            <p className="text-primary mb-2 text-2xl">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-white p-1 rounded-md bg-primary text-sm">
                #{code}
              </p>

            </div>
          </div>
        </div>
        <div className="bg-slate-200 mb-10 py-2 px-5">
          <p className="text-base font-semibold">
            Job Roles: <span className="text-gray-500 font-light">{role}</span>
          </p>
          <p className="text-base font-semibold">
            Age: <span className="text-gray-500 font-light">{level}</span>
          </p>

          <p className="text-base font-semibold">
            Job Experience:{" "}
            <span className="text-gray-500 font-light">
              {experience} years{" "}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold">{company}</p>
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-black text-base"
          />
          <p className="text-gray-400 font-light">{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobsCardHome;
