import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression, Map as M } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useMemo, useState } from "react";

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

    function DisplayPosition({ map }: { map: M }) {
        useEffect(() => {
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
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
