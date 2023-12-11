"use client";

import ModalStore, { ModalEnum } from "@/app/store/modalStore";
import CategoryModal from "./1categoriesModal/CategoryModal";
import MapModal from "./2mapModal/MapModal";
import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import AmenitiesModal from "./3amenitiesModal/AmenitiesModal";
import PhotoModal from "./4photoModal.tsx/PhotoModal";
import DescribeModal from "./5describeModal/DescribeModal";
import PriceModal from "./6priceModal/PriceModal";

const MainModal = () => {
    const {
        handleSubmit,
        formState: { errors },
        register,
        getValues,
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
        }
    });

    function sumbit(data: any) {
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
        bodyContent = (
            <DescribeModal
                setValue={setValue}
                watch={watch}
                register={register}
            />
        );
    } else if (modalStore.currentModal === ModalEnum.PRICE) {
        bodyContent = (
            <PriceModal watch={watch} setValue={setValue} register={register} />
        );
    }
    return (
        <div>
            <Modal body={bodyContent} />
        </div>
    );
};
export default MainModal;
