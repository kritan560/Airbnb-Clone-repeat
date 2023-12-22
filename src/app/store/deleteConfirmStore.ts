import { create } from "zustand";

type DeletetConfirmType = {
    id: string ;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const DeleteConfirmStore = create<DeletetConfirmType>((set) => ({
    id: '',
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default DeleteConfirmStore;
