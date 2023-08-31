'use client'

import Input from "../../../components/Input";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from "../../../components/Select";
import { useEffect, useState } from "react";
import RadioGroup from "../../../components/RadioGroup";
import TextArea from "../../../components/TextArea";
import ImageUploader from "../../../components/ImageUploader";
import { useAuthContext } from "../../../contexts/AuthContext";
import { axios } from "../../../utils/axios";
import { responseParser } from "../../../utils/responseParse";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
function Index() {
    const { user, isLoading, isCompany } = useAuthContext();
    const router = useRouter()
    if (!user) {
        return <h1>Loading...</h1>;
    }
    const [cities, setCities] = useState([]);
    const [industries, setIndustries] = useState([]);
    useEffect(() => {
        const fetchStuff = async () => {
            const { data: citiesResponse } = await axios.get('/cities');
            const { data: industriesResponse } = await axios.get('/job-roles');
            setCities(citiesResponse.map(e => ({
                label: e.name,
                value: e.id
            })));
            setIndustries(industriesResponse.map(e => ({
                label: e.details,
                value: e.id
            })))
        };
        fetchStuff();
    }, []);
    const companySizes = [
        {
            "label": "from 1  to 5",
            "value": "from 1  to 5"
        },
        {
            "label": "from 6  to 10",
            "value": "from 6  to 10"
        },
        {
            "label": "from 11 to 25",
            "value": "from 11 to 25"
        },
        {
            "label": "from 20 to 100",
            "value": "from 20 to 100"
        },
        {
            "label": "more than 100",
            "value": "more than 100"
        }
    ];
    const years = [...new Array(2023 - 1900)].map((_, e) => ({ label: (e + 1900) + "", value: e + 1900 })).sort((a, b) => b.value - a.value);

    const inputstyle = "pl-1  text-[0.5rem] md:text-xs lg:text-sm xl:text-md border-[hsl(0,0%,80%)] border-b  min-h-[34px]"
    const lableStyle = "font-dosis   text-[0.5rem] md:text-xs lg:text-sm xl:text-md font-medium  "
    const selectStyle = "text-gray-700 font-dosis  text-[0.5rem] md:text-xs lg:text-sm xl:text-md  font-normal"
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (subData) => {
        const fd = new FormData();
        fd.append('files', subData.profileImg)
        const { data: images } = await axios.post('/upload', fd)

        const data = {
            bio: subData.CompanyBio,
            address: subData.Address,
            jobRoles: subData.IndustriesOfCompany.map(e => e.value),
            foundedDate: new Date(subData.YearFounded.value),
            cities: subData.City.map(e => e.value),
            phone: subData.Phone,
            companySize: subData.CompanySize.value,
            website: subData.CompanyWebsite,
            profileImg: images[0]?.id
        }
        console.log(subData)

        await axios.put('/companies/' + user.company.id, { data });
        toast.success('Company Info has been updated')
        router.push('/company/' + user.company.id);

    };
    return (
        <div className="bg-gray-200 px-10 text-base ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-60 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Company profile

                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">
                        Write below your company profile which will appear with each of your job posts. You will still have the option to hide it from any of your jobs.
                    </h2>
                    <hr className="mb-5"></hr>


                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="CompanyName"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "CompanyName",
                                            name: "CompanyName",
                                            type: "text",
                                            placeholder: "Company Name",
                                            value: user.company?.name

                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Company Name"}
                                        disable={true}

                                        required={true}
                                    />
                                )}
                            />
                            {errors.CompanyName && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.CompanyName.message}`}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">

                        </div>
                    </div>

                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">
                        <div className="w-1/2 ">
                            <Controller
                                name="CompanyBio"
                                control={control}
                                rules={{

                                    minLength: {
                                        value: 100,
                                        message: 'Company Bio should be at least 50 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextArea
                                        textareaProps={{
                                            ...field,
                                            id: 'CompanyBio',
                                            name: 'CompanyBio',
                                            placeholder: 'Write Company Bio',
                                        }}
                                        textareaStyle=" pl-1 text-sm   h-[15.875rem] rounded-[10px] border border-stone-500 mb-[3.06rem]  bg-background border-l-8   border-primary   text-gray-400"
                                        label={"Company Bio"}
                                        lableStyle={lableStyle}
                                    />
                                )}
                            />
                            {errors.CompanyBio && (
                                <p className="text-xs mb-3 text-red-700 ">
                                    {`${errors.CompanyBio.message}`}
                                </p>
                            )}
                        </div>


                    </div>




                </div>


                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-60 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        General info
                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">
                        This information will be private except if you choose to show it for the employees when you add new Job.
                    </h2>
                    <hr className="mb-5"></hr>


                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="City"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "City", ...field }}
                                        label={"City"}
                                        isMulti
                                        options={cities}
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
                        <div className="w-1/2">
                            <Controller
                                name="Address"
                                control={control}
                                rules={{
                                    required: 'Address is required',
                                    maxLength: {
                                        value: 40,
                                        message: 'Address should be at max 20 characters long',
                                    },
                                    minLength: {
                                        value: 4,
                                        message: 'Address should be at min 5 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "Address",
                                            name: "Address",
                                            type: "text",
                                            placeholder: "Address",
                                        }}
                                        inputStyle={`${inputstyle} `}
                                        lableStyle={lableStyle}
                                        label={"Address"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.Address && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.Address.message}`}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="IndustriesOfCompany"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Industries Of Company", ...field }}
                                        isMulti
                                        onChange={(value: string) => field.onChange(value)}
                                        label={"Industries Of Company"}
                                        required={true}
                                        options={industries}
                                    />
                                )}
                            />
                            {errors.IndustriesOfCompany && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Industries Of Company is required"}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <Controller
                                name="CompanySize"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle}`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Company Size", ...field }}
                                        label={"Company Size"}
                                        required={true}
                                        options={companySizes}
                                    />
                                )}
                            />
                            {errors.CompanySize && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Company Size is required"}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="YearFounded"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Year Founded", ...field }}
                                        {...field}
                                        onChange={(value: string) => field.onChange(value)}
                                        label={"Year Founded"}

                                        required={true}
                                        options={years}
                                    />
                                )}
                            />
                            {errors.YearFounded && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Year Founded is required"}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <Controller
                                name="Phone"
                                control={control}
                                rules={{
                                    required: 'phone is required',
                                    pattern: {
                                        value: /^\d{14}$/,
                                        message: 'Phone number should be a 14-digit number',
                                    },
                                    minLength: {
                                        value: 14,
                                        message: 'Phone number should be a 14-digit number',
                                    }
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "Phone",
                                            name: "Phone",
                                            type: "text",
                                            placeholder: "Phone",
                                        }}
                                        inputStyle={`${inputstyle}`}
                                        lableStyle={lableStyle}
                                        label={"Phone"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.Phone && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.Phone.message}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">

                        <div className="w-1/2">
                            <Controller
                                name="CompanyWebsite"
                                control={control}
                                rules={{

                                    pattern: {
                                        value: /^(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z0-9-]+(\/.*)?$/,
                                        message: 'Please enter a valid website URL',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "Company Website",
                                            name: "Company Website",
                                            type: "text",
                                            placeholder: "Company Website",
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Company Website"}

                                    />
                                )}
                            />
                            {errors.CompanyWebsite && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.CompanyWebsite.message}`}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
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


                <div className=" flex">
                    <button className=" bg-stone-500 text-secondary w-60  rounded-md h-10 m-auto  text-center" type="submit">
                        Complete Registration
                    </button>
                </div>
            </form>
        </div>


    );
}

export default Index;