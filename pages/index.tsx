import React from "react";
import NavBar from "../components/navbar/index";
import Hero from "../components/Hero";
import CompaniesHome from "../components/CompaniesHome";
import JobsHome from "../components/JobsHome";
import CategoriesHome from "../components/CategoriesHome";
import LocationHome from "../components/LocationHome";
import Footer from "../components/Footer";
import { useAuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

const HomePage = () => {
  const {user, isCompany} = useAuthContext();
  return (
    <div>
      <Hero />
      <CompaniesHome />
      <JobsHome />
      <CategoriesHome />
      <LocationHome />
      
    </div>
  );
};

export default HomePage;
