"use client";

import React, { useEffect } from "react";
import Heading from "../heading/Heading";
import Body from "../body/Body";
import Modal from "./Modal";
import Input from "../input/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../button/Button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignUpStore from "@/app/store/signupStore";
import LoginStore from "@/app/store/loginStore";
import axios from "axios";
import toast from "react-hot-toast";
import { UserState } from "@/app/enumStore/userStateEnum";
import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SignupModal = () => {
    let bodyContent;
    const loginStore = LoginStore();
    const signupStore = SignUpStore();
    const router = useRouter();
    const callbackURL = useSearchParams();
    const callbackRedirectURL = callbackURL.get("callbackUrl");
    const pathName = usePathname();

    const {
        register,
        formState: { errors, isSubmitSuccessful, isValid },
        handleSubmit,
        reset,
        watch,
        setFocus
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    });

    useEffect(() => {
        setFocus("email");
    }, [signupStore.isOpen]);

    const email = watch("email");
    const name = watch("name");
    const password = watch("password");

    function submit(data: any) {
        axios
            .post("/api/auth/signup", data)
            .then((res) => {
                if (res.data.code == UserState.NEW_USER_CREATED) {
                    toast.success("New User Created");
                    signIn("credentials", {
                        callbackUrl: pathName,
                        redirect: false,
                        email,
                        password
                    }).then((callback) => {
                        if (callback?.ok) {
                            router.refresh();
                            toast.success("User logged in");
                        } 
                    });
                    reset();
                    signupStore.onClose();
                } else if (res.data.code == UserState.USER_ALREADY_EXISTS) {
                    toast.error("User already exists in DB");
                }
            })
            .catch((err) => console.error("something went wrong"))
            .finally(() => {});
    }

    function handleLoginClick() {
        loginStore.onOpen();
        signupStore.onClose();
    }

    async function handleGoogleSignIn() {
        const signInData = await signIn("google", {
            callbackUrl: pathName,
            redirect: false
        });
        if (callbackRedirectURL) {
            router.push(callbackRedirectURL);
            return;
        }

        router.push(signInData?.url ? signInData.url : "/");
    }

    async function handleGithubSignIn() {
        const signInData = await signIn("github", {
            callbackUrl: pathName,
            redirect: false
        });

        if (callbackRedirectURL) {
            router.push(callbackRedirectURL);
            return;
        }

        router.push(signInData?.url ? signInData.url : "/");
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
                    value={email}
                />
                <Input
                    id="name"
                    label="Name"
                    register={register}
                    error={errors}
                    type="text"
                    value={name}
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
                    primaryAction={() => handleGoogleSignIn()}
                />
                <Button
                    primaryLabel="Continue with Github"
                    class={{
                        bgPrimaryStyle:
                            "bg-transparent text-black border-2 active:bg-transparent hover:border-gray-600 border-gray-800 active:border-gray-950"
                    }}
                    icon={FaGithub}
                    iconSize={25}
                    primaryAction={() => handleGithubSignIn()}
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
