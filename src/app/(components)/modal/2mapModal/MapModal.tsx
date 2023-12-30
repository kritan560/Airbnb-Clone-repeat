import useCountries from "@/app/hooks/useCountries";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import React, { useEffect, useId, useMemo, useState } from "react";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ReactSelect, { SingleValue } from "react-select";
import Body from "../../body/Body";
import Heading from "../../heading/Heading";
import { useTheme } from "next-themes";

export type CountryType = ReturnType<typeof useCountries> extends (infer U)[]
    ? U
    : "";

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
    // using useMemo so that map won't refresh when there is content changes.
    const Map = useMemo(
        () => dynamic(() => import("./Map"), { ssr: false }),
        []
    );

    const conuntryValue: CountryType = watch(id);
    const { theme, systemTheme } = useTheme();
    const [invert, setInvert] = useState<boolean>();

    // handle country change
    function handleCountryChange(e: SingleValue<CountryType>) {
        setCountry(e);
        setValue(id, e);
    }

    useEffect(() => {
        if (theme == "dark") {
            setInvert(true);
        } else if (theme == "light") {
            setInvert(false);
        } else if (theme == "system") {
            if (systemTheme == "dark") {
                setInvert(true);
            } else if (systemTheme == "light") {
                setInvert(false);
            }
        }
    }, [theme, systemTheme]);

    return (
        <div>
            <Heading subtitle={subtitle} title={title} />
            <Body className="">
                <div className="flex flex-col gap-y-3 ">
                    <ReactSelect
                        instanceId={useId()} // you need this instanceId without it give react-select-4-live-region warning error
                        className={`z-[9999] dark:text-blue-400 ${
                            invert ? "invert" : "invert-0"
                        }`}
                        classNamePrefix={"className"}
                        isClearable
                        placeholder="AnyWhere"
                        options={useCountries()}
                        value={conuntryValue}
                        onChange={(e) => handleCountryChange(e)}
                        formatOptionLabel={(fieldValue) => (
                            <div
                                className={`flex gap-x-2 placeholder:text-black ${
                                    invert ? "invert" : "invert-0"
                                }`}
                            >
                                <span>{fieldValue.flag}</span>
                                <span>{fieldValue.value}</span>
                            </div>
                        )}
                    />
                    <Map position={conuntryValue?.latLng as LatLngExpression} />
                </div>
            </Body>
        </div>
    );
};

export default MapModal;
