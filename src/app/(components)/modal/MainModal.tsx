import CategoryModal from "./1categoriesModal/CategoryModal";
import Modal from "./Modal";

const MainModal = () => {
    let bodyContent = <CategoryModal />;
    return (
        <div>
            <Modal body={bodyContent} />
        </div>
    );
};
export default MainModal;
