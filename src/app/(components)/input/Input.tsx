import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

type InputProps = {
    label: string;
    value?: number;
    setValue?: (value: string) => void;
    className?: string;
    type?: "textarea" | "text" | "number";
    register: UseFormRegister<FieldValues>;
};

const Input: React.FC<InputProps> = ({
    label,
    setValue,
    className,
    type,
    value,
    register
}) => {
    return (
        <div className={`relative`}>
            {type == "text" && (
                <input
                    // onChange={(e) => setValue(e.target.value)}
                    className={`w-full py-3 px-4 border rounded-md outline-none peer`}
                    type="text"
                    id=""
                    value={value}
                    {...register("title", {
                        required: {
                            message: "this field is required",
                            value: true
                        }
                    })}
                />
            )}
            {type == "textarea" && (
                <textarea
                    // onChange={(e) => setValue(e.target.value)}
                    className={`${className} w-full py-3 px-4 border rounded-md outline-none peer`}
                    id=""
                    value={value}
                    {...register("description", { required: true })}
                ></textarea>
            )}
            {type === "number" && (
                <>
                    <input
                        // onChange={(e) => setValue(e.target.value)}
                        className={`w-full py-3 px-4 border rounded-md outline-none peer pl-8 mt-[2px]`}
                        type="number"
                        // name=""
                        id=""
                        value={value}
                        {...register("price", { required: true })}
                    />
                    <span className="absolute left-4 top-3 text-lg font-semibold">
                        $
                    </span>
                </>
            )}
            <label
                htmlFor=""
                className="absolute left-4 font-semibold text-sm text-slate-400 peer-focus:scale-[.80] duration-[250] origin-left transition-transform"
            >
                {label}
            </label>
        </div>
    );
};
export default Input;
