import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axios } from '../../utils/axios';
import { User } from '../../types/User';
import { setToken } from '../../utils/localStorageHelper';
import { useRouter } from 'next/router';

const index = () => {
    const router = useRouter();
    const [type, setType]=useState("company");  
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const singUp = async (email, password) => {
      
      const registerBody = {
        email: email,
        username: email,
        password: password,
      };
      const {data} = await axios.post<{user:User, jwt: string}>('/auth/local/register', registerBody);
      setToken(data.jwt);
      return data.user.id;
    } 
    const createCompany = async (companyData) => {
      const {firstName, email, password} = companyData;
      const id = await singUp(email, password);
      const data = {name: firstName,user: id };
      await axios.post('/companies', {data});
      router.push('/company/create');
    }
    const createUser = async (submittedData) => {
      const {firstName,lastName, phoneNumber,  email, password} = submittedData;
      const id = await singUp(email, password);
      const data = {
        user: id,
        firstName,
        lastName,
        phone: phoneNumber
      }
      await axios.post('/profile-details', {data});
      router.push('/employee/create');

    }
    const onSubmit = async(submittedData) => {
      if (type === 'company') {
        await createCompany(submittedData);
      }
      else {
        await createUser(submittedData);
      }
      toast.success('Your Account has been created')
    };
  return (

    
   
    <section className="bg-white ">
        <div className="flex justify-center min-h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/5" style={{backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')"}}>
            </div>
    
            <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                <div className="w-full">
                    <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
                        Get your free account now.
                    </h1>
    
                    <p className="mt-4 text-gray-500 ">
                        Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                    </p>
    
                    <div className="mt-6">
                        <h1 className="text-gray-500 ">Select type of account</h1>
    
                        <div className="mt-3 md:flex md:items-center md:-mx-2">
                            <button onClick={()=>{setType("company")}} className={`flex justify-center w-full px-6 py-3 transition duration-500  ${type=="company"?'bg-primary text-white':'bg-white text-primary'} rounded-md md:w-auto md:mx-2 focus:outline-none`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
    
                                <span className="mx-2">
                                    Company
                                </span>
                            </button>
    
                            <button onClick={()=>{setType("worker")}} className={`flex justify-center w-full px-6 py-3 transition duration-500   ${type=="worker"?'bg-primary text-white':'bg-white text-primary'} rounded-md md:w-auto md:mx-2 focus:outline-none`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
    
                                <span className="mx-2">
                                    worker
                                </span>
                            </button>
                        </div>
                    </div>
                      
                    <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-2 text-sm text-gray-600">{type === 'worker' ? 'First Name' : 'Company Name'}</label>
        <input
          type="text"
          placeholder="John"
          className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border outline-none border-gray-200 rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
          {...register('firstName', { required: true })}
        />
        {errors.firstName && <span className="text-red-500">First name is required</span>}
      </div>

      {type === 'worker' && (
        <div>
          <label className="block mb-2 text-sm text-gray-600">Last name</label>
          <input
            type="text"
            placeholder="Snow"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && <span className="text-red-500">Last name is required</span>}
        </div>
      )}

      {type === 'worker' && (
        <div>
          <label className="block mb-2 text-sm text-gray-600">Phone number</label>
          <input
            type="text"
            placeholder="XXX-XX-XXXX-XXX"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            {...register('phoneNumber', { required: true })}
          />
          {errors.phoneNumber && <span className="text-red-500">Phone number is required</span>}
        </div>
      )}

      <div>
        <label className="block mb-2 text-sm text-gray-600">Email address</label>
        <input
          type="email"
          placeholder="johnsnow@example.com"
          className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
          {...register('email', { required: true })}
        />
        {errors.email && <span className="text-red-500">Email address is required</span>}
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-600">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
          {...register('password', { required: true })}
        />
        {errors.password && <span className="text-red-500">Password is required</span>}
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-600">Confirm password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
          {...register('confirmPassword', { required: true })}
        />
        {errors.confirmPassword && <span className="text-red-500">Confirm password is required</span>}
      </div>

     
        <button
          className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md hover:bg-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          type="submit"
        >
          <span>Sign up</span>
     
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      
    </form>
                    <div className=" py-6 text-sm font-medium text-gray-500 ">
                         Have an account? <Link href="/log-in" className="text-primary hover:underline ">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>

  )
}

export default index