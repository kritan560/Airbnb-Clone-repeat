import { create } from "zustand";

type ScrollBarType = {
    scrollBar: string | undefined;
    setScrollBar: (value: string | undefined) => void;
};

const ScrollBarStore = create<ScrollBarType>((set) => ({
    scrollBar: undefined,
    setScrollBar: (value) => set({ scrollBar: value })
}));

export default ScrollBarStore;
