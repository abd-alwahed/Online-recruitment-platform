'use client'

import Input from "../../../../components/Input";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from "../../../../components/Select";
import { useEffect, useState } from "react";
import RadioGroup from "../../../../components/RadioGroup";
import TextArea from "../../../../components/TextArea";
import ImageUploader from "../../../../components/ImageUploader";
import DateInput from "../../../../components/DateInput";
import { axios } from "../../../../utils/axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
function Index() {

    const { user } = useAuthContext();
    const [skills, setSkills] = useState();
    useEffect(() => {
        const fetchStuff = async () => {

            const { data: skil } = await axios(`/profile-details/${user?.profileDetail?.id}?populate=educations,experiences,languages,workingCities,militaryService,jobLevel,profileImage ,user`);
            setSkills(skil)

        };
        fetchStuff();
    }, []);
    console.log(skills)
    const router = useRouter();
    const inputstyle = "pl-1  text-[0.5rem] md:text-xs lg:text-sm xl:text-md rounded-[10px] border border-stone-500 bg-background border-l-8   text-gray-400 h-8  md:h-10 lg:h-12"
    const lableStyle = "font-dosis   text-[0.5rem] md:text-xs lg:text-sm xl:text-md font-medium  "
    const selectStyle = "text-gray-700 font-dosis  text-[0.5rem] md:text-xs lg:text-sm xl:text-md  font-normal"
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data) => {
        await axios.put('/profile-details/' + user.profileDetail.id, {
            data
        });
        toast.success('DONE !!!');
        router.push('/profile/'+user.profileDetail.id)
    };

    return (
        <div className="bg-gray-200 px-10 text-base    ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5 bg-white h-full   mx-10 md:mx-32 lg:mx-60 rounded-xl pt-4  pb-10 px-6 md:px-12  border-l-8   border-primary  shadow  shadow-slate-300">
                    <h1 className=" text-primary text-xl md:text-2xl lg:text-3xl  mt-6">
                        Skills
                    </h1>
                    <h2 className="text-sm md:text-md lg:text-lg text-slate-500  mt-2 mb-12">

                    </h2>
                    <hr className="mb-5"></hr>



                    <div className="flex   items-center  mx-2 md:mx-10 lg:mx-20  flex-wrap  my-7 ">

                        <div className="w-full ">
                            <Controller
                                name="Skills"
                                control={control}


                                render={({ field }) => (
                                    <TextArea
                                        textareaProps={{
                                            ...field,
                                            id: 'Skills',
                                            name: 'Skills',
                                            defaultValue: skills?.Skills,
                                        }}
                                        textareaStyle=" pl-1  text-sm h-[5.875rem] rounded-[10px] border border-stone-500 mb-[3.06rem]  bg-background border-l-8   border-primary   text-gray-400"
                                        label={"Skills"}
                                        lableStyle={lableStyle}
                                    />
                                )}
                            />

                        </div>

                    </div>
                </div>





                <div className=" flex">
                    <button className=" bg-stone-500 text-secondary w-40  rounded-md h-10 m-auto  text-center" type="submit">
                        Update
                    </button>
                </div>
            </form >
        </div >


    );
}

export default Index;