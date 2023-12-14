import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import Body from "../../body/Body";
import Heading from "../../heading/Heading";
import Input from "../../input/Input";

type PriceModalProps = {
    watch: UseFormWatch<FieldValues>;
    register: UseFormRegister<FieldValues>;
    title: string;
    subtitle: string;
};

const PriceModal: React.FC<PriceModalProps> = ({
    watch,
    register,
    title,
    subtitle
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
                    id="price"
                    type="number"
                    label="Price"
                    value={watchPrice}
                    register={register}
                />
            </Body>
            {/* <Button /> */}
        </div>
    );
};
export default PriceModal;
