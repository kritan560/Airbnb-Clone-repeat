"use client";

import ModalStore, { ModalEnum, ModalEnumLength } from "@/app/store/modalStore";
import CategoryModal from "./1categoriesModal/CategoryModal";
import MapModal from "./2mapModal/MapModal";
import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import AmenitiesModal from "./3amenitiesModal/AmenitiesModal";
import PhotoModal from "./4photoModal.tsx/PhotoModal";
import DescribeModal from "./5describeModal/DescribeModal";
import PriceModal from "./6priceModal/PriceModal";
import Button from "../button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryStore from "@/app/store/categoryStore";
import { useRouter } from "next/navigation";

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

    function submit(data: FieldValues) {
        if (modalStore.currentModal !== ModalEnumLength) {
            return modalStore.nextModal();
        }

        // converting the price string -> int
        const datas = { ...data, price: parseInt(data.price) };

        // clear all the form data and close modal if submit successful
        if (isValid && isSubmitSuccessful) {
            axios
                .post("/api/modal", datas)
                .then(() => {
                    toast.success("data saved to DB", { duration: 5000 });
                    reset();
                    categoryStore.setScrollPosition(0);
                    modalStore.resetModal();
                    router.refresh();
                })
                .catch((err) => {
                    console.error(err), toast.error("something went wrong");
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
    return (
        <Modal
            title="Airbnb Your Home"
            modal={ModalStore}
            body={
                <>
                    {bodyContent}
                    <Button
                        handleSubmit={handleSubmit(submit)}
                        store={ModalStore}
                        storeEnumLength={ModalEnumLength}
                    />
                </>
            }
        />
    );
};
export default MainModal;
