"use client";

import DeleteConfirmStore from "@/app/store/deleteConfirmStore";
import axios from "axios";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { RxCross1 } from "react-icons/rx";
import Body from "../body/Body";
import Button from "../button/Button";
import Heading from "../heading/Heading";
import {
    EmojiToast,
    FAVORITE_REMOVED_ICON,
    LISTING_DELETE
} from "../toast/Toast";
import Modal from "./Modal";

type DeleteConfirmationModalType = {
    title: string;
    subtitle: string;
    buttonPrimaryAction: () => void;
    buttonPrimaryLabel: string;
    buttonPrimaryIcon?: IconType;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalType> = ({
    buttonPrimaryAction,
    buttonPrimaryIcon,
    buttonPrimaryLabel,
    subtitle,
    title
}) => {
    let bodyContent;
    const router = useRouter();
    const deleteConfirmStore = DeleteConfirmStore();
    const { theme, systemTheme } = useTheme();

    function handleDelete() {
        // remove the listing
        axios
            .delete(`api/listing/${deleteConfirmStore.id}`)
            .then((res) => {
                router.refresh();
                deleteConfirmStore.onClose();
                EmojiToast(theme, systemTheme, LISTING_DELETE, FAVORITE_REMOVED_ICON);
            })
            .catch((err) => console.error("something went wrong"));
    }

    // this is not passed via props because this is static the value won't need to be changed.
    // the only function of handle not delet is to close the confirmation store.
    function handleNotDelete() {
        deleteConfirmStore.onClose();
    }

    bodyContent = (
        <>
            <Heading title={title} subtitle={subtitle} />
            <Body className="flex h-fit gap-x-4 ">
                <Button
                    primaryAction={() => buttonPrimaryAction()}
                    primaryLabel={buttonPrimaryLabel}
                    textSize="normal"
                    icon={buttonPrimaryIcon}
                    class={{ bgPrimaryStyle: "" }}
                />
                {/* this is going to be static type. not dynamic one. */}
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
