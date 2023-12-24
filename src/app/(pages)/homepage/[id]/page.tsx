import ListingDetail from "@/app/(components)/listing/ListingDetail";
import prisma from "../../../../../prisma/PrismaDB";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import dynamic from "next/dynamic";

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

    // get the current LoggedIn User
    const currentUser = await getCurrentUser();

    // favorite listing of current LoggedIn User
    const favListing = currentUser?.favoritesIds;

    // get the current user Reservations

    return (
        <>
            <ListingDetail
                listing={list}
                currentUser={ListingUser}
                favorites={favListing}
            />
        </>
    );
};
export default page;
