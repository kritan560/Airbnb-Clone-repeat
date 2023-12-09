import React, { useState } from "react";
import Heading from "../../heading/Heading";
import Button from "../../button/Button";
import Body from "../../body/Body";
import ReactSelect, { SingleValue } from "react-select";
import useCountries from "@/app/hooks/useCountries";

type CountryType = ReturnType<typeof useCountries> extends (infer U)[] ? U : "";

const MapModal = () => {
    const [country, setCountry] = useState<SingleValue<CountryType>>();
    return (
        <div>
            <Heading
                subtitle="Help Guest Find You"
                title="Where is your place located?"
            />
            <Body>
                <ReactSelect
                    options={useCountries()}
                    value={country}
                    onChange={setCountry}
                />
            </Body>

            <Button primaryLabel="Next" />
        </div>
    );
};

export default MapModal;
