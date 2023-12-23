import Body from "../../body/Body";
import Heading from "../../heading/Heading";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

type DateRangeModalProps = {
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
};

const DateRangeModal: React.FC<DateRangeModalProps> = ({ setValue, watch }) => {
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    };

    const watchRanges = watch("calendar");

    function handleSelect(ranges: any) {
        setValue("calendar", ranges);
    }

    return (
        <div>
            <div>
                <div className="">
                    <DateRange
                        // className="w-full"
                        fixedHeight
                        ranges={[
                            watchRanges ? watchRanges.selection : selectionRange
                        ]}
                        showDateDisplay={false}
                        onChange={handleSelect}
                        date={new Date()}
                        minDate={new Date()}
                        direction="vertical"
                    />
                </div>
            </div>
        </div>
    );
};
export default DateRangeModal;
