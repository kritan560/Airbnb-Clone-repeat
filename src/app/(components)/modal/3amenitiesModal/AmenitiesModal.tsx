import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import Body from "../../body/Body";
import Button from "../../button/Button";
import Heading from "../../heading/Heading";
import Amenities from "./Amenities";

type AmenititesModelProps = {
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
};

const AmenitiesModal: React.FC<AmenititesModelProps> = ({
    setValue,
    watch
}) => {
    const guestCount: number = watch("guests");
    const roomCount: number = watch("rooms");
    const bedroomsCount: number = watch("bedrooms");

    return (
        <div>
            <Heading
                title="Share some basic about your place"
                subtitle="What amenities do you have"
            />
            <Body>
                <Amenities
                    title="Guest"
                    id="guests"
                    subtitle="How many Guest do you have?"
                    setValue={setValue}
                    value={guestCount}
                />
                <Amenities
                    title="Room"
                    id="rooms"
                    subtitle="How many Rooms do you have?"
                    setValue={setValue}
                    value={roomCount}
                />
                <Amenities
                    title="BedRooms"
                    id="bedrooms"
                    subtitle="How many Rooms do you have?"
                    setValue={setValue}
                    value={bedroomsCount}
                />
            </Body>
            <Button />
        </div>
    );
};
export default AmenitiesModal;
