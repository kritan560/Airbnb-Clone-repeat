import { create } from "zustand";

type FilterModalType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    currentModal: number;
    nextModal: () => void;
    previousModal: () => void;
};

export enum FilterModalEnum {
    MAP = 1,
    DATE,
    AMENITIES
}

const filterModalNumbers = Object.keys(FilterModalEnum)
    .map((item) => parseInt(item))
    .filter((item) => !isNaN(item));

export const filterModalEnumLength = filterModalNumbers.length;

const FilterModalStore = create<FilterModalType>((set) => ({
    isOpen: false,
    currentModal: 1,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    nextModal: () =>
        set((state) => ({
            currentModal:
                state.currentModal === FilterModalEnum.AMENITIES
                    ? state.currentModal + 0
                    : state.currentModal + 1
        })),
    previousModal: () =>
        set((state) => ({
            currentModal:
                state.currentModal === FilterModalEnum.MAP
                    ? state.currentModal - 0
                    : state.currentModal - 1
        }))
}));

export default FilterModalStore;
