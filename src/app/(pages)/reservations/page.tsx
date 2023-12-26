import getCurrentUser from "@/app/(actions)/getCurrentUser";
import prisma from "../../../../prisma/PrismaDB";
import ListingCard from "@/app/(components)/listing/ListingCard";
import ReservationPage from "./ReservationPage";
import Heading from "@/app/(components)/heading/Heading";
import NoMatchFound from "@/app/(components)/noMatchFound/NoMatchFound";

const Reservations = async () => {
    const currentLoggedInUser = await getCurrentUser();

    // return current user reservation only
    if (!currentLoggedInUser) return;

    const currentUserReservations = await prisma.reservation.findMany({
        where: {
            userId: currentLoggedInUser?.id
        }
    });

    function NoReservation() {
        if (currentUserReservations.length <= 0) {
            return (
                <>
                    <NoMatchFound
                        buttonLabel={"Goto HomePage"}
                        headingLabel="No Reservation Found?"
                    />
                </>
            );
        } else {
            return (
                <Heading title="Reservation" subtitle="Your reservation here" />
            );
        }
    }

    return (
        <>
            {NoReservation()}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-8 gap-y-6 mt-12">
                {currentUserReservations.map((reservation) => {
                    return (
                        <ReservationPage
                            key={reservation.id}
                            listingId={reservation.listingId}
                            startDay={reservation.startDate}
                            endDay={reservation.endDate}
                            totalPrice={reservation.totalPrice}
                            totalDays={reservation.totalDays}
                            reservationId={reservation.id}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Reservations;

// const page = () => {
//     const maps = [1, 2, 3, 4];
//     return (
//         <div>
//             {maps.map((map) =>
//                 map === 2 || map === 4 ? null : (
//                     <div key={map}>Content for map {map}</div>
//                 )
//             )}
//         </div>
//     );
// };

// export default page;
