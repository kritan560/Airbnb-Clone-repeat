"use client";

import ScrollBarStore from "@/app/store/scrollBarStore";
import { useRouter } from "next/navigation";
import React from "react";

const NoMatchFound = () => {
    const router = useRouter();

    const scrollBarStore = ScrollBarStore();
    function removeFilters() {
        router.push("/");
        scrollBarStore.setScrollBar(undefined);
    }

    return (
        <div className="flex justify-center items-center flex-col gap-y-4">
            <h1 className="text-3xl font-bold">No Match Found</h1>
            <h4 className="text-lg font-semibold">Try changing the filters</h4>
            <button
                className="py-2 px-4 border-2 rounded-md border-gray-600 hover:border-gray-600/50"
                onClick={removeFilters}
            >
                Remove all Filters
            </button>
        </div>
    );
};

export default NoMatchFound;
