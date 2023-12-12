import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Body from "../../body/Body";
import Heading from "../../heading/Heading";
import Input from "../../input/Input";

type DescribeModalType = {
    register: UseFormRegister<FieldValues>;
    error: FieldErrors;
};

const DescribeModal: React.FC<DescribeModalType> = ({ register, error }) => {
    return (
        <div>
            <Heading
                title="How would you describe your place?"
                subtitle="Short and sweet works the best"
            />
            <Body className="flex flex-col justify-center">
                <Input
                    id="title"
                    type="text"
                    label="Title"
                    className={``}
                    register={register}
                    error={error}
                />
                <hr className="my-6" />
                <Input
                    id="description"
                    type="textarea"
                    label="Description"
                    className={`h-32 ${""}`}
                    register={register}
                    error={error}
                />
            </Body>
            {/* <Button isValid={isValid} handleSubmit={handleSubmit} /> */}
        </div>
    );
};
export default DescribeModal;
