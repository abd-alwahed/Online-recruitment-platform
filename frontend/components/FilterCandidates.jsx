import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "../components/Select";
import { axios } from "../utils/axios";
import Input from "./Input";
const FilterCandidates = () => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = (data) => {
    let url = "";
    if (data?.Age) {
      url += "age=" + data?.Age + "&";
    }
    if (data?.City) {
      url += "cities=" + data?.City?.map((e) => e.value).join(",");
      url += "&";
    }
    if (data?.Experience) {
      url += "experience=" + data?.Experience;
      url += "&";
    }
    if (data?.Gender) {
      url += "genders=" + data?.Gender?.map((e) => e.value).join(",");
      url += "&";
    }
    if (data?.JobRole) {
      url += "jobRoles=" + data?.JobRole?.map((e) => e.value).join(",");
      url += "&";
    }
    if (data?.jobLevels) {
      url += "jobLevels=" + data?.jobLevels?.map((e) => e.value).join(",");
      url += "&";
    }
    if (data?.militaryStatus) {
      url +=
        "militaryStatus=" + data?.militaryStatus?.map((e) => e.value).join(",");
      url += "&";
    }
    if (url.endsWith("&")) {
      url = url.slice(0, -1);
    }
    router.push("", { search: url });
  };
  const [cities, setCities] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [miltiaryOptions, setMiltiaryOptions] = useState([]);
  const [jobLevels, setJobLevels] = useState([]);

  const genderoptions = ["Male", "Female"].map((e) => ({ value: e, label: e }));
  useEffect(() => {
    const fetchStuff = async () => {
      const { data: citiesResponse } = await axios.get("/cities");
      const { data: industriesResponse } = await axios.get("/job-roles");
      const { data: militaryResponse } = await axios.get("/military-services");
      const { data: jobLevelsResponse } = await axios.get("/job-levels");
      setCities(
        citiesResponse.map((e) => ({
          label: e.name,
          value: e.id,
        }))
      );
      setIndustries(
        industriesResponse.map((e) => ({
          label: e.details,
          value: e.id,
        }))
      );
      setMiltiaryOptions(
        militaryResponse.map((e) => ({
          label: e.name,
          value: e.id,
        }))
      );
      setJobLevels(
        jobLevelsResponse.map((e) => ({
          label: e.details,
          value: e.id,
        }))
      );
    };
    fetchStuff();
  }, []);
  return (
    <div>
      <div className=" w-[900px] max-w-md lg:max-w-sm border-gray-300 border-[3px] p-4 border-l-primary  border-l-[6px]  shadow-xl  rounded-md ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-7">
            <Controller
              name="JobRole"
              control={control}
              render={({ field }) => (
                <Select
                  selectStyle={`${"border-l-primary outline  border-l-[6px] rounded-md"} mr-5`}
                  lableStyle={" text-primary"}
                  selectProps={{ ...field, placeholder: "Job Roles" }}
                  label={"Job Roles"}
                  options={industries}
                  isMulti
                />
              )}
            />
            <Controller
              name="City"
              control={control}
              render={({ field }) => (
                <Select
                  selectStyle={`${"border-l-primary  outline  border-l-[6px] rounded-md"} mr-5`}
                  lableStyle={" text-primary"}
                  selectProps={{ ...field, placeholder: "City" }}
                  label={"City"}
                  options={cities}
                  isMulti
                />
              )}
            />
            <Controller
              name="militaryStatus"
              control={control}
              render={({ field }) => (
                <Select
                  selectStyle={`${"border-l-primary outline   border-l-[6px] rounded-md"} mr-5`}
                  lableStyle={" text-primary"}
                  selectProps={{ ...field, placeholder: "Military Status" }}
                  options={miltiaryOptions}
                  label={"Military Status"}
                  isMulti
                />
              )}
            />
            <Controller
              name="jobLevels"
              control={control}
              render={({ field }) => (
                <Select
                  selectStyle={`${"border-l-primary outline   border-l-[6px] rounded-md"} mr-5`}
                  lableStyle={" text-primary"}
                  selectProps={{ ...field, placeholder: "Job Levels" }}
                  options={jobLevels}
                  label={"Job Levels"}
                  isMulti
                />
              )}
            />
            <Controller
              name="Gender"
              control={control}
              render={({ field }) => (
                <Select
                  selectStyle={`${"border-l-primary outline   border-l-[6px] rounded-md"} mr-5`}
                  lableStyle={" text-primary"}
                  selectProps={{ ...field, placeholder: "Gender" }}
                  options={genderoptions}
                  label={"Gender"}
                  isMulti
                />
              )}
            />

            <Controller
              name="Experience"
              control={control}
              render={({ field }) => (
                <Input
                  inputProps={{
                    ...field,
                    id: "Experience",
                    name: "Experience",
                    type: "number",
                    placeholder: "Experience",
                  }}
                  inputStyle={` border-l-primary outline   border-l-[6px] rounded-md mr-5`}
                  lableStyle={"text-primary"}
                  label={"Experience"}
                />
              )}
            />
            <Controller
              name="Age"
              control={control}
              render={({ field }) => (
                <Input
                  inputProps={{
                    ...field,
                    id: "Age",
                    name: "Age",
                    type: "number",
                    placeholder: "Age",
                  }}
                  inputStyle={`border-l-primary outline   border-l-[6px] rounded-md mr-5`}
                  lableStyle={"text-primary"}
                  label={"Age"}
                />
              )}
            />
            <button
              className=" bg-primary text-secondary w-40 hover:bg-white hover:border-primary hover:border-2 hover:text-primary transition duration-300  rounded-md h-10 m-auto  text-center"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterCandidates;
