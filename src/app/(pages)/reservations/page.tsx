import getCurrentUser from "@/app/(actions)/getCurrentUser";
import prisma from "../../../../prisma/PrismaDB";
import ReservationPage from "./ReservationPage";

const Reservations = async () => {
    const currentLoggedInUser = await getCurrentUser();
    // return current user reservation only
    const currentUserReservations = await prisma.reservation.findMany({
        where: {
            userId: currentLoggedInUser?.id
        }
    });
    // console.log(currentUserReservations);

    const currentUserReservationListingId = currentUserReservations.map(
        (reservation) => reservation.listingId
    );
    // console.log(currentUserReservationListingId);

    const currentUserReservationListing = await prisma.listing.findMany({
        where: { id: { in: currentUserReservationListingId } }
    });
    console.log(currentUserReservationListing);

    return <ReservationPage listings={currentUserReservationListing} />;
};

export default Reservations;
