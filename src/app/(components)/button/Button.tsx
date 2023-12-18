import React from "react";
import { IconType } from "react-icons";

type ButtonProps = {
    primaryLabel: string; // this should not be optional
    primaryAction: () => void; // this should not be optional
    currentModal?: number;
    stayBottom?: boolean; // will make button absolute bottom. relative to modal.
    class?: { bgSecondaryStyle?: string; bgPrimaryStyle?: string };
    icon?: IconType;
    iconSize?: number;
    secondaryLabel?: string;
    secondaryAction?: () => void;
};

const Button: React.FC<ButtonProps> = ({
    stayBottom,
    icon: Icon,
    primaryAction,
    primaryLabel,
    secondaryAction,
    secondaryLabel,
    class: Style,
    currentModal = 1,
    iconSize = 20
}) => {
    return (
        <div
            className={`${
                stayBottom && "absolute -bottom-2"
            } gap-x-4 flex justify-center bg-red w-full rounded-lg font-semibold text-white`}
        >
            {secondaryAction && currentModal > 1 ? (
                <button
                    onClick={secondaryAction}
                    className={`bg-blue-600 transition active:bg-blue-500 w-full py-2 rounded-lg select-none
                    ${Style?.bgSecondaryStyle}
                    `}
                >
                    {secondaryLabel}
                </button>
            ) : (
                ""
            )}
            <button
                onClick={primaryAction}
                className={`bg-red-600 transition active:bg-red-500 w-full py-2 rounded-lg select-none 
                ${Style?.bgPrimaryStyle}`}
            >
                <div className="flex gap-x-3 justify-center relative">
                    <span className="absolute left-4">
                        {Icon && <Icon size={iconSize} />}
                    </span>
                    {primaryLabel}
                </div>
            </button>
        </div>
    );
};
export default Button;
