import { MdAddPhotoAlternate } from "react-icons/md";
import Body from "../../body/Body";
import Heading from "../../heading/Heading";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dapm1y4jh"

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
                                className="border-4 border-dotted h-full rounded-md flex justify-center items-center hover:cursor-pointer overflow-hidden"
                            >
                                {!result && (
                                    <>
                                        <div className="flex flex-col gap-y-1 items-center">
                                            <MdAddPhotoAlternate
                                                size={45}
                                                className="text-slate-600"
                                            />
                                            <span className="font-semibold text-sm text-slate-600">
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
