import Heading from "@/app/(components)/heading/Heading";
import React from "react";

const Reservations = () => {
    return (
        <div>
          {/* display the heading only if there are reservations */}
            <Heading
                title="Reservation"
                subtitle="Your reservations are here"
            />
        </div>
    );
};

export default Reservations;
