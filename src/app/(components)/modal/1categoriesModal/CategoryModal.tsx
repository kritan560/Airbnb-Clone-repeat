"use client";

import { IoAddCircleSharp } from "react-icons/io5";
import Button from "../../button/Button";
import Heading from "../../heading/Heading";
import Body from "../../body/Body";

const CategoryModal = () => {
    const categoryIcons = [
        { icon: IoAddCircleSharp, iconName: "circle sharp0" },
        { icon: IoAddCircleSharp, iconName: "circle sharp1" },

        { icon: IoAddCircleSharp, iconName: "circle sharp2" },
        { icon: IoAddCircleSharp, iconName: "circle sharp3" },
        { icon: IoAddCircleSharp, iconName: "circle sharp3" },
        { icon: IoAddCircleSharp, iconName: "circle sharp3" },
        { icon: IoAddCircleSharp, iconName: "circle sharp3" },
        { icon: IoAddCircleSharp, iconName: "circle sharp3" },
        { icon: IoAddCircleSharp, iconName: "circle sharp3" },
        { icon: IoAddCircleSharp, iconName: "circle sharp3" },

        { icon: IoAddCircleSharp, iconName: "circle sharp4" }
    ];

    let firstAndSecondIcons = [];

    for (let i = 0; i < categoryIcons.length; i += 2) {
        firstAndSecondIcons.push(categoryIcons.slice(i, i + 2));
    }
    return (
        <div>
            <Heading
                title="Which of this best describe your place"
                subtitle="Pick a category"
            />
            <Body className="scrollbar-thumb-red-400 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-lg -mr-4 scroll-smooth">
                {firstAndSecondIcons.map((items, index) => (
                    <div key={index} className="flex gap-x-4 mt-4">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="border px-4 py-3 rounded-lg w-full"
                            >
                                <item.icon />
                                <span>{item.iconName}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </Body>

            <Button
                disabled={false}
                // className="bg-red w-full bg-red-400 py-2 rounded-lg"
                primaryLabel="next"
            />
        </div>
    );
};
export default CategoryModal;
