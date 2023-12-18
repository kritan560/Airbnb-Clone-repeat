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
import DateRangeModal from "./7_dateRangeModal/DateRangeModal";
import { differenceInCalendarDays, differenceInDays } from "date-fns";

const FilterModal = () => {
    const filterModalStore = FilterModalStore();
    const { setValue, watch, handleSubmit } = useForm<FieldValues>({
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
        filterModalStore.setGuest(data.guests);
        filterModalStore.setLocation(data.maps ? data.maps.value : undefined);
        const days = differenceInCalendarDays(
            data.calendar.selection.endDate,
            data.calendar.selection.startDate
        );
        filterModalStore.setDays(days);
        filterModalStore.onClose();
    }

    let bodyContent;
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
    } else if (filterModalStore.currentModal === FilterModalEnum.DATE) {
        bodyContent = (
            <DateRangeModal
                title={"when do you plan to go?"}
                subtitle={"make sure everyone on Board"}
                setValue={setValue}
                watch={watch}
            />
        );
    }

    function handleSecondaryAction() {
        filterModalStore.previousModal();
    }

    return (
        <Modal
            modal={FilterModalStore}
            title="Filter"
            body={
                <>
                    {bodyContent}
                    <Button
                        currentModal={filterModalStore.currentModal}
                        stayBottom
                        primaryLabel={
                            filterModalStore.currentModal ==
                            filterModalEnumLength
                                ? "Create"
                                : "Next"
                        }
                        secondaryLabel="Previous"
                        primaryAction={handleSubmit(submit)}
                        secondaryAction={handleSecondaryAction}
                        class={{
                            bgSecondaryStyle:
                                "bg-inherit border-2 active:bg-inherit active:border-gray-900 border-gray-500 hover:border-gray-700 text-black"
                        }}
                    />
                </>
            }
        />
    );
};
export default FilterModal;
