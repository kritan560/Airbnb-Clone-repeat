import Body from "../../body/Body";
import Heading from "../../heading/Heading";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

type DateRangeModalProps = {
    title: string;
    subtitle: string;
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
};

const DateRangeModal: React.FC<DateRangeModalProps> = ({
    subtitle,
    title,
    setValue,
    watch
}) => {
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    };
    const watchRanges = watch("calendar");
    function handleSelect(ranges: any) {
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
        setValue("calendar", ranges);
    }
    return (
        <div>
            <Heading subtitle={subtitle} title={title} />
            <Body>
                <div className="flex justify-center">
                    <DateRange
                        fixedHeight
                        ranges={[
                            watchRanges ? watchRanges.selection : selectionRange
                        ]}
                        onChange={handleSelect}
                    />
                </div>
            </Body>
        </div>
    );
};
export default DateRangeModal;
