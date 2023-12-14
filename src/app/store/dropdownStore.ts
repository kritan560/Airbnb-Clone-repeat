import { create } from "zustand";

type DropdownType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const DropdownStore = create<DropdownType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default DropdownStore;
