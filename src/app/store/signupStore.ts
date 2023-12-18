import { create } from "zustand";

type SignUpStoreType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const SignUpStore = create<SignUpStoreType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default SignUpStore;
