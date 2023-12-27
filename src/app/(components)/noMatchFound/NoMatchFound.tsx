"use client";

import FilterModalStore from "@/app/store/filterModalStore";
import ScrollBarStore from "@/app/store/scrollBarStore";
import { useRouter } from "next/navigation";
import React from "react";

type NoMatchFoundProps = {
    buttonLabel?: string;
    headingLabel?: string;
    buttonAction?: () => void;
};

const NoMatchFound: React.FC<NoMatchFoundProps> = ({
    headingLabel = "Try changing the filters",
    buttonLabel = "Remove All Filters",
    buttonAction
}) => {
    const router = useRouter();

    const scrollBarStore = ScrollBarStore();
    const filterModalStore = FilterModalStore();

    function removeFilters() {
        router.push("/");
        scrollBarStore.setScrollBar(undefined);
        filterModalStore.setDays(undefined);
        filterModalStore.setLocation(undefined);
        filterModalStore.setGuest(undefined);
    }

    return (
        <div className="flex justify-center items-center flex-col gap-y-4">
            <h1 className="text-3xl font-bold">Opps!!!</h1>
            <h4 className="text-lg font-semibold text-center">
                {headingLabel}
            </h4>
            <button
                className="py-2 px-4 border-2 rounded-md border-gray-600 hover:border-gray-600/40 active:border-gray-600/80"
                onClick={buttonAction ? buttonAction : removeFilters}
            >
                {buttonLabel}
            </button>
        </div>
    );
};

export default NoMatchFound;
