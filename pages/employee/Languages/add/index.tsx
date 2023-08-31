"use client";

import Input from "../../../../components/Input";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "../../../../components/Select";
import { useState } from "react";
import RadioGroup from "../../../../components/RadioGroup";
import TextArea from "../../../../components/TextArea";
import ImageUploader from "../../../../components/ImageUploader";
import DateInput from "../../../../components/DateInput";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { axios } from "../../../../utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
function Index() {
  const { user } = useAuthContext();
  const router = useRouter();
  const inputstyle =
    "pl-1  text-[0.5rem] md:text-xs lg:text-sm xl:text-md border-[hsl(0,0%,80%)] border-b  min-h-[34px]";
  const lableStyle =
    "font-dosis   text-[0.5rem] md:text-xs lg:text-sm xl:text-md font-medium  ";
  const selectStyle =
    "text-gray-700 font-dosis  text-[0.5rem] md:text-xs lg:text-sm xl:text-md  font-normal";
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<any>();
    const searchParams = useSearchParams()
    const isEdit = searchParams.get('edit')
    
  const onSubmit: SubmitHandler<any> = async (sub) => {
    const data = {
      name: sub.Language.value,
      rate: sub.rate.value,
      profileDetail: user.profileDetail.id,
    };
    await axios.post("/languages", { data });
    if (isEdit) {  
      toast.success(" Done !!!");
      router.push("/profile/"+user.profileDetail.id);
      return
    }
    toast.success("You Have nearly arrived to the end 4/5 are Done !!!");
    router.push("/employee/skills/add");
  };
  const languages = ["Arabic", "English", "French", "Russian"].map((e) => ({
    value: e,
    label: e,
  }));
  const Levels = [
    { value: "A1", label: "A1" },
    { value: "A2", label: "A2" },
    { value: "B1", label: "B1" },
    { value: "B2", label: "B2" },
    { value: "C1", label: "C1" },
    { value: "C2", label: "C2" },
  ];
  return (
    <div className="bg-gray-200 px-10 text-base    ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-60 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
          <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
            Languages
          </h1>
          <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12"></h2>
          <hr className="mb-5"></hr>

          <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">
            <div className="w-1/2">
              <Controller
                name="Language"
                control={control}
                rules={{
                  required: "Language is required",
                }}
                render={({ field }) => (
                  <Select
                    selectStyle={`${inputstyle} mr-5`}
                    lableStyle={lableStyle}
                    selectProps={{ placeholder: "Language", ...field }}
                    options={languages}
                    label={"Language"}
                    required={true}
                  />
                )}
              />
              {errors.Language && (
                <p className="text-xs mb-3 text-red-700">
                  {`${errors.Language.message}`}
                </p>
              )}
            </div>
            <div className="w-1/2 ">
              <Controller
                name="rate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    selectStyle={`${inputstyle} mr-5`}
                    lableStyle={lableStyle}
                    selectProps={{ placeholder: "rate", ...field }}
                    label={"rate"}
                    required={true}
                    options={Levels}
                  />
                )}
              />
              {errors.rate && (
                <p className="text-xs mb-3 text-red-700">
                  {"rate is required"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className=" flex">
          <button
            className=" bg-stone-500 text-secondary w-60  rounded-md h-10 m-auto  text-center"
            type="submit"
          >
            Continue To Skills
          </button>
        </div>
      </form>
    </div>
  );
}

export default Index;
