import React from 'react'
import { useState, useEffect } from 'react';

import HeroSearchInput from '../../components/HeroSearchInput';
import Link from 'next/link';
import SliderCard from '../../components/SliderCard';
import { BASE_SERVEFR_URL } from '../../utils/constant';
import { axios } from '../../utils/axios';
const index = () => {

  const [Companies, setCompanies] = useState([]);
  const [search, setsearch] = useState('');
  const handleSearch = (e) => {
    setsearch(e.target.value);
    console.log(search);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {

      try {
        const { data: response } = await axios(`/companies?populate[0]=profileImg&filters[name][$contains]=${search}`);
        setCompanies((response) as any)

      } catch (error) {

        console.error(error);
      }
    };

    fetchDataAsync();
  }, [search]);
  console.log(Companies)
  return (
    <div className=' px-10  justify-center felx flex-col  items-center'>
      <div className=' px-28'>
        <HeroSearchInput onChange={handleSearch} />
      </div>
      <div className=' py-5 flex flex-row items-center gap-5 flex-wrap justify-center'>
        {
          Companies.map((slide) => {
            return (
              <Link href={`company/${slide.id}`}>
                <div
                  className="block max-w-[15rem] rounded-lg text-secondary transition duration-300 bg-primary hover:text-primary hover:bg-secondary hover:border-primary border shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      className="rounded-t-lg w-40 h-40 "
                      src={BASE_SERVEFR_URL + slide?.profileImg?.url}
                      alt="" />
                  </div>
                  <div className="p-6">
                    <p className="text-base text-center    ">
                      {slide.name}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default index