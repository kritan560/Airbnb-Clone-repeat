"use client";

import React from "react";
import Heading from "../heading/Heading";
import Body from "../body/Body";
import Modal from "./Modal";
import LoginStore from "@/app/store/loginStore";
import Input from "../input/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../button/Button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignUpStore from "@/app/store/signupStore";
import axios from "axios";
import toast from "react-hot-toast";

const LoginModal = () => {
    let bodyContent;

    const loginStore = LoginStore();
    const signupStore = SignUpStore();

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const email = watch("email");
    const password = watch("password");

    function submit(data: any) {
        console.log(data);
        console.log("clicked");
        axios
            .post("/api/auth/login", data)
            .then((res) => {
                console.log(res.data);
                if (
                    res.data.foundUser == true &&
                    res.data.passwordMatch == true
                ) {
                    toast.success("user logged in success");
                    reset();
                    loginStore.onClose();
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {});
    }

    function handleSignupClick() {
        loginStore.onClose();
        signupStore.onOpen();
    }

    bodyContent = (
        <>
            <Heading title="Welcome Back!" subtitle="login to your account" />
            <Body className="flex gap-y-4 flex-col">
                <Input
                    id="email"
                    label="Email"
                    register={register}
                    error={errors}
                    type="email"
                    value={email}
                />
                <Input
                    id="password"
                    label="Password"
                    register={register}
                    error={errors}
                    type="password"
                    value={password}
                />
                <Button
                    primaryLabel="Login"
                    primaryAction={handleSubmit(submit)}
                />
                <hr />
                <Button
                    primaryLabel="Login with Google"
                    class={{
                        bgPrimaryStyle:
                            "bg-transparent text-black border-2 active:bg-transparent hover:border-gray-600 border-gray-800 active:border-gray-950"
                    }}
                    icon={FcGoogle}
                    iconSize={25}
                    primaryAction={() => {}}
                />
                <Button
                    primaryLabel="Login with Github"
                    class={{
                        bgPrimaryStyle:
                            "bg-transparent text-black border-2 active:bg-transparent hover:border-gray-600 border-gray-800 active:border-gray-950"
                    }}
                    icon={FaGithub}
                    iconSize={25}
                    primaryAction={() => {}}
                />
                <div className="">
                    <span>First time using Airbnb?</span>
                    <span
                        onClick={handleSignupClick}
                        className="font-semibold hover:underline ml-1 hover:cursor-pointer active:text-slate-700"
                    >
                        SignUp to Airbnb
                    </span>
                </div>
            </Body>
        </>
    );

    return (
        <>
            <Modal body={bodyContent} modal={LoginStore} title="login" />
        </>
    );
};
export default LoginModal;
