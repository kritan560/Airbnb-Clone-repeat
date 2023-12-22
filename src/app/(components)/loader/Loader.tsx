"use client";

import { GridLoader } from "react-spinners";

import React from "react";

const Loader = () => {
    return (
        <div className="flex h-[70vh] flex-col justify-center items-center">
            <GridLoader color="#DC2626" speedMultiplier={3} />
        </div>
    );
};

export default Loader;
