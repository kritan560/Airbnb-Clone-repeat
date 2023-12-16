import Body from "../../body/Body";
import Heading from "../../heading/Heading";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

type DateRangeModalProps = {
    title: string;
    subtitle: string;
};

const DateRangeModal: React.FC<DateRangeModalProps> = ({ subtitle, title }) => {
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    };
    function handleSelect(ranges: any) {
        console.log(ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }
    const start = new Date(2023,12,12)
    const end = new Date(2023,12,16)
    return (
        <div>
            <Heading subtitle={subtitle} title={title} />
            <Body>
                <div className="flex justify-center">
                    <DateRange
                        fixedHeight
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        disabledDates={[start, end]}
                    />
                </div>
            </Body>
        </div>
    );
};
export default DateRangeModal;
