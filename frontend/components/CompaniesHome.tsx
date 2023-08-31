import React, { useEffect, useState } from "react";


import SliderHome from "../components/SliderHome";
import SliderCard from "../components/SliderCard";
import { SwiperSlide } from "swiper/react";
import { axios } from "../utils/axios";
import { BASE_SERVEFR_URL } from "../utils/constant";
import { responseParser } from "../utils/helper";
import Link from "next/link";



const CompaniesHome = () => {
  const [Companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {

      try {
        const { data: response } = await axios(`/companies?populate[0]=profileImg`);
        console.log({ companies: response });



        setCompanies((response) as any)

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);

  console.log({ Companies });

  return (
    <div className=" py-10  bg-white">
      <div className="mx-auto container">
        <h2 className=" text-2xl  lg:text-3xl  mb-10 text-center">
          Join To Top Companies
        </h2>

        <SliderHome
          autoplay={true}
          infinite={true}
          numberOfActiveItems={4}
          showIndicators={false}
          height="50vh"
          breakpoints={{
            1: { width: 414, slidesPerView: 1 },
            2: { width: 1200, slidesPerView: 3 },
            3: { width: 1920, slidesPerView: 5 },
          }}
        >
          {Companies.length > 0 && Companies.map((slide, index) => (
            <SwiperSlide key={index}>
              <div>
                <Link href={`company/${slide.id}`}>
                  <SliderCard title={slide.name} imgurl={BASE_SERVEFR_URL + "" + slide?.profileImg?.url} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </SliderHome>
      </div>
    </div>
  );
};

export default CompaniesHome;
