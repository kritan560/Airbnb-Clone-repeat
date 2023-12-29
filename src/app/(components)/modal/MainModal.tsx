"use client";

import CategoryStore from "@/app/store/categoryStore";
import ModalStore, { ModalEnum, ModalEnumLength } from "@/app/store/modalStore";
import axios from "axios";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../button/Button";
import {
    DB_SAVED,
    ERROR_MESSAGE,
    ErrorToast,
    SuccessToast
} from "../toast/Toast";
import CategoryModal from "./1categoriesModal/CategoryModal";
import MapModal from "./2mapModal/MapModal";
import AmenitiesModal from "./3amenitiesModal/AmenitiesModal";
import PhotoModal from "./4photoModal.tsx/PhotoModal";
import DescribeModal from "./5describeModal/DescribeModal";
import PriceModal from "./6priceModal/PriceModal";
import Modal from "./Modal";

const MainModal = () => {
    const {
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isValid },
        register,
        watch,
        setValue,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            guests: 1,
            rooms: 1,
            bedrooms: 1,
            title: "",
            description: "",
            price: 1
        },
        mode: "all"
    });

    const modalStore = ModalStore();
    const categoryStore = CategoryStore();
    const router = useRouter();
    const { theme, systemTheme } = useTheme();

    function submit(data: FieldValues) {
        if (modalStore.currentModal !== ModalEnumLength) {
            return modalStore.nextModal();
        }

        // converting the price string -> int
        const datas = { ...data, price: parseInt(data.price) };

        // clear all the form data and close modal if submit successful
        if (isValid && isSubmitSuccessful) {
            axios
                .post("/api/listing", datas)
                .then(() => {
                    reset();
                    categoryStore.setScrollPosition(0);
                    modalStore.resetModal();
                    router.refresh();
                    SuccessToast(theme, systemTheme, DB_SAVED);
                })
                .catch((err) => {
                    // console.error("something went wrong"),
                        ErrorToast(theme, systemTheme, ERROR_MESSAGE);
                })
                .finally(() => {
                    modalStore.onClose();
                });
        }
    }

    let bodyContent;
    if (modalStore.currentModal === ModalEnum.CATEGORIES) {
        bodyContent = (
            <CategoryModal
                id="category"
                setValue={setValue}
                watch={watch}
                title={"Which of this best describe your place?"}
                subtitle={"Pick a category"}
            />
        );
    } else if (modalStore.currentModal === ModalEnum.MAP) {
        bodyContent = (
            <MapModal
                id="map"
                setValue={setValue}
                watch={watch}
                title="Where is Your place Located"
                subtitle="Help guests find you!"
            />
        );
    } else if (modalStore.currentModal === ModalEnum.AMENITIES) {
        bodyContent = (
            <AmenitiesModal
                setValue={setValue}
                watch={watch}
                title="Share some basic about your place"
                subtitle="What amenities do you have?"
            />
        );
    } else if (modalStore.currentModal === ModalEnum.PHOTO) {
        bodyContent = (
            <PhotoModal
                title={"Add Photo Of Your Place"}
                subtitle={"Show Guests What Your place Look Like"}
                setValue={setValue}
                watch={watch}
            />
        );
    } else if (modalStore.currentModal === ModalEnum.DESCRIBE) {
        bodyContent = (
            <DescribeModal
                register={register}
                error={errors}
                title={"How would you describe your place?"}
                subtitle={"Short and sweet description!"}
            />
        );
    } else if (modalStore.currentModal === ModalEnum.PRICE) {
        bodyContent = (
            <PriceModal
                watch={watch}
                register={register}
                title={"Now Set your Price $"}
                subtitle={"How much do you charge per night?"}
            />
        );
    }

    function handleSecondaryAction() {
        modalStore.previousModal();
    }

    return (
        <Modal
            title="Airbnb Your Home"
            modal={ModalStore}
            body={
                <>
                    {bodyContent}
                    <Button
                        // handleSubmit={handleSubmit(submit)}
                        // store={ModalStore}
                        // storeEnumLength={ModalEnumLength}
                        stayBottom
                        primaryAction={handleSubmit(submit)}
                        primaryLabel={
                            modalStore.currentModal === ModalEnumLength
                                ? "Create"
                                : "Next"
                        }
                        secondaryAction={handleSecondaryAction}
                        secondaryLabel="Previous"
                        class={{
                            bgSecondaryStyle: `bg-inherit border-2 active:bg-inherit 
                            text-black 
                            border-gray-500 

                            active:border-gray-900 
                            hover:border-gray-700 
                            
                            dark:text-gray-300
                            dark:border-gray-300
                            dark:hover:border-gray-500
                            dark:active:border-gray-300
                            `,
                            bgPrimaryStyle: `
                            hover:bg-red-700 
                            active:bg-red-600`
                        }}
                        currentModal={modalStore.currentModal}
                    />
                </>
            }
        />
    );
};
export default MainModal;
