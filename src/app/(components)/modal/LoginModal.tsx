"use client";

import React, { useEffect } from "react";
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
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    let bodyContent;

    const loginStore = LoginStore();
    const signupStore = SignUpStore();
    const router = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
        setFocus
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    useEffect(() => {
        setFocus("email");
    }, [loginStore.isOpen]);

    const email = watch("email");
    const password = watch("password");

    function submit(data: any) {
        signIn("credentials", {
            callbackUrl: "/",
            redirect: false,
            email,
            password
        }).then((callback) => {
            if (callback?.ok) {
                toast.success("User logged in success");
                reset();
                loginStore.onClose();
                router.refresh();
            } else if (callback?.error) {
                setFocus("password");
                toast.error(callback.error);
            }
        });
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
                    primaryAction={() =>
                        signIn("google", { callbackUrl: "/", redirect: false })
                    }
                />
                <Button
                    primaryLabel="Login with Github"
                    class={{
                        bgPrimaryStyle:
                            "bg-transparent text-black border-2 active:bg-transparent hover:border-gray-600 border-gray-800 active:border-gray-950"
                    }}
                    icon={FaGithub}
                    iconSize={25}
                    primaryAction={() =>
                        signIn("github", { callbackUrl: "/", redirect: false })
                    }
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
