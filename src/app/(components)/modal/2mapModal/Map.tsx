import { Icon, LatLngExpression, Map as M } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

{
    /**
     'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
     "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
     */
}

type MapProps = {
    position: LatLngExpression;
};

const Map: React.FC<MapProps> = ({ position }) => {
    const center = [51.505, -0.09] as LatLngExpression;
    const icon = new Icon({
        shadowUrl: MarkerShadow.src,
        iconUrl: MarkerIcon.src
    });
    const zoom = 12;
    const [map, setMap] = useState<M | null>();
    const { theme, systemTheme } = useTheme();
    const [darkMode, setDarkMode] = useState<string>(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );

    function DisplayPosition({ map }: { map: M }) {
        useEffect(() => {
            if (theme == "dark") {
                setDarkMode(
                    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                );
            } else if (theme == "light") {
                setDarkMode(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                );
            } else if (theme == "system") {
                if (systemTheme == "dark") {
                    setDarkMode(
                        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    );
                } else if (systemTheme == "light") {
                    setDarkMode(
                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    );
                }
            }
            map.setView(position ? position : center, zoom);
        }, [map]);

        return <></>;
    }

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                ref={setMap}
                className="rounded-lg"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={darkMode}
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position ? position : center} icon={icon}>
                    <Popup className="ml-[13px]">Popup</Popup>
                </Marker>
            </MapContainer>
        ),
        [center, icon, position]
    );

    return (
        <div className="sticky z-0">
            {map ? <DisplayPosition map={map} /> : null}
            {displayMap}
        </div>
    );
};
export default Map;
