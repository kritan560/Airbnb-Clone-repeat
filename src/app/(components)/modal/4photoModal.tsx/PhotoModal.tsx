import { MdAddPhotoAlternate } from "react-icons/md";
import Body from "../../body/Body";
import Heading from "../../heading/Heading";
import { CldUploadWidget } from "next-cloudinary";
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dapm1y4jh"

type PhotoProps = {
    title: string;
    subtitle: string;
};

const PhotoModal: React.FC<PhotoProps> = ({ subtitle, title }) => {
    function handleUpload(){
        
    }
    return (
        <div>
            <Heading title={title} subtitle={subtitle} />
            <Body>
                <CldUploadWidget
                    uploadPreset="okkk905j"
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                >
                    {({ open }) => {
                        return (
                            <>
                                <div
                                    onClick={() => open()}
                                    className="border-4 border-dotted h-full rounded-md flex justify-center items-center hover:cursor-pointer"
                                >
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
                            </>
                        );
                    }}
                </CldUploadWidget>
            </Body>
            {/* <Button /> */}
        </div>
    );
};
export default PhotoModal;
