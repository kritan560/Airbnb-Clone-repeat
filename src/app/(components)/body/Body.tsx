import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BodyType = {
    children?: ReactNode;
    className?: string;
};

const Body: React.FC<BodyType> = ({ children, className }) => {
    return <div className={cn(` h-[290px] mt-4`, className)}>{children}</div>;
};
export default Body;
