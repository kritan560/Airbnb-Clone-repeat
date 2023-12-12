import { MdAddPhotoAlternate } from "react-icons/md";
import Body from "../../body/Body";
import Heading from "../../heading/Heading";

const PhotoModal = () => {
    return (
        <div>
            <Heading
                title="Add a photo of your place"
                subtitle="Show guest what your place looks like"
            />
            <Body>
                <div className="border-4 border-dotted h-full rounded-md flex justify-center items-center hover:cursor-pointer">
                    <div className="flex flex-col gap-y-1 items-center">
                        <MdAddPhotoAlternate
                            size={45}
                            className="text-slate-600"
                        />
                        <span className="font-semibold text-sm text-slate-600">
                            Click to upload
                        </span>
                    </div>
                </div>
            </Body>
            {/* <Button /> */}
        </div>
    );
};
export default PhotoModal;
