import { useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

type AmenitiesProps = {
    title: string;
    subtitle: string;
    setValue: UseFormSetValue<FieldValues>;
    value: number;
    id: string;
};

const Amenities: React.FC<AmenitiesProps> = ({
    subtitle,
    title,
    setValue: setFromValue,
    value,
    id
}) => {
    const [count, setCount] = useState(value);

    const handleIncrement = useCallback(() => {
        setCount(count + 1);
    }, [value, count]);

    const handleDecrement = useCallback(() => {
        if (count <= 0) {
            setCount(count - 0);
        } else if (count > 0) {
            setCount(count - 1);
        }
    }, [value]);

    useEffect(() => {
        setFromValue(id, count);
    }, [count, id]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-1 select-none">
                    <span className="font-semibold">{title}</span>
                    <span className="text-slate-400 font-light text-sm">
                        {subtitle}
                    </span>
                </div>
                <div className="flex gap-x-1 items-center">
                    <FaPlusCircle
                        size={28}
                        onClick={() => handleIncrement()}
                        className="hover:cursor-pointer transition active:text-slate-700 text-slate-900"
                    />
                    <div className="w-6 flex justify-center text-lg select-none">
                        {value}
                    </div>
                    <FaMinusCircle
                        size={28}
                        onClick={() => handleDecrement()}
                        className="hover:cursor-pointer transition active:text-slate-700 text-slate-900"
                    />
                </div>
            </div>
            <hr className="w-fixed -ml-5 my-6" />
        </div>
    );
};
export default Amenities;
