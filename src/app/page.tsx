"use client";

import { categoryIcons } from "./(components)/modal/1categoriesModal/CategoryModal";

export default function Home() {
    return (
        <>
            <div className="flex gap-x-10 whitespace-nowrap scrollbar-thumb-red-600 scrollbar-thin scrollbar-thumb-rounded-md overflow-x-scroll select-none z-0">
                {categoryIcons.map((category) => (
                    <div className="flex flex-col space-y-1 mt-1 justify-center items-center text-gray-500 hover:cursor-pointer group hover:text-gray-800 active:text-gray-700" key={category.icon}>
                        {
                            <category.icon
                                size={31}
                                className="group-hover:scale-125 transition"
                            />
                        }
                        <span className="text-sm font-semibold ">
                            {category.iconName}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}
