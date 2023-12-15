import React, { useMemo, useState } from "react";
import Heading from "../../heading/Heading";
import Body from "../../body/Body";
import ReactSelect, { SingleValue } from "react-select";
import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

export type CountryType = ReturnType<typeof useCountries> extends (infer U)[] ? U : "";

type MapModalProps = {
    id: string;
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    title: string;
    subtitle: string;
};

const MapModal: React.FC<MapModalProps> = ({
    id,
    setValue,
    watch,
    title,
    subtitle
}) => {
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
        setValue(id, e, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    }

    return (
        <div>
            <Heading subtitle={subtitle} title={title} />
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
            {/* <Button /> */}
        </div>
    );
};

export default MapModal;
