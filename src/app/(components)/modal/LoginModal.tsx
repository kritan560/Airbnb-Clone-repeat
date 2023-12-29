"use client";

import LoginStore from "@/app/store/loginStore";
import SignUpStore from "@/app/store/signupStore";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Body from "../body/Body";
import Button from "../button/Button";
import Heading from "../heading/Heading";
import Input from "../input/Input";
import {
    ERROR_MESSAGE,
    ErrorToast,
    LOGIN_SUCCESS,
    SuccessToast
} from "../toast/Toast";
import Modal from "./Modal";

const LoginModal = () => {
    let bodyContent;

    const loginStore = LoginStore();
    const signupStore = SignUpStore();
    const router = useRouter();
    const callbackURL = useSearchParams();
    const callbackRedirectURL = callbackURL.get("callbackUrl");
    const pathName = usePathname();
    const { theme, systemTheme } = useTheme();

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
            callbackUrl: pathName,
            redirect: false,
            email,
            password
        }).then((callback) => {
            if (callback?.ok) {
                reset();
                loginStore.onClose();
                SuccessToast(theme, systemTheme, LOGIN_SUCCESS);

                // if there is a callbackUrl | pathName defined in titlebar
                if (callbackRedirectURL) {
                    router.push(callbackRedirectURL);
                    router.refresh();
                    return;
                }

                // if there is no callbackUrl defined redirect to homepage
                router.push(callback.url ? callback.url : "/");
                router.refresh();
            } else if (callback?.error) {
                setFocus("password");
                ErrorToast(theme, systemTheme, ERROR_MESSAGE);
            }
        });
    }

    function handleSignupClick() {
        loginStore.onClose();
        signupStore.onOpen();
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
        <div className="">
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
                            "bg-transparent text-black border-2 active:bg-transparent hover:border-gray-600 border-gray-800 active:border-gray-950 dark:text-slate-100 dark:hover:border-gray-300 dark:active:border-gray-500 dark:border-gray-200"
                    }}
                    icon={FcGoogle}
                    iconSize={25}
                    primaryAction={() => handleGoogleSignIn()}
                />
                <Button
                    primaryLabel="Login with Github"
                    class={{
                        bgPrimaryStyle:
                            "bg-transparent text-black border-2 active:bg-transparent hover:border-gray-600 border-gray-800 active:border-gray-950 dark:text-slate-100 dark:hover:border-gray-300 dark:active:border-gray-500 dark:border-gray-200"
                    }}
                    icon={FaGithub}
                    iconSize={25}
                    primaryAction={() => handleGithubSignIn()}
                />
                <div className="">
                    <span>First time using Airbnb?</span>
                    <span
                        onClick={handleSignupClick}
                        className="font-semibold hover:underline ml-1 hover:cursor-pointer active:text-slate-700 dark:text-red-500 dark:active:text-red-600"
                    >
                        SignUp to Airbnb
                    </span>
                </div>
            </Body>
        </div>
    );

    return (
        <>
            <Modal body={bodyContent} modal={LoginStore} title="login" />
        </>
    );
};
export default LoginModal;
