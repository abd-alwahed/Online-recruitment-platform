'use client'

import Input from "../../../components/Input";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from "../../../components/Select";
import { useEffect, useState } from "react";
import RadioGroup from "../../../components/RadioGroup";
import TextArea from "../../../components/TextArea";
import ImageUploader from "../../../components/ImageUploader";
import DateInput from "../../../components/DateInput";
import { responseParser } from "../../../lib/helper"
import { useAuthContext } from "../../../contexts/AuthContext";
import { axios } from "../../../utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
function Index() {
    const { user } = useAuthContext();
    const [cities, setCities] = useState([]);
    const [industries, setIndustries] = useState([]);
    const nationalities = ['Syrian',
        'Palestinian'].map(e => ({ value: e, label: e }))
    const [miltiaryOptions, setMiltiaryOptions] = useState([]);
    const [jobLevels, setJobLevels] = useState([]);

    const genderoptions = [
        'Male',
        'Female'
    ].map(e => ({ value: e, label: e }));
    useEffect(() => {
        const fetchStuff = async () => {
            const { data: citiesResponse } = await axios.get('/cities');
            //const {data: industriesResponse} = await axios.get('/job-roles');
            const { data: militaryResponse } = await axios.get('/military-services')
            const { data: jobLevelsResponse } = await axios.get('/job-levels')
            setCities(citiesResponse.map(e => ({
                label: e.name,
                value: e.id
            })));
            /*  setIndustries(industriesResponse.map(e => ({
                 label:e.details,
                 value: e.id
             }))); */
            setMiltiaryOptions(militaryResponse.map(e => ({
                label: e.name,
                value: e.id
            })))
            setJobLevels(jobLevelsResponse.map(e => ({
                label: e.details,
                value: e.id
            })))
        };
        fetchStuff();
    }, []);

    const inputstyle = "pl-1  text-[0.5rem] md:text-xs lg:text-sm xl:text-md border-[hsl(0,0%,80%)] border-b  min-h-[34px]"
    const lableStyle = "font-dosis   text-[0.5rem] md:text-xs lg:text-sm xl:text-md font-medium  "
    const selectStyle = "text-gray-700 font-dosis  text-[0.5rem] md:text-xs lg:text-sm xl:text-md  font-normal"
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<any>();
    const router = useRouter();
    const onSubmit: SubmitHandler<any> = async (subData) => {
        const fd = new FormData();
        fd.append('files', subData.profileImg)
        const {data :images} = await axios.post('/upload', fd)
        
        const data = {
            yearsOfExperience: subData.ExperienceYears,
            jobLevel: subData.JobLevel.value,
            workingCities: subData.City.map(e => e.value),
            gender: subData.Gender,
            birthDate: subData.BirthDay,
            nationality: subData.Nationality.value,
            militaryService: subData.MilitaryService.value,
            profileImage: images[0]?.id
        };
        await axios.put('/profile-details/' + user.profileDetail.id, { data });
        toast.success('1/5 is Done, GREAT !!!')
        router.push('/employee/education/add');
    };

    return (
        <div className="bg-gray-200 px-10 text-base ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-60 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Basic Info
                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">
                    </h2>
                    <hr className="mb-5"></hr>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="FirstName"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "FirstName",
                                            name: "FirstName",
                                            type: "text",
                                            placeholder: "First Name",
                                            value: user?.profileDetail?.firstName
                                        }}
                                        disable={true}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"First Name"}

                                    />
                                )}
                            />
                            {errors.FirstName && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.FirstName.message}`}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <Controller
                                name="LastName"
                                control={control}

                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "LastName",
                                            name: "LastName",
                                            type: "text",
                                            placeholder: "Last Name",
                                            value: user?.profileDetail?.lastName
                                        }}
                                        disable={true}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Last Name"}

                                    />
                                )}
                            />
                            {errors.LastName && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.LastName.message}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">
                        <div className="w-1/2 ">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "email",
                                            name: "email",
                                            type: "text",
                                            placeholder: "Email",
                                            value: user.email
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Email"}
                                        disable={true}
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.email.message}`}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2 ">
                            <Controller
                                name="City"
                                control={control}
                                rules={{
                                    required: 'city is required',
                                }}

                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "City", ...field }}
                                        isMulti
                                        options={cities}
                                        label={"City"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.City && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"City is required"}
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">
                        <div className="w-1/2 ">
                            <Controller
                                name="Nationality"
                                control={control}
                                rules={{
                                    required: 'Nationality is required',
                                }}

                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Nationality", ...field }}
                                        options={nationalities}
                                        label={"Nationality"}
                                        required={true}
                                    />

                                )}
                            />
                            {errors.Nationality && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Nationality is required"}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2 ">
                            <Controller
                                name="MilitaryService"
                                control={control}
                                rules={{
                                    required: 'Military Service is required',
                                }}

                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Military Service", ...field }}
                                        options={miltiaryOptions}
                                        onChange={(value: string) => field.onChange(value)}
                                        label={"Military Service"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.MilitaryService && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Military Service is required"}
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">

                        <div className="w-1/2 ">
                            <Controller
                                name="Gender"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <RadioGroup
                                        options={genderoptions}
                                        onChange={(value: string) => {
                                            field.onChange(value);
                                        }}
                                        label={"Gender"}
                                        lableStyle={lableStyle}
                                        optionStyle={selectStyle}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.Gender && (
                                <p className="text-sm text-red-700">
                                    {"Gender is required"}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2 ">
                            <Controller
                                name="BirthDay"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <DateInput
                                        Datestyle={`${inputstyle} mr-5`}
                                        Dateprops={{ placeholder: "Birth Day" }}
                                        label={'Birth Day'}
                                        lableStyle={lableStyle}
                                        {...field}
                                        onChange={(value: string) => {
                                            field.onChange(value);
                                        }}
                                    />

                                )}
                            />
                            {errors.BirthDay && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Birth Day is required"}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">
                        {/*  <div className="w-1/2 ">
                            <Controller
                                name="CurrentJobStatus"
                                control={control}


                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Current Job Status" }}
                                        {...field}
                                        onChange={(value: string) => field.onChange(value)}
                                        label={"Current Job Status"}

                                    >
                                        <option
                                            value={undefined}
                                        >
                                            {"Current Job Status"}
                                        </option>
                                        {jobstatus.map((i) => (
                                            <option
                                                key={i.value}
                                                value={i.value}
                                            >
                                                {i.label}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.CurrentJobStatus && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Current Job Status is required"}
                                </p>
                            )}
                        </div> */}
                        <div className="w-1/2 ">

                            <Controller
                                control={control}
                                rules={{ required: false }}
                                name="profileImg"
                                render={({ field: { onChange } }) => (
                                    <ImageUploader label={"Profile Image"}
                                        labelStyle={lableStyle}
                                        uploaderStyle="w-[4rm]  xl:w-[30rem] lg:w-[20rem] md:w-[15rem] md:w-[15rem] h-[12.4375rem] rounded-md border-dashed border-2 border-gray-700 bg-gray-100 flex justify-center items-center"
                                        onChange={onChange} />
                                )}
                            />
                            {errors.profileImg && (
                                <span className="text-xs mb-3 text-red-700">
                                    {'imageIsRequired'}
                                </span>
                            )}

                        </div>

                    </div>
                </div>
                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-60 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Career Interests
                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">

                    </h2>
                    <hr className="mb-5"></hr>

                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="JobLevel"
                                control={control}
                                rules={{
                                    required: 'Job Level is required',
                                }}

                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Job Level", ...field }}
                                        label={"Job Level"}
                                        required={true}
                                        options={jobLevels}
                                    />
                                )}
                            />
                            {errors.JobLevel && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Job Level is required"}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <Controller
                                name="ExperienceYears"
                                control={control}
                                rules={{
                                    required: 'Experience Years is required',
                                    max: {
                                        value: 20,
                                        message: 'Experience Years should be at max 20 characters long',
                                    },
                                    min: {
                                        value: 0,
                                        message: 'Experience Years should be at min 5 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "Experience Years",
                                            name: "Experience Years",
                                            type: "text",
                                            placeholder: "Experience Years",
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Experience Years"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.ExperienceYears && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.ExperienceYears.message}`}
                                </p>
                            )}
                        </div>
                    </div>









                </div>
                <div className=" flex">
                    <button className="mb-5 bg-stone-500 text-secondary w-60  rounded-md h-10 m-auto  text-center" type="submit">
                        Complete Your Profile
                    </button>
                </div>
            </form >
        </div >


    );
}

export default Index;