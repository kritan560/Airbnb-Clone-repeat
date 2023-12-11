import { RefObject, useRef } from "react";
import { create } from "zustand";

type CategoryType = {
    scrollPosition: number;
    setScrollPosition: (value: number) => void;
};

const CategoryStore = create<CategoryType>((set) => ({
    scrollPosition: 0,
    setScrollPosition: (value) => set({ scrollPosition: value })
}));

export default CategoryStore;
