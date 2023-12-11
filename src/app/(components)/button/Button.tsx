import ModalStore, { ModalEnumLength } from "@/app/store/modalStore";
import React from "react";

type ButtonProps = {
    disabled?: boolean;
    //     primaryAction?: () => void;
    //     primaryLabel: string;
    //     secondaryLabel?: string;
    // secondaryAction?: () => void;
    className?: string;
    handleCheck? : () => void
};

const Button: React.FC<ButtonProps> = ({
    disabled,
    // primaryAction,
    // primaryLabel,
    // secondaryAction,
    // secondaryLabel,
    className
}) => {
    const modalStore = ModalStore();

    function handlePrimaryClick() {
        modalStore.nextModal();
    }

    function handleSecondaryClick() {
        modalStore.previousModal();
    }
    return (
        <div
            className={`absolute -bottom-2 gap-x-4 flex justify-center bg-red w-full py-2 rounded-lg`}
        >
            {modalStore.currentModal > 1 &&
            modalStore.currentModal <= ModalEnumLength ? (
                <button
                    onClick={handleSecondaryClick}
                    disabled={disabled}
                    className={` ${
                        disabled && "bg-slate-300"
                    } bg-blue-400 w-full py-2 rounded-lg select-none`}
                >
                    {"Previous"}
                </button>
            ) : (
                ""
            )}
            <button
                onClick={handlePrimaryClick}
                disabled={disabled}
                className={` ${
                    disabled && "bg-slate-300"
                } bg-red-400 w-full py-2 rounded-lg select-none`}
            >
                {modalStore.currentModal === ModalEnumLength
                    ? "Create"
                    : "Next"}
            </button>
        </div>
    );
};
export default Button;
