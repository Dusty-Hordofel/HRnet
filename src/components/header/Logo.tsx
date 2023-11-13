import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
    src,
    alt,
    title,
    className,
    style,
    onClick,
}) => {
    return (
        <Link to="/">
            <img
                src={src}
                alt={alt}
                title={title}
                // width={width}
                // height={height}
                className={className}
                style={style}
                onClick={onClick}
                tabIndex={0}
            />
            <h1 className="sr-only">{title}</h1>
        </Link>
    );
};

export default Logo;
