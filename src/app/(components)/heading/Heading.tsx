type HeadingProps = {
    title: string;
    subtitle: string;
};

const Heading: React.FC<HeadingProps> = ({ subtitle, title }) => {
    return (
        <div className="select-none">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-sm text-slate-400 dark:text-slate-300/80">
                {subtitle}
            </div>
        </div>
    );
};
export default Heading;
