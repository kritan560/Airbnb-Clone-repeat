import React from "react";

type ButtonProps = {
    handleSubmit: () => void;
    store: any;
    storeEnumLength: number;
};

const Button: React.FC<ButtonProps> = ({
    handleSubmit,
    store,
    storeEnumLength
}) => {
    const modalStore = store();

    function handlePrimaryClick() {
        handleSubmit();
    }

    function handleSecondaryClick() {
        modalStore.previousModal();
    }
    return (
        <div
            className={`absolute -bottom-2 gap-x-4 flex justify-center bg-red w-full py-2 rounded-lg font-semibold text-white`}
        >
            {modalStore.currentModal > 1 &&
            modalStore.currentModal <= storeEnumLength ? (
                <button
                    onClick={handleSecondaryClick}
                    className={`bg-blue-600 transition active:bg-blue-500 w-full py-2 rounded-lg select-none`}
                >
                    {"Previous"}
                </button>
            ) : (
                ""
            )}
            <button
                onClick={handlePrimaryClick}
                className={`bg-red-600 transition active:bg-red-500 w-full py-2 rounded-lg select-none`}
            >
                {modalStore.currentModal === storeEnumLength
                    ? "Create"
                    : "Next"}
            </button>
        </div>
    );
};
export default Button;
