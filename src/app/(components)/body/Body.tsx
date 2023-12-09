import { ReactNode } from "react";

type BodyType = {
    children?: ReactNode;
    className?: string;
};

const Body: React.FC<BodyType> = ({ children, className }) => {
    return <div className={`${className} h-[290px] mt-4`}>{children}</div>;
};
export default Body;
