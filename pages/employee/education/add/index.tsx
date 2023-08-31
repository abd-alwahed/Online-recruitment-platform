'use client'

import Input from "../../../../components/Input";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
    const { user } = useAuthContext()
    const inputstyle = "pl-1  text-[0.5rem] md:text-xs lg:text-sm xl:text-md border-[hsl(0,0%,80%)] border-b  min-h-[34px]"
    const lableStyle = "font-dosis   text-[0.5rem] md:text-xs lg:text-sm xl:text-md font-medium  "
    const selectStyle = "text-gray-700 font-dosis  text-[0.5rem] md:text-xs lg:text-sm xl:text-md  font-normal"
    const searchParams = useSearchParams()
    const isEdit = searchParams.get('edit')
    
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<any>();
    const router = useRouter();
    const onSubmit: SubmitHandler<any> = async (subData) => {
        const data = {
            profileDetail: user.profileDetail.id,
            degree: subData.degree,
            department: subData.department,
            university: subData.University,
            startDate: subData.FromDate,
            endDate: subData.ExpectedDate
        };
        await axios.post('/education-levels', { data });
        if (isEdit) {
            toast.success('Education Added ');
            router.push('/profile/'+user.profileDetail.id)
            
        }
        else {
            toast.success('Education Added 2/5 Completed, please Bear with us');
            router.push('/employee/experience/add');

        }
    };

    const startDate = watch('FromDate');
    const endDate = watch('ExpectedDate');

    const validateDateRange = () => {
        if (startDate && endDate && startDate > endDate) {
            return 'From Date must be greater than or equal to Expected Date';
        }
        return true;
    };
    return (
        <div className="container mx-auto my-20">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-60 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Education Info


                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">

                    </h2>
                    <hr className="mb-5"></hr>


                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-full">
                            <Controller
                                name="University"
                                control={control}
                                rules={{
                                    required: 'University is required',
                                    maxLength: {
                                        value: 30,
                                        message: 'University should be at max 20 characters long',
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'University should be at min 5 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "University",
                                            name: "University",
                                            type: "text",
                                            placeholder: "At University/Institution",
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"At University/Institution"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.University && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.University.message}`}
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="degree"
                                control={control}
                                rules={{
                                    required: 'degree is required',
                                    maxLength: {
                                        value: 30,
                                        message: 'degree should be at max 20 characters long',
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'degree should be at min 5 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "degree",
                                            name: "degree",
                                            type: "text",
                                            placeholder: "Degree",
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Degree"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.University && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.University.message}`}
                                </p>
                            )}
                        </div>

                        <div className="w-1/2">
                            <Controller
                                name="department"
                                control={control}
                                rules={{
                                    required: 'department is required',
                                    maxLength: {
                                        value: 30,
                                        message: 'department should be at max 20 characters long',
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'department should be at min 5 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        inputProps={{
                                            ...field,
                                            id: "department",
                                            name: "department",
                                            type: "text",
                                            placeholder: "Department",
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        label={"Department"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.University && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.University.message}`}
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
                                name="ExpectedDate"
                                control={control}
                                rules={{

                                    validate: validateDateRange
                                }}

                                render={({ field }) => (
                                    <DateInput
                                        Datestyle={`${inputstyle} mr-5`}
                                        Dateprops={{ placeholder: "Awarded On Or Expected Date" }}
                                        label={'Awarded On Or Expected Date'}
                                        lableStyle={lableStyle}
                                        {...field}
                                        onChange={(value: string) => {
                                            field.onChange(value);
                                        }}
                                    />

                                )}
                            />
                            {errors.ExpectedDate && (
                                <p className="text-xs mb-3 text-red-700">
                                    {`${errors.ExpectedDate.message}`}
                                </p>
                            )}
                        </div>
                    </div>
                </div>





                <div className=" flex">
                    <button className=" bg-stone-500 text-secondary w-40  rounded-md h-10 m-auto  text-center" type="submit">
                        Add
                    </button>
                </div>
            </form >
        </div >


    );
}

export default Index;