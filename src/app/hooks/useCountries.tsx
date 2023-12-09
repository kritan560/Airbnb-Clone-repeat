import countries from "world-countries";

const useCountries = () => {
    return countries.map((country) => ({
        value: country.name.common,
        label: country.cca3,
        flag: country.flag,
        latLng: country.latlng
    }));
};

export default useCountries;
