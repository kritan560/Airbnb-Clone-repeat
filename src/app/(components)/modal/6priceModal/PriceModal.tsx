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

type PriceModalProps = {
    watch: UseFormWatch<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    register: UseFormRegister<FieldValues>;
};

const PriceModal: React.FC<PriceModalProps> = ({
    setValue,
    watch,
    register
}) => {
    const watchPrice = watch("price");

    return (
        <div>
            <Heading
                title="Set Your Price"
                subtitle="How much do you charge per night?"
            />
            <Body>
                <Input
                    type="number"
                    label="Price"
                    setValue={(e) => setValue("price", e)}
                    value={watchPrice}
                    register={register}
                />
            </Body>
            <Button />
        </div>
    );
};
export default PriceModal;
