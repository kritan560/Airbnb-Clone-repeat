"use client";

import React from "react";
import Heading from "../heading/Heading";
import Body from "../body/Body";
import Modal from "./Modal";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import Button from "../button/Button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignUpStore from "@/app/store/signupStore";
import LoginStore from "@/app/store/loginStore";
import axios from "axios";
import toast from "react-hot-toast";

const SignupModal = () => {
    let bodyContent;
    const loginStore = LoginStore();
    const signupStore = SignUpStore();

    const {
        register,
        formState: { errors, isSubmitSuccessful, isValid },
        handleSubmit,
        reset
    } = useForm();

    function submit(data: any) {
        console.log(data);
        console.log("clicked");
        axios
            .post("/api/auth/signup", data)
            .then((res) => {
                if (res.data.userCreated == true) {
                    toast.success("New User Created");
                } else if (res.data.userCreated == false) {
                    toast.error("User already exists in DB");
                }
            })
            .catch((err) => console.error(err))
            .finally(() => {
                if (isSubmitSuccessful && isValid) {
                    signupStore.onClose();
                    reset();
                }
            });
    }

    function handleLoginClick() {
        loginStore.onOpen();
        signupStore.onClose();
    }

    bodyContent = (
        <>
            <Heading title="Welcome to Airbnb!" subtitle="Create an Account" />
            <Body className="flex flex-col gap-y-2">
                <Input
                    id="email"
                    label="Email"
                    register={register}
                    error={errors}
                    type="email"
                />
                <Input
                    id="name"
                    label="Name"
                    register={register}
                    error={errors}
                    type="text"
                />
                <Input
                    id="password"
                    label="Password"
                    register={register}
                    error={errors}
                    type="password"
                />
                <Button
                    primaryLabel="Continue"
                    primaryAction={handleSubmit(submit)}
                />
                {/* <hr /> */}
                <Button
                    primaryLabel="Continue with Google"
                    class={{
                        bgPrimaryStyle:
                            "bg-transparent text-black border-2 active:bg-transparent hover:border-gray-600 border-gray-800 active:border-gray-950"
                    }}
                    icon={FcGoogle}
                    iconSize={25}
                    primaryAction={() => {}}
                />
                <Button
                    primaryLabel="Continue with Github"
                    class={{
                        bgPrimaryStyle:
                            "bg-transparent text-black border-2 active:bg-transparent hover:border-gray-600 border-gray-800 active:border-gray-950"
                    }}
                    icon={FaGithub}
                    iconSize={25}
                    primaryAction={() => {}}
                />
                <div className="">
                    <span>Already have an account?</span>
                    <span
                        onClick={handleLoginClick}
                        className="font-semibold hover:underline ml-1 hover:cursor-pointer active:text-slate-700"
                    >
                        Login
                    </span>
                </div>
            </Body>
        </>
    );

    return (
        <>
            <Modal body={bodyContent} modal={SignUpStore} title="Signup" />
        </>
    );
};
export default SignupModal;
