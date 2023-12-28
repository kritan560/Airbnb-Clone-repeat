import getCurrentUser from "@/app/(actions)/getCurrentUser";
import ListingDetail from "@/app/(components)/listing/ListingDetail";
import { eachDayOfInterval } from "date-fns";
import prisma from "../../../../../prisma/PrismaDB";

type ParamsId = {
    params: { id: string };
};

const page = async ({ params }: ParamsId) => {
    // dynamically import the component to see the diff in initial page load size but found none.
    // const ListingDetail = dynamic(
    //     () => import("@/app/(components)/listing/ListingDetail")
    // );

    // find the unique listing
    const list = await prisma.listing.findUnique({
        where: { id: params.id }
    });
    if (!list) return null;

    // find the user for unique listing
    const ListingUser = await prisma.user.findUnique({
        where: { id: list.userId }
    });
    if (!ListingUser) return null;

    // get the current LoggedIn User and current reservation for listing
    const currentUser = await getCurrentUser();
    const currentUserReservation = await prisma.reservation.findMany({
        where: { userId: currentUser?.id, listingId: list.id }
    });

    // total Price Calculation
    const totalPriceArray: number[] = [];
    currentUserReservation.forEach((reservation) =>
        totalPriceArray.push(reservation.totalPrice)
    );
    let totalPrice = 0;
    totalPriceArray.forEach((tp) => (totalPrice += tp));

    // total Days Calculation
    const totalDaysArray: number[] = [];
    currentUserReservation.forEach((reservation) =>
        totalDaysArray.push(reservation.totalDays)
    );
    let totalDays = 0;
    totalDaysArray.forEach((td) => (totalDays += td));

    // calculating the disabled dates
    const intervals: Date[] = [];
    currentUserReservation.forEach((reservation) => {
        const interval = eachDayOfInterval({
            start: reservation.startDate,
            end: reservation.endDate
        });
        interval.forEach((int) => intervals.push(int));
    });

    // favorite listing of current LoggedIn User
    const favListing = currentUser?.favoritesIds;

    // get the current user Reservations

    return (
        <>
            <ListingDetail
                listing={list}
                currentUser={ListingUser}
                favorites={favListing}
                disableRanges={intervals}
                totalprice={totalPrice}
                totalDays={totalDays}
            />
        </>
    );
};
export default page;
