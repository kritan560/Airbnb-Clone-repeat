import { create } from "zustand";

type FilterModalType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

    currentModal: number;
    nextModal: () => void;
    previousModal: () => void;

    guest: number | undefined;
    location: string | undefined;
    days: number | undefined;
    setGuest: (guest: number | undefined) => void;
    setLocation: (location: string | undefined) => void;
    setDays: (days: number | undefined) => void;
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
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

    currentModal: 1,
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
        })),

    guest: undefined,
    days: undefined,
    location: undefined,
    setDays: (value) => set({ days: value }),
    setLocation: (value) => set({ location: value }),
    setGuest: (value) => set({ guest: value })
}));

export default FilterModalStore;
