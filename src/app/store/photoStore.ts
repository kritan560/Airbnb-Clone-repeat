import { create } from "zustand";

type PhotoStoreType = {
    photoSrc: string | null;
    onPhotoChange: (src: string) => void;
};

const PhotoStore = create<PhotoStoreType>((set) => ({
    photoSrc: null,
    onPhotoChange: (src) => set({ photoSrc: src })
}));

export default PhotoStore