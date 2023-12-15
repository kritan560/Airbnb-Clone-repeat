import { create } from "zustand";

type ModalStoreType = {
    currentModal: number;
    nextModal: () => void;
    previousModal: () => void;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    /**
     * reset the currentModal to CATEGORIES
     */
    resetModal : () => void;
};

export enum ModalEnum {
    CATEGORIES = 1,
    MAP,
    AMENITIES,
    PHOTO,
    DESCRIBE,
    PRICE
}

const ModalEnumNumber = Object.keys(ModalEnum)
    .map((item) => parseInt(item))
    .filter((num) => !isNaN(num));

export const ModalEnumLength = ModalEnumNumber.length;

const ModalStore = create<ModalStoreType>((set) => ({
    currentModal: 1,
    nextModal: () =>
        set((state) => ({
            currentModal:
                state.currentModal == ModalEnum.PRICE
                    ? state.currentModal + 0
                    : state.currentModal + 1
        })),
    previousModal: () =>
        set((state) => ({
            currentModal:
                state.currentModal == ModalEnum.CATEGORIES
                    ? state.currentModal - 0
                    : state.currentModal - 1
        })),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    resetModal : () => set({currentModal : ModalEnum.CATEGORIES })
}));

export default ModalStore;
