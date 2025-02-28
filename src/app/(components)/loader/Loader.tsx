"use client";

import { GridLoader } from "react-spinners";


const Loader = () => {
    return (
        <div className="flex h-screen flex-col justify-center items-center">
            <GridLoader color="#DC2626" speedMultiplier={3} />
        </div>
    );
};

export default Loader;
