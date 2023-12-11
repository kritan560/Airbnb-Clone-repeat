import React, { useMemo, useState } from "react";
import Heading from "../../heading/Heading";
import Button from "../../button/Button";
import Body from "../../body/Body";
import ReactSelect, { SingleValue } from "react-select";
import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import ModalStore from "@/app/store/modalStore";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormValueType } from "../MainModal";

type CountryType = ReturnType<typeof useCountries> extends (infer U)[] ? U : "";

type MapModalProps = {
    id: string;
    setValue: UseFormSetValue<FieldValues | FormValueType>;
    watch: UseFormWatch<FormValueType | FieldValues>;
};

const MapModal: React.FC<MapModalProps> = ({ id, setValue, watch }) => {
    const [country, setCountry] = useState<SingleValue<CountryType>>();

    // const Map = dynamic(() => import("./Map"), { ssr: false });
    const Map = useMemo(
        () => dynamic(() => import("./Map"), { ssr: false }),
        [country]
    );

    const conuntryValue: CountryType = watch(id);

    // handle country change
    function handleCountryChange(e: SingleValue<CountryType>) {
        setCountry(e);
        setValue(id, e);
    }

    return (
        <div>
            <Heading
                subtitle="Help Guest Find You"
                title="Where is your place located?"
            />
            <Body className="">
                <div className="flex flex-col gap-y-3">
                    <ReactSelect
                        className="z-[9999]"
                        options={useCountries()}
                        value={conuntryValue}
                        onChange={(e) => handleCountryChange(e)}
                        formatOptionLabel={(fieldValue) => (
                            <div className="flex gap-x-2">
                                <span>{fieldValue.flag}</span>
                                <span>{fieldValue.value}</span>
                            </div>
                        )}
                    />
                    <Map position={conuntryValue?.latLng as LatLngExpression} />
                </div>
            </Body>
            <Button
                // primaryLabel="next"
                // secondaryLabel="Previous"
                // primaryAction={handlePrimaryClick}
                // secondaryAction={handleSecondaryClick}
            />
        </div>
    );
};

export default MapModal;
