import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import Body from "../../body/Body";
import Heading from "../../heading/Heading";

type PhotoProps = {
    title: string;
    subtitle: string;
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
};

const PhotoModal: React.FC<PhotoProps> = ({
    subtitle,
    title,
    setValue,
    watch
}) => {
    const result = watch("image");

    function handleUpload(data: any) {
        setValue("image", data.info.secure_url);
    }

    return (
        <div>
            <Heading title={title} subtitle={subtitle} />
            <Body>
                <CldUploadWidget
                    onUpload={handleUpload}
                    uploadPreset="okkk905j"
                    options={{ maxFiles: 1 }}
                >
                    {({ open }) => {
                        return (
                            <div
                                onClick={() =>
                                    open !== undefined ? open() : ""
                                }
                                className="border-4 border-dotted dark:border-gray-300 border-gray-400 h-full rounded-md flex justify-center items-center hover:cursor-pointer overflow-hidden"
                            >
                                {!result && (
                                    <>
                                        <div className="flex flex-col gap-y-1 items-center">
                                            <MdAddPhotoAlternate
                                                size={45}
                                                className="text-slate-600 dark:text-slate-300"
                                            />
                                            <span className="font-semibold text-sm text-slate-600 dark:text-slate-300">
                                                Click to upload
                                            </span>
                                        </div>
                                    </>
                                )}
                                {result && (
                                    <>
                                        <Image
                                            src={result}
                                            alt="house jpg"
                                            height={400}
                                            width={400}
                                            className="rounded-md"
                                            title="click to chage"
                                        />
                                    </>
                                )}
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </Body>
            {/* <Button /> */}
        </div>
    );
};
export default PhotoModal;
