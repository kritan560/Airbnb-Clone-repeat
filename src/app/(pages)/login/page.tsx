"use client";

import Body from "@/app/(components)/body/Body";
import Button from "@/app/(components)/button/Button";
import Heading from "@/app/(components)/heading/Heading";
import LoginStore from "@/app/store/loginStore";
import React, { useEffect } from "react";
import { CiLogin } from "react-icons/ci";

const page = () => {
    const loginStore = LoginStore();

    // in modalStore there is a variable shouldViewCross that will enable or disable cross marks in login/signup modal goto modalStore to view the states.

    function handlePrimaryAction() {
        loginStore.onOpen();
    }

    return (
        <div>
            <Heading
                title="Unauthenticated"
                subtitle="Please login to access the protected routes"
            />
            <Body>
                <Button
                    primaryAction={() => handlePrimaryAction()}
                    primaryLabel="Click to Login"
                    icon={CiLogin}
                    iconSize={25}
                />
            </Body>
        </div>
    );
};

export default page;
