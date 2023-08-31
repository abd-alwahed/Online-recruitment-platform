'use client'

import Input from "../../../../components/Input";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from "../../../../components/Select";
import { useEffect, useState } from "react";
import RadioGroup from "../../../../components/RadioGroup";
import TextArea from "../../../../components/TextArea";
import ImageUploader from "../../../../components/ImageUploader";
import DateInput from "../../../../components/DateInput";
import { useRouter } from "next/router";
import { axios } from "../../../../utils/axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
function Index() {
    const router = useRouter();
    const {user} = useAuthContext();
    const [industries, setIndustries] = useState([]);
    useEffect( () => {
        const fetchStuff = async () => {
            const {data: industriesResponse} = await axios.get('/job-roles');
      
            setIndustries(industriesResponse.map(e => ({
                label:e.details,
                value: e.id
            })))
        };
        fetchStuff();
    } ,[]); 
    const inputstyle = "pl-1  text-[0.5rem] md:text-xs lg:text-sm xl:text-md border-[hsl(0,0%,80%)] border-b  min-h-[34px]"
    const lableStyle = "font-dosis   text-[0.5rem] md:text-xs lg:text-sm xl:text-md font-medium  "
    const selectStyle = "text-gray-700 font-dosis  text-[0.5rem] md:text-xs lg:text-sm xl:text-md  font-normal"
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<any>();
    const searchParams= useSearchParams();
    const isEdit = searchParams.get('edit')
    
    const onSubmit: SubmitHandler<any> = async (subData) => {
        const data = {
            profileDetail: user.profileDetail.id,
            companyName: subData.CompanyName,
            jobTitle: subData.JobTitle,
            startDate: subData.FromDate,
            endDate: subData.ToDate,
            description: subData.Description,
            jobRoles: subData.JobRoles.map(e => e.value)
        }
        await axios.post('/experiences', {data});
        if (isEdit) {

            toast.success('Updated !');
            router.push('/profile/'+user.profileDetail.id);
        }
        else {
            toast.success('3/5 Completed, there are only 2 left');
            router.push('/employee/Languages/add');

        }
    };
    const startDate = watch('FromDate');
    const endDate = watch('ToDate');

    const validateDateRange = () => {
        if (startDate && endDate && startDate > endDate) {
            return 'From Date must be greater than or equal to Expected Date';
        }
        return true;
    };
    return (
        <div className="container mx-auto my-20 bg-gray  ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-60 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Experience Info
                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">

                    </h2>
                    <hr className="mb-5"></hr>


                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-full">
                            <Controller
                                name="JobTitle"
                                control={control}
                                rules={{
                                    required: 'JobTitle is required',
                                    maxLength: {
                                        value: 30,
                                        message: 'JobTitle should be at max 20 characters long',
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'JobTitle should be at min 5 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "JobTitle",
                                            name: "JobTitle",
                                            type: "text",
                                            placeholder: "Job Title",
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Job Title"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.JobTitle && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.JobTitle.message}`}
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="CompanyName"
                                control={control}
                                rules={{
                                    required: 'CompanyName is required',
                                    maxLength: {
                                        value: 30,
                                        message: 'CompanyName should be at max 20 characters long',
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'CompanyName should be at min 5 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "CompanyName",
                                            name: "CompanyName",
                                            type: "text",
                                            placeholder: "Company Name",
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Company Name"}
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
                        <div className="w-1/2 ">
                            <Controller
                                name="JobRoles"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Job Roles",...field }}
                                        onChange={(value: string) => field.onChange(value)}
                                        label={"Job Roles"}
                                        isMulti
                                        options={industries}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.JobRoles && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"JobRoles is required"}
                                </p>
                            )}
                        </div>

                    </div>


                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">

                        <div className="w-1/2 ">
                            <Controller
                                name="FromDate"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field }) => (
                                    <DateInput
                                        Datestyle={`${inputstyle} mr-5`}
                                        Dateprops={{ placeholder: "From Date" }}
                                        label={'From Date'}
                                        lableStyle={lableStyle}
                                        {...field}
                                        onChange={(value: string) => {
                                            field.onChange(value);
                                        }}
                                        required={true}
                                    />

                                )}
                            />
                            {errors.FromDate && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"From Date is required"}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2 ">
                            <Controller
                                name="ToDate"
                                control={control}
                                rules={{

                                    validate: validateDateRange
                                }}
                                render={({ field }) => (
                                    <DateInput
                                        Datestyle={`${inputstyle} mr-5`}
                                        Dateprops={{ placeholder: "To Date" }}
                                        label={'To Date'}
                                        lableStyle={lableStyle}
                                        {...field}
                                        onChange={(value: string) => {
                                            field.onChange(value);
                                        }}
                                    />

                                )}
                            />
                            {errors.ToDate && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.ToDate.message}`}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">

                        <div className="w-full ">
                            <Controller
                                name="Description"
                                control={control}


                                render={({ field }) => (
                                    <TextArea
                                        textareaProps={{
                                            ...field,
                                            id: 'Description',
                                            name: 'Description',
                                            placeholder: 'Write your job summary and responsibilities',
                                        }}
                                        textareaStyle=" pl-1  text-sm h-[5.875rem] rounded-[10px] border border-stone-500 mb-[3.06rem]  bg-background border-l-8   border-primary   text-gray-400"
                                        label={"Description"}
                                        lableStyle={lableStyle}
                                    />
                                )}
                            />

                        </div>

                    </div>
                </div>





                <div className=" flex">
                    <button className=" bg-stone-500 text-secondary w-40  rounded-md h-10 m-auto  text-center" type="submit">
                        Save
                    </button>
                </div>
            </form >
        </div >


    );
}

export default Index;