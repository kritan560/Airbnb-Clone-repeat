import React from "react";

type ButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    primaryLabel: string;
    secondaryLabel?: string;
    secondaryAction?: () => void;
    className?: string;
};

const Button: React.FC<ButtonProps> = ({
    disabled,
    onClick,
    primaryLabel,
    secondaryAction,
    secondaryLabel,
    className
}) => {
    return (
        <div className="absolute bottom-0 w-full">
            <button
                disabled={disabled}
                className={`${className} ${disabled && "bg-slate-300"}`}
            >
                {primaryLabel}
            </button>
        </div>
    );
};
export default Button;
