import React, { useState } from "react";
import heroPhoto from "../assets/hero.jpg";
import Image from "next/image";
import HeroSearchInput from "./HeroSearchInput";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter()
  const [search, setsearch] = useState();
  const handleSearch = (e) => {
    setsearch(e.target.value);
  };
  const handleSubmit = (e) => {
    router.push(`allJobs?title=${search}`)
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt="Party"
              src={heroPhoto}
              fill
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Find the Best Job
            </h2>

            <p className="mt-4 text-gray-600">
              Searching for vacancies & career opportunities? helps you in
              your job search
            </p>

            <HeroSearchInput onChange={handleSearch} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
