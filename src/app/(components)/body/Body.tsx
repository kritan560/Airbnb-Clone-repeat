import { ReactNode } from "react";

const Body = ({ children }: { children: ReactNode }) => {
    return <div className="h-[300px]">{children}</div>;
};
export default Body;
