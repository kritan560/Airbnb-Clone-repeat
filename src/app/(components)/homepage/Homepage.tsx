"use client";

import { ModelData } from "@prisma/client";
import { categoryIcons } from "../modal/1categoriesModal/CategoryModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

type HomepageProps = {
    modalsFromDB: ModelData[];
};

export default function Homepage({ modalsFromDB }: HomepageProps) {
    let firstToFourth = [];
    for (let i = 0; i < modalsFromDB.length; i += 5) {
        firstToFourth.push(modalsFromDB.slice(i, i + 5));
    }

    const router = useRouter();

    return (
        <>
            {/* scroll bar */}
            <div className="grid grid-rows-1 grid-flow-col gap-x-10 whitespace-nowrap scrollbar-thumb-red-600 scrollbar-thin scrollbar-thumb-rounded-md overflow-x-scroll select-none z-0 pb-3 pt-1 hover:cursor-pointer">
                {categoryIcons.map((category) => (
                    <div 
                        className="flex flex-col space-y-1 justify-center items-center text-gray-500 hover:cursor-pointer group hover:text-gray-800 active:text-gray-700"
                        key={category.icon}
                    >
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
            {/* modals from db */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-8 gap-y-6 mt-12">
                {modalsFromDB.map((item) => (
                    <div
                    key={item.id}
                        className="group hover:cursor-pointer"
                        onClick={() => router.push(`homepage/${item.id}`)}
                    >
                        <div className="overflow-hidden rounded-lg mb-1">
                            <Image
                                src={item.image}
                                width={500}
                                height={500}
                                alt="image"
                                className="w-full aspect-square transition group-hover:scale-110 group-active:scale-105"
                            />
                        </div>
                        <div className="font-semibold">{item.map}</div>
                        <div className="font-light">{item.category}</div>
                        <div>
                            <span className="font-semibold">${item.price}</span>
                            <span className="font-light ml-2">per Night</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
