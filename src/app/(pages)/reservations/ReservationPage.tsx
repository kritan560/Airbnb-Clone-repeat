"use client";

import Heading from "@/app/(components)/heading/Heading";
import Listing from "@/app/(components)/listing/Listing";
import DeleteConfirmationModal from "@/app/(components)/modal/DeleteConfirmationModal";
import DeleteConfirmStore from "@/app/store/deleteConfirmStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

type ReservationPageTypeProps = {
    listings: any;
};

const ReservationPage: React.FC<ReservationPageTypeProps> = ({ listings }) => {
    const deleteConfirmStore = DeleteConfirmStore();
    const router = useRouter();
    const [deleteId, setDeletId] = useState<string>("");

    function handleButtonAction(id: string) {
        deleteConfirmStore.onOpen();
        setDeletId(id);
    }

    function handleNoMatchButtonAction() {
        router.push("/");
    }

    function handleButtonPrimaryAction() {
        // remove the reservation
        axios
            .delete(`api/reservation/${deleteId}`)
            .then((res) => {
                console.log(res.data);
                router.refresh();
                toast("reservation deleted", { icon: "😿" });
                deleteConfirmStore.onClose();
            })
            .catch((err) => console.error(err));
    }

    return (
        <div>
            {/* display the heading only if there are reservations */}
            <Heading
                title="Reservation"
                subtitle="Your reservations are here"
            />
            <DeleteConfirmationModal
                buttonPrimaryLabel="Delete"
                buttonPrimaryAction={handleButtonPrimaryAction}
                buttonPrimaryIcon={MdDeleteForever}
                title="Are You Sure?"
                subtitle="are you sure you want to delete Reservation?"
            />

            <Listing
                listings={listings}
                buttonNeeded={true}
                buttonLabel="Delete Reservation"
                buttonAction={handleButtonAction}
                noMatchFoundbuttonLabel="Goto Homepage"
                noMatchFoundheadingLabel="Reserve some Airbnb to view list here"
                noMatchFoundButtonAction={handleNoMatchButtonAction}
            />
        </div>
    );
};

export default ReservationPage;
