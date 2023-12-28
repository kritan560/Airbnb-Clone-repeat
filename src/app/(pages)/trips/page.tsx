import TripsPage from "./TripsPage";

// a user created a property . and when same user login the in /trips page should have ability to view all the property listings that other user have reserved.
// for e.g. kritan create a 3 property then when kritan login then he should have ability to view all the reservation made on a property created by kritan.

const Trips = async () => {
    return (
        <div>
            <TripsPage />
        </div>
    );
};

export default Trips;
