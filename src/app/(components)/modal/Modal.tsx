import ModalStore from "@/app/store/modalStore";
import { RxCross1 } from "react-icons/rx";

type ModalProps = {
    body: React.JSX.Element | undefined;
    modal: any;
    title: string;
};

const Modal: React.FC<ModalProps> = ({ body, modal, title }) => {
    const Store = modal();
    const modalStore = ModalStore();
    
    let bodyContent;

    bodyContent = (
        <div
            className={`inset-0 flex justify-center items-center transition-all duration-300 bg-slate-800/70 dark:bg-slate-500/70 overflow-y-clip fixed z-30 ${
                Store.isOpen ? "h-full" : "h-0"
            }`}
        >
            <div
                className={`bg-white dark:bg-slate-800 h-fixed w-fixed flex justify-center items-center rounded-lg relative`}
            >
                <div className="absolute top-0 flex flex-col border-b gap-x-2 items-center py-4 w-full justify-center select-none">
                    {modalStore.shouldCrossVisible && (
                        <RxCross1
                            size={18}
                            className="hover:cursor-pointer absolute left-6 text-sm font-semibold"
                            onClick={() => Store.onClose()}
                        />
                    )}
                    <p className="font-semibold text-lg">{title}</p>
                </div>
                <div className="absolute inset-5 top-16">{body}</div>
            </div>
        </div>
    );
    return bodyContent;
};
export default Modal;
