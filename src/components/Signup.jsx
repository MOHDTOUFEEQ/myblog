import  { useState } from 'react'
import { login as authlogin } from '../store/authSlice';
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import {  Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth';
function Signup() {

    const navigate = useNavigate()
    const[error,setError] = useState()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    
    const signingup = async (data) => {
        try {
            if (data.confirm_password !== data.password) {
                console.log("log1");
                throw new Error("Password do not match");
            }
            
            console.log("log1_1");
            const session = await authService.createAccount(data);
            console.log("log2");
            
            if (session) {
                await authService.getCurrentUser().then((userData)=> dispatch(authlogin(userData)) ).then(()=>navigate("/"));
            }
        } catch (error) {
            setError(error.message);
        }
    };
    
    return (
    <>
    <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign up
                </h2>
                <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <Link
                    to={"/login"}
                    className="font-medium text-black transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>

                </p>
                <form onSubmit={handleSubmit(signingup)} className="mt-8">
                <div className="space-y-5">
                    <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                        {" "}
                        Full Name{" "}
                       
                    </label>
                    <div className="mt-2">
                        <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Full Name"
                        id="name"
                        {...register("name",{
                            required:true,
                        })}
                        />
                    </div>
                    </div>
                    <div>
                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                        {" "}
                        Email address{" "}
                    </label>
                    <div className="mt-2">
                        <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        {...register('email', {
                            required: 'This field is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Invalid email address',
                        }})}
                        />
                    </div>
                    </div>
                    <div>
                    <div className="flex items-center justify-between">
                        <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                        >
                        {" "}
                        Password{" "}
                        
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        {...register("password",{
                            required:true,
                        })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label
                        htmlFor="password_confirm"
                        className="text-base font-medium text-gray-900"
                        >
                        {" "}
                        confirm password{" "}
                        
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="confirm password"
                        id="confirm_password"
                        {...register("confirm_password",{
                            required:true,
                        })}
                        />
                    </div>
                    </div>
                    <div>
                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                        Create Account{" "}
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2"
                        >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                    </div>
                </div>
                </form>
                <div className="mt-3 space-y-3">
                    {error ? <p>{error}</p> : null}
                </div>
            </div>
            </div>
            <div className="h-full w-full">
            <img
                className="mx-auto h-full w-full rounded-md object-cover"
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
                alt=""
            />
            </div>
        </div>
    </section>

    </>
  )
}

export default Signup
