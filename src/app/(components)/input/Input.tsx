import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
    id: string;
    label: string;
    register: UseFormRegister<FieldValues>;
    value?: string | number;
    className?: string;
    type?: "textarea" | "text" | "number" | "email" | "password";
    error?: FieldErrors;
};

const Input: React.FC<InputProps> = ({
    label,
    value,
    className,
    type,
    register,
    error,
    id
}) => {
    const er = error && error[id]?.message;

    let inputBodyContent;
    if (type == "number") {
        inputBodyContent = (
            <>
                <input
                    className={`w-full py-3 px-4 border rounded-md outline-none peer pl-8 mt-[2px] ${
                        er && "border-red-500"
                    }`}
                    type="number"
                    value={value}
                    {...register(id, { required: true })}
                />
                <span className="absolute left-4 top-3 text-lg font-semibold">
                    $
                </span>
            </>
        );
    } else if (type == "text") {
        inputBodyContent = (
            <input
                className={`w-full py-3 px-4 border rounded-md outline-none peer ${className} ${
                    er && "border-red-500"
                }`}
                type="text"
                value={value}
                {...register(id, {
                    required: {
                        message: "this title field is required",
                        value: true
                    }
                })}
            />
        );
    } else if (type == "password") {
        inputBodyContent = (
            <input
                className={`w-full py-3 px-4 border rounded-md outline-none peer ${className} ${
                    er && "border-red-500"
                }`}
                type="password"
                value={value}
                {...register(id, {
                    required: {
                        message: "this title field is required",
                        value: true
                    }
                })}
            />
        );
    } else if (type == "email") {
        inputBodyContent = (
            <input
                className={`w-full py-3 px-4 border rounded-md outline-none peer ${className} ${
                    er && "border-red-500"
                }`}
                type="text"
                value={value}
                {...register(id, {
                    required: {
                        message: "this title field is required",
                        value: true
                    }
                })}
            />
        );
    } else if (type == "textarea") {
        inputBodyContent = (
            <textarea
                className={`${className} resize-none w-full py-3 px-4 border rounded-md outline-none peer ${
                    er && "border-red-500"
                }`}
                value={value}
                {...register(id, {
                    required: {
                        message: "this description field is required",
                        value: true
                    }
                })}
            />
        );
    }

    return (
        <div className={`relative`}>
            {inputBodyContent}
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
