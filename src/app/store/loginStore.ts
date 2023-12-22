import { create } from "zustand";

type LoginSignupType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const LoginStore = create<LoginSignupType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

 
}));

export default LoginStore;
