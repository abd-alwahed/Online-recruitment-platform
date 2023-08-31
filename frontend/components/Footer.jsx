import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-gray-200">
      <div className="xl:mx-52 mx-auto flex justify-center  space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div >
          <div className="mx-20 flex flex-col lg:flex-row    justify-between  gap-16  items-center ">
            <div className="text-primary">
            <img className="w-28 h-28" src='https://i.ibb.co/xY9CStK/logo.png' alt="not found" />
            </div>

            <p className="mt-4 max-w-xs text-gray-500">
              Welcome to our website, where you can explore a world of opportunities and connect with companies that are looking for talented individuals like you. We are dedicated to helping you find your dream job and providing businesses with access to a pool of qualified candidates.
            </p>
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
