import ModalStore, { ModalEnumLength } from "@/app/store/modalStore";
import React from "react";

type ButtonProps = {
    isValid: boolean;
    handleSubmit: () => void;
};

const Button: React.FC<ButtonProps> = ({ handleSubmit }) => {
    const modalStore = ModalStore();

    function handlePrimaryClick() {
        handleSubmit();
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
                    className={`bg-blue-400 w-full py-2 rounded-lg select-none`}
                >
                    {"Previous"}
                </button>
            ) : (
                ""
            )}
            <button
                onClick={handlePrimaryClick}
                className={`bg-red-400 w-full py-2 rounded-lg select-none`}
            >
                {modalStore.currentModal === ModalEnumLength
                    ? "Create"
                    : "Next"}
            </button>
        </div>
    );
};
export default Button;
