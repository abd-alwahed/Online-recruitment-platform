

import Input from "../../../components/Input";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from "../../../components/Select";
import { useEffect, useState } from "react";
import RadioGroup from "../../../components/RadioGroup";
import TextArea from "../../../components/TextArea";
import ImageUploader from "../../../components/ImageUploader";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { axios } from "../../../utils/axios";
import { toast } from "react-toastify";
function Index() {
    const { user, isCompany } = useAuthContext();
    const router = useRouter();
    if (!isCompany) {
        router.push('/');
    }
    const [industries, setIndustries] = useState([]);
    const nationalities = ['Syrian',
        'Palestinian'].map(e => ({ value: e, label: e }))
    const [miltiaryOptions, setMiltiaryOptions] = useState([]);
    const [jobLevels, setJobLevels] = useState([]);
    const [cities, setCities] = useState([]);
    const genderoptions = [
        'Male',
        'Female'
    ].map(e => ({ value: e, label: e }));

    useEffect(() => {
        const fetchStuff = async () => {
            const { data: citiesResponse } = await axios.get('/cities');
            const { data: industriesResponse } = await axios.get('/job-roles');
            const { data: militaryResponse } = await axios.get('/military-services')
            const { data: jobLevelsResponse } = await axios.get('/job-levels')
            setCities(citiesResponse.map(e => ({
                label: e.name,
                value: e.id
            })));
            setIndustries(industriesResponse.map(e => ({
                label: e.details,
                value: e.id
            })));
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

    const onSubmit: SubmitHandler<any> = async (subData) => {
        alert(JSON.stringify(subData))
        const data = {
            jobTitle: subData.JobTitle,
            jobRoles: subData.Category.map(e => e.value),
            age: subData.Age,
            jobLevel: subData.JobLevel,
            yearOfExperience: subData.yearsOfExperience,
            city: subData.City.value,
            address: subData.Address,
            salary: subData.Salary,
            gender: subData.Gender,
            jobDescription: subData.jobDescription,
            jobRequirements: subData.JobRequirements,
            militaryService: subData.militatyService.value,
            company: user.company.id

        }
        const { data: { id } } = await axios.post('/jobs', { data })
        toast.success('created job success fully');
        router.push('/job/' + id);
    };
    return (
        <div className="container mx-auto my-20">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-80 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Specify the required employee specification
                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">
                        to access matching candidates
                    </h2>
                    <hr className="mb-5"></hr>


                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="JobTitle"
                                control={control}
                                rules={{
                                    required: 'title is required',
                                    maxLength: {
                                        value: 40,
                                        message: 'title should be at max 20 characters long',
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'title should be at min 5 characters long',
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
                        <div className="w-1/2">
                            <Controller
                                name="Category"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle}`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Category", ...field }}
                                        label={"Category"}
                                        required={true}
                                        options={industries}
                                        isMulti
                                    />
                                )}
                            />
                            {errors.Category && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"Category is required"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex   items-center  mx- md:mx-10 lg:mx-20  flex-wrap  my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="JobLevel"
                                control={control}

                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "Job Level", ...field }}
                                        label={"Job Level"}
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
                                name="Age"
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Age must be a numeric value',
                                    },
                                    max: {
                                        value: 100,
                                        message: "Max Age should be less than 100"
                                    },
                                    min: {
                                        value: 18,
                                        message: "Min Age should be more than 18"
                                    },
                                }}
                                render={({ field }) => (
                                    <Input

                                        inputProps={{
                                            ...field,
                                            id: 'Age',
                                            name: 'Age',
                                            type: 'number',
                                            placeholder: 'Age',
                                        }}
                                        inputStyle={`${inputstyle}`}
                                        lableStyle={lableStyle}
                                        label={"Age"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.Age && (
                                <p className="text-xs mb-3 text-red-700  ">
                                    {`${errors.Age.message}`}
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">
                        <div className="w-full">
                            <Controller
                                name="yearsOfExperience"
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'yearsOfExperience must be a numeric value',
                                    },
                                    max: {
                                        value: 100,
                                        message: "yearsOfExperience  should be less than 100"
                                    },
                                    min: {
                                        value: 0,
                                        message: "yearsOfExperience should be more than 0"
                                    },
                                }}
                                render={({ field }) => (
                                    <Input

                                        inputProps={{
                                            ...field,
                                            id: 'yearsOfExperience',
                                            name: 'yearsOfExperience',
                                            type: 'number',
                                            placeholder: '',
                                        }}
                                        inputStyle={`${inputstyle}`}
                                        lableStyle={lableStyle}
                                        label={"Years Of Experience"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.yearsOfExperience && (
                                <p className="text-xs mb-3 text-red-700  ">
                                    {`${errors.yearsOfExperience.message}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">


                    </div>





                </div>


                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-80 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Specify the required employee specification
                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">
                        to access matching candidates
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
                                        required={true}
                                        options={cities}
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
                                        inputStyle={`${inputstyle} mr-5`}
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
                                name="Salary"
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Salary must be a numeric value',
                                    },
                                    max: {
                                        value: 100000000,
                                        message: "Max salary should be less than 100000000 S.P"
                                    },
                                    min: {
                                        value: 25000,
                                        message: "Min salary should be more than 25000 S.P"
                                    },
                                }}
                                render={({ field }) => (
                                    <Input

                                        inputProps={{
                                            ...field,
                                            id: 'Salary',
                                            name: 'Salary',
                                            type: 'number',
                                            placeholder: 'Salary',
                                        }}
                                        inputStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}

                                        label={"Salary"}
                                        required={true}
                                    />
                                )}
                            />
                            {errors.Salary && (
                                <p className="text-xs mb-3 text-red-700  ">
                                    {`${errors.Salary.message}`}
                                </p>
                            )}


                        </div>
                        <div className="w-1/2">
                            <div className="w-1/2">
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
                        </div>
                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-1/2">
                            <Controller
                                name="militatyService"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        selectStyle={`${inputstyle} mr-5`}
                                        lableStyle={lableStyle}
                                        selectProps={{ placeholder: "militatyService", ...field }}
                                        label={"militatyService"}
                                        required={true}
                                        options={miltiaryOptions}
                                    />
                                )}
                            />
                            {errors.militatyService && (
                                <p className="text-xs mb-3 text-red-700">
                                    {"militatyService is required"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-80 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Fill out your Job Vacancy information
                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">
                        to access the required employee
                    </h2>
                    <hr className="mb-5"></hr>


                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-3/4 m-auto">
                            <Controller
                                name="jobDescription"
                                control={control}
                                rules={{
                                    required: 'Job Description is required',
                                    minLength: {
                                        value: 50,
                                        message: 'Job Description should be at least 50 characters long',
                                    },
                                }}

                                render={({ field }) => (
                                    <TextArea
                                        textareaProps={{
                                            ...field,
                                            id: 'jobDescription',
                                            name: 'jobDescription',
                                            placeholder: 'Write your job summary and responsibilities',
                                        }}
                                        textareaStyle=" pl-1  text-sm h-[15.875rem] rounded-[10px] border border-stone-500 mb-[3.06rem]  bg-background border-l-8   border-primary   text-gray-400"
                                        label={"Job Description"}
                                        lableStyle={lableStyle}
                                    />
                                )}
                            />


                            {errors.jobDescription && (
                                <p className="text-xs mb-3 text-red-700 ">
                                    {`${errors.jobDescription.message}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap my-7 ">
                        <div className="w-3/4 m-auto">
                            <Controller
                                name="JobRequirements"
                                control={control}
                                rules={{
                                    required: 'Job Requirements is required',
                                    minLength: {
                                        value: 50,
                                        message: 'Job Requirements should be at least 50 characters long',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextArea
                                        textareaProps={{
                                            ...field,
                                            id: 'JobRequirements',
                                            name: 'JobRequirements',
                                            placeholder: 'Write required skills and expertise of desired candidate',
                                        }}
                                        textareaStyle=" pl-1 text-sm   h-[15.875rem] rounded-[10px] border border-stone-500 mb-[3.06rem]  bg-background border-l-8   border-primary   text-gray-400"
                                        label={"Job Requirements"}
                                        lableStyle={lableStyle}
                                    />
                                )}
                            />
                            {errors.JobRequirements && (
                                <p className="text-xs mb-3 text-red-700 ">
                                    {`${errors.JobRequirements.message}`}
                                </p>
                            )}
                        </div>
                    </div>



                </div>
                <div className=" flex">
                    <button className=" bg-stone-500 text-secondary w-40  rounded-md h-10 m-auto  text-center" type="submit">
                        Add New Job
                    </button>
                </div>
            </form>
        </div>


    );
}

export default Index;