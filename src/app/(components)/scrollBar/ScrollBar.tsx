"use client";

import { categoryIcons } from "@/app/(components)/modal/1categoriesModal/CategoryModal";
import ScrollBarStore from "@/app/store/scrollBarStore";
import { useRouter, useSearchParams } from "next/navigation";

const ScrollBar = () => {
    const router = useRouter();
    const scrollBarStore = ScrollBarStore();
    const item = scrollBarStore.scrollBar;

    // used for darker text and underline in scroll bar
    const URL = useSearchParams();
    const categoryFromURL = URL.get("category");

    function handleScrollItemClick(category: string) {
        scrollBarStore.setScrollBar(category);
        router.push(`/?category=${category}`);
    }

    return (
        <div className="grid grid-rows-1 grid-flow-col gap-x-10 whitespace-nowrap scrollbar-thumb-red-600 scrollbar-thin scrollbar-thumb-rounded-md overflow-x-scroll select-none z-0 pb-2 pt-1 hover:cursor-pointer">
            {categoryIcons.map((category) => (
                <div
                    className={`flex flex-col space-y-1 justify-center items-center 
                    hover:cursor-pointer group 
                    text-gray-500 
                    hover:text-gray-800 
                    active:text-gray-600 
                    dark:text-slate-100 
                    dark:hover:text-gray-500 
                    dark:active:text-gray-300
                    ${
                        item == category.iconName &&
                        "text-gray-900 dark:text-slate-500"
                    }
                    ${
                        categoryFromURL == category.iconName &&
                        "text-gray-900 dark:text-slate-500"
                    }
                        `}
                    key={category.icon}
                    onClick={() => handleScrollItemClick(category.iconName)}
                >
                    <div>
                        <category.icon
                            size={31}
                            className="group-hover:scale-125 transition"
                        />
                    </div>

                    {/* underline ... */}
                    <span className="text-sm font-semibold">
                        {category.iconName}
                        <div
                            className={`w-full h-1 bg-gray-900 dark:bg-gray-500 rounded-full opacity-0 transition 
                                ${item == category.iconName && "opacity-100"}
                                ${
                                    categoryFromURL == category.iconName &&
                                    "opacity-100"
                                }
                                `}
                        />
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ScrollBar;
