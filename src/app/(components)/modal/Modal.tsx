import { RxCross1 } from "react-icons/rx";

type ModalProps = {
    body: React.JSX.Element | undefined;
    modal: any;
    title: string;
};

const Modal: React.FC<ModalProps> = ({ body, modal, title }) => {
    const Store = modal();
    let bodyContent;
    bodyContent = (
        <div
            className={`absolute inset-0 flex justify-center items-center overflow-y-auto transition-all ease-in-out duration-300 h-full ${
                Store.isOpen ? "w-full bg-slate-800/70" : "h-0"
            }`}
        >
            <div
                className={`bg-white h-fixed w-fixed flex justify-center items-center rounded-lg relative`}
            >
                <div className="absolute top-0 flex flex-col border-b gap-x-2 items-center py-4 w-full justify-center select-none">
                    <RxCross1
                        size={18}
                        className="hover:cursor-pointer absolute left-6 text-sm font-semibold"
                        onClick={() => Store.onClose()}
                    />
                    <p className="font-semibold text-lg">{title}</p>
                </div>
                <div className="absolute inset-5 top-16">{body}</div>
            </div>
        </div>
    );
    return bodyContent;
};
export default Modal;
