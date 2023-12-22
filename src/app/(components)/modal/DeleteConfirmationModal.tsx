"use client";

import React from "react";
import Modal from "./Modal";
import Heading from "../heading/Heading";
import Body from "../body/Body";
import DeleteConfirmStore from "@/app/store/deleteConfirmStore";
import Button from "../button/Button";
import { MdDeleteForever } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteConfirmationModal = () => {
    let bodyContent;
    const router = useRouter();
    const deleteConfirmStore = DeleteConfirmStore();

    function handleDelete() {
        // remove the listing
        axios
            .delete(`api/listing/${deleteConfirmStore.id}`)
            .then((res) => {
                console.log(res.data);
                router.refresh();
                toast("listing deleted", { icon: "😿" });
                deleteConfirmStore.onClose();
            })
            .catch((err) => console.error(err));
    }

    function handleNotDelete() {
        deleteConfirmStore.onClose();
    }

    bodyContent = (
        <>
            <Heading
                title="Delete Property?"
                subtitle="Are you sure you want to delete your property?"
            />
            <Body className="flex h-fit gap-x-4 ">
                <Button
                    primaryAction={() => handleDelete()}
                    primaryLabel="Yes"
                    textSize="normal"
                    icon={MdDeleteForever}
                    class={{ bgPrimaryStyle: "" }}
                />
                <Button
                    primaryAction={() => handleNotDelete()}
                    primaryLabel="No"
                    textSize="normal"
                    icon={RxCross1}
                    class={{ bgPrimaryStyle: "bg-green-600" }}
                />
            </Body>
        </>
    );
    return (
        <div>
            <Modal
                body={bodyContent}
                modal={DeleteConfirmStore}
                title="Delete"
            />
        </div>
    );
};

export default DeleteConfirmationModal;
