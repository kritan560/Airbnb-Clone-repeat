import {
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import Body from "../../body/Body";
import Button from "../../button/Button";
import Heading from "../../heading/Heading";
import Input from "../../input/Input";

type DescribeModalType = {
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    register: UseFormRegister<FieldValues>;
};

const DescribeModal: React.FC<DescribeModalType> = ({
    setValue,
    watch,
    register
}) => {
    const watchTitle = watch("title");
    const watchDescription = watch("description");

    return (
        <div>
            <Heading
                title="How would you describe your place?"
                subtitle="Short and sweet works the best"
            />
            <Body className="flex flex-col justify-center">
                <Input
                    label="Title"
                    type="text"
                    // setValue={(e) => setValue("title", e)}
                    // value={watchTitle}
                    register={register}
                />
                <hr className="my-6" />
                <Input
                    type="textarea"
                    label="Description"
                    // setValue={(e) => setValue("description", e)}
                    // value={watchDescription}
                    className="h-32 "
                    register={register}
                />
            </Body>
            <Button />
        </div>
    );
};
export default DescribeModal;
