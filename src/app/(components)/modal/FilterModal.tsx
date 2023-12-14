"use client";

import FilterModalStore, {
    FilterModalEnum,
    filterModalEnumLength
} from "@/app/store/filterModalStore";
import Modal from "./Modal";
import MapModal from "./2mapModal/MapModal";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../button/Button";
import AmenitiesModal from "./3amenitiesModal/AmenitiesModal";

const FilterModal = () => {
    const filterModalStore = FilterModalStore();
    let bodyContent;
    const {
        setValue,
        watch,
        handleSubmit,
    } = useForm<FieldValues>({
        mode: "all",
        defaultValues: {
            guests: 1,
            rooms: 1,
            bedrooms: 1
        }
    });

    function submit(data: FieldValues) {
        if (filterModalStore.currentModal !== filterModalEnumLength) {
            return filterModalStore.nextModal();
        }
        console.log(data);
    }

    if (filterModalStore.currentModal === FilterModalEnum.MAP) {
        bodyContent = (
            <MapModal
                id="maps"
                setValue={setValue}
                watch={watch}
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
        );
    } else if (filterModalStore.currentModal === FilterModalEnum.AMENITIES) {
        bodyContent = (
            <AmenitiesModal
                setValue={setValue}
                subtitle="Find your perfect place!"
                title="More Information"
                watch={watch}
            />
        );
    }
    return (
        <Modal
            modal={FilterModalStore}
            title="Filter"
            body={
                <>
                    {bodyContent}
                    <Button
                        handleSubmit={handleSubmit(submit)}
                        store={FilterModalStore}
                        storeEnumLength={filterModalEnumLength}
                    />{" "}
                </>
            }
        />
    );
};
export default FilterModal;
