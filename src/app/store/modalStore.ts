import { create } from "zustand";

type ModalStoreType = {
    currentModal: number;
    nextModal: () => void;
    previousModal: () => void;
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

export const ModalEnumLength = ModalEnumNumber.length

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
        }))
}));

export default ModalStore;
