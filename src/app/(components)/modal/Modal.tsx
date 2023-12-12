import { RxCross1 } from "react-icons/rx";

type ModalProps = {
    body: React.JSX.Element | undefined;
};

const Modal: React.FC<ModalProps> = ({ body }) => {
    return (
        <div
            className={`absolute inset-0 bg-slate-800/70 flex justify-center items-center overflow-y-auto`}
        >
            <div
                className={`bg-white h-fixed w-fixed flex justify-center items-center rounded-lg relative`}
            >
                <div className="absolute top-0 flex flex-col border-b gap-x-2 items-center py-4 w-full justify-center select-none">
                    <RxCross1
                        size={18}
                        className="hover:cursor-pointer absolute left-6 text-sm font-semibold"
                    />
                    <p>Airbnb Your Home</p>
                </div>
                <div className="absolute inset-5 top-16">{body}</div>
            </div>
        </div>
    );
};
export default Modal;
