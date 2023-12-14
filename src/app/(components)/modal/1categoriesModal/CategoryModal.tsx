import { IoDiamondSharp } from "react-icons/io5";
import Heading from "../../heading/Heading";
import Body from "../../body/Body";
import {
    GiBarn,
    GiBoatFishing,
    GiCaveEntrance,
    GiDesert,
    GiGoblinCamp,
    GiJungle,
    GiWaterMill
} from "react-icons/gi";
import { MdCarRepair, MdStadium, MdTempleHindu } from "react-icons/md";
import {
    FaRegSnowflake,
    FaSchool,
    FaSkiing,
    FaUniversity
} from "react-icons/fa";
import { PiSwimmingPoolDuotone } from "react-icons/pi";
import { LiaHotelSolid } from "react-icons/lia";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useEffect, useRef } from "react";
import CategoryStore from "@/app/store/categoryStore";

type CategoryModalProps = {
    setValue: UseFormSetValue<FieldValues>;
    id: string;
    watch: UseFormWatch<FieldValues>;
    title: string;
    subtitle: string;
};

export const categoryIcons = [
    { icon: FaRegSnowflake, iconName: "Artic" },
    { icon: GiDesert, iconName: "Desert" },
    { icon: MdTempleHindu, iconName: "Temple" },
    { icon: FaSchool, iconName: "School" },
    { icon: FaUniversity, iconName: "University" },
    { icon: FaSkiing, iconName: "Skiing" },
    { icon: GiBoatFishing, iconName: "Fishing" },
    { icon: PiSwimmingPoolDuotone, iconName: "Swimming" },
    { icon: LiaHotelSolid, iconName: "Hotels" },
    { icon: IoDiamondSharp, iconName: "Luxury" },
    { icon: GiWaterMill, iconName: "WaterMill" },
    { icon: GiCaveEntrance, iconName: "Cave" },
    { icon: GiBarn, iconName: "Barn" },
    { icon: GiGoblinCamp, iconName: "Camping" },
    { icon: MdStadium, iconName: "Stadium" },
    { icon: MdCarRepair, iconName: "Car Repair" },
    { icon: GiJungle, iconName: "Jungle Safari" }
];

const CategoryModal: React.FC<CategoryModalProps> = ({
    setValue,
    id,
    watch,
    title,
    subtitle
}) => {
    type CategoryIcon = typeof categoryIcons extends (infer U)[]
        ? U
        : typeof categoryIcons;

    let firstAndSecondIcons = [];
    for (let i = 0; i < categoryIcons.length; i += 2) {
        firstAndSecondIcons.push(categoryIcons.slice(i, i + 2));
    }

    const categoryValue: CategoryIcon | undefined = watch(id);

    // handling scroll position of category Modal
    const categoryStore = CategoryStore();
    const categoryScrollRef = useRef<HTMLDivElement>(null);

    function handleScroll() {
        if (categoryScrollRef.current) {
            categoryStore.setScrollPosition(
                categoryScrollRef.current.scrollTop
            );
        }
    }

    useEffect(() => {
        const categoryScrollRefCurrent = categoryScrollRef.current;
        categoryScrollRefCurrent &&
            ((categoryScrollRefCurrent.scrollTop =
                categoryStore.scrollPosition),
            categoryScrollRefCurrent.addEventListener("scroll", handleScroll));

        return () => {
            categoryScrollRefCurrent &&
                categoryScrollRefCurrent.removeEventListener(
                    "scroll",
                    handleScroll
                );
        };
    }, []);

    return (
        <div>
            <Heading title={title} subtitle={subtitle} />
            <Body className="">
                <div
                    ref={categoryScrollRef}
                    className="scrollbar-thumb-red-600 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-lg -mr-4 pr-2 scroll-smooth h-full"
                >
                    {firstAndSecondIcons.map((items, index) => (
                        <div key={index} className="flex gap-x-4 mt-4">
                            {items.map((item, index) => (
                                <div
                                    onClick={() => setValue(id, item)}
                                    key={index}
                                    className={`border-2 px-4 py-3 rounded-lg w-full transition duration-100 hover:border-slate-400 active:border-slate-500 ${
                                        categoryValue &&
                                        categoryValue.iconName ===
                                            item.iconName &&
                                        "border-slate-500"
                                    }`}
                                >
                                    <item.icon size={22} />
                                    <span>{item.iconName}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Body>
            {/* <Button  /> */}
        </div>
    );
};
export default CategoryModal;
