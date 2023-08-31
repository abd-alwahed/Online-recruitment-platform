import React, { useContext, useState } from "react";
import Logo from "../Logo";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { removeToken } from "../../utils/localStorageHelper";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const handleLogOut = () => {
    removeToken()
    router.push("/log-in");

  }
  const linksCompany = [
    {
      title: " Profile Company & Manage Jobs ",
      link: `/company/${auth?.user?.company?.id}`,
    },
    {
      title: "Add New Job",
      link: "/job/create",
    },
    {
      title: "All Employee",
      link: "/allCandidates",
    },

  ];
  const links = [
    {
      title: " jobs ",
      link: `/allJobs`,
    },
    {
      title: "Employee",
      link: "/allCandidates",
    },
    {
      title: "Companies",
      link: "/company",
    },


  ];
  const linksuser = [
    {
      title: "My Profile",
      link: `http://localhost:3000/profile/${auth?.user?.profileDetail?.id}`,
    },
    {
      title: "jobs",
      link: "/allJobs",
    },
    {
      title: "Companies",
      link: "/company",
    },
    {
      title: "applied jobs",
      link: "/appliedJobs",
    },
    {
      title: "Cv Score",
      link: "/cvScore",
    },

  ];
  const [opneMenue, setOpneMenue] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header className=" bg-gray-200">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Logo href={"/"} />
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">

                {auth.isCompany ? linksCompany.map((item, idx) => (
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href={item.link}
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : auth.user?.profileDetail ? linksuser.map((item, idx) => (
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href={item.link}
                    >
                      {item.title}
                    </a>
                  </li>
                )) : links.map((item, idx) => (
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href={item.link}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!auth.user ?
              <div className="sm:flex sm:gap-4">

                <Link
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow"
                  href="log-in"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                    href="/sign-up"
                  >
                    Register
                  </Link>
                </div>

              </div> :
              <div className="sm:flex sm:gap-4">



                <div className="hidden sm:flex">
                  <button
                    onClick={handleLogOut}
                    className="rounded-md  bg-red-400 px-5 py-2.5 text-sm font-medium  text-white"

                  >
                    LogOut
                  </button>
                </div>

              </div>
            }


            <div className="block md:hidden">
              <button
                onClick={() => {
                  setOpneMenue(!opneMenue);
                }}
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ul
          className={`text-center block ${opneMenue ? "w-80 " : "w-0"
            } transition-width duration-500 overflow-hidden absolute top-0  bg-white h-full z-30`}
        >
          <div className="flex mx-5   justify-between items-center m-3">
            <p className="text-base font-semibold">Menu</p>

            <FontAwesomeIcon
              onClick={() => setOpneMenue(false)}
              icon={faClose}
            />
          </div>
          {auth.isCompany ? linksCompany.map((link, id) => (
            <div>
              <li
                key={id}
                className={`transition my-4 text-start block   hover:text-white group delay-150 hover:bg-primary  duration-500 text-sm px-0 pt-2 border-b-2 py-3 text-dark    font-semibold ${activeIdx == id ? "bg-secondary p-10 " : ""
                  }`}
                onClick={() => {
                  setActiveIdx(id);
                }}
              >
                <Link
                  className="p-2 w-full text-gray-800 mb-2"
                  href={link.link}
                >
                  {" "}
                  {link.title}
                </Link>
              </li>
            </div>
          )) : auth.user?.profileDetail ? linksuser.map((link, id) => (
            <div>
              <li
                key={id}
                className={`transition my-4 text-start block   hover:text-white group delay-150 hover:bg-primary  duration-500 text-sm px-0 pt-2 border-b-2 py-3 text-dark    font-semibold ${activeIdx == id ? "bg-secondary p-10 " : ""
                  }`}
                onClick={() => {
                  setActiveIdx(id);
                }}
              >
                <Link
                  className="p-2 w-full text-gray-800 mb-2"
                  href={link.link}
                >
                  {" "}
                  {link.title}
                </Link>
              </li>
            </div>
          )) : links.map((link, id) => (
            <div>
              <li
                key={id}
                className={`transition my-4 text-start block   hover:text-white group delay-150 hover:bg-primary  duration-500 text-sm px-0 pt-2 border-b-2 py-3 text-dark    font-semibold ${activeIdx == id ? "bg-secondary p-10 " : ""
                  }`}
                onClick={() => {
                  setActiveIdx(id);
                }}
              >
                <Link
                  className="p-2 w-full text-gray-800 mb-2"
                  href={link.link}
                >
                  {" "}
                  {link.title}
                </Link>
              </li>
            </div>
          ))}
          {!auth.user ? <div className="flex flex-col gap-5">

            <Link
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
              href="/"
            >
              Register As Employee
            </Link>
            <Link
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
              href="/"
            >
              Register As Company
            </Link>
          </div> : <div className="flex flex-col gap-5">

            <button
              onClick={handleLogOut}
              className="rounded-md  bg-red-400 px-5 py-2.5 text-sm font-medium  text-white"

            >
              LogOut
            </button>

          </div>}

        </ul>
      </div>
    </header>
  );
};

export default NavBar;
