// import Body from "../../body/Body";
// import Heading from "../../heading/Heading";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type DateRangeModalProps = {
    handleChange: ({ selection }: RangeKeyDict) => void;
    state: {
        startDate: Date;
        endDate: Date;
        key: string;
    }[];
    disableDates?: Date[];
};

const DateRangeModal: React.FC<DateRangeModalProps> = ({
    handleChange,
    state,
    disableDates
}) => {
    return (
        <div>
            <div>
                <div className="">
                    <DateRange
                        fixedHeight
                        ranges={state}
                        showDateDisplay={false}
                        onChange={handleChange}
                        date={new Date()}
                        minDate={new Date()}
                        direction="vertical"
                        disabledDates={disableDates}
                    />
                </div>
            </div>
        </div>
    );
};
export default DateRangeModal;
