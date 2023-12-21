import { create } from "zustand";

type DeletetConfirmType = {
    id: string | number | null;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const DeleteConfirmStore = create<DeletetConfirmType>((set) => ({
    id: null,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default DeleteConfirmStore;
