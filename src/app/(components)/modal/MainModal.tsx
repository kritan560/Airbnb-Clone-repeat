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

const MainModal = () => {
    const {
        handleSubmit,
        formState: { errors, isValid, submitCount },
        register,
        watch,
        setValue
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

    console.log(submitCount);

    function submit(data: FieldValues) {
        if (modalStore.currentModal !== ModalEnumLength) {
            return modalStore.nextModal();
        }
        console.log(data);
    }

    const modalStore = ModalStore();

    let bodyContent;
    if (modalStore.currentModal === ModalEnum.CATEGORIES) {
        bodyContent = (
            <CategoryModal id="category" setValue={setValue} watch={watch} />
        );
    } else if (modalStore.currentModal === ModalEnum.MAP) {
        bodyContent = <MapModal id="map" setValue={setValue} watch={watch} />;
    } else if (modalStore.currentModal === ModalEnum.AMENITIES) {
        bodyContent = <AmenitiesModal setValue={setValue} watch={watch} />;
    } else if (modalStore.currentModal === ModalEnum.PHOTO) {
        bodyContent = <PhotoModal />;
    } else if (modalStore.currentModal === ModalEnum.DESCRIBE) {
        bodyContent = <DescribeModal register={register} error={errors} />;
    } else if (modalStore.currentModal === ModalEnum.PRICE) {
        bodyContent = <PriceModal watch={watch} register={register} />;
    }
    return (
        <div>
            <Modal
                body={
                    <>
                        {bodyContent}
                        <Button
                            handleSubmit={handleSubmit(submit)}
                            isValid={isValid}
                        />{" "}
                    </>
                }
            />
        </div>
    );
};
export default MainModal;
