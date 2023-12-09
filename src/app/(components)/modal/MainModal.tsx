'use client'

import CategoryModal from "./1categoriesModal/CategoryModal";
import MapModal from "./2mapModal/MapModal";
import Modal from "./Modal";

const MainModal = () => {
    let bodyContent ;
    // bodyContent = <CategoryModal />;
    bodyContent = <MapModal />;
    return (
        <div>
            <Modal body={bodyContent} />
        </div>
    );
};
export default MainModal;
