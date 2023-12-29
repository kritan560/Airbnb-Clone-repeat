"use client";

import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type DateRangeModalProps = {
    handleChange: ({ selection }: RangeKeyDict) => void;
    state: {
        startDate: Date;
        endDate: Date;
        key: string;
    }[];
    disableDates?: Date[];
    theme: string | undefined;
    systemTheme: "dark" | "light" | undefined;
};

const DateRangeModal: React.FC<DateRangeModalProps> = ({
    handleChange,
    state,
    disableDates,
    systemTheme,
    theme
}) => {
    const [invertedColor, setInvertedColor] = useState<string>("");
    const [invert, setInvert] = useState<boolean>();

    useEffect(() => {
        if (theme == "dark") {
            setInvertedColor("#23d9d9");
            setInvert(true);
        } else if (theme == "light") {
            setInvert(false);
            setInvertedColor("#DC2626");
        } else if (theme == "system") {
            if (systemTheme == "dark") {
                setInvert(true);
                setInvertedColor("#23d9d9");
            } else if (systemTheme == "light") {
                setInvert(false);
                setInvertedColor("#DC2626");
            }
        }
    }, [theme]);

    return (
        <div className={invert ? "invert" : "invert-0"}>
            <DateRange
                className=""
                fixedHeight
                ranges={state}
                showDateDisplay={false}
                onChange={handleChange}
                date={new Date()}
                minDate={new Date()}
                direction="vertical"
                disabledDates={disableDates}
                rangeColors={[invertedColor]}
                // color="#DC2626"
            />
        </div>
    );
};
export default DateRangeModal;
