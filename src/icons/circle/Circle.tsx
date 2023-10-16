import { SVGAttributes } from "react";

const Circle = (props: SVGAttributes<HTMLOrSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        strokeLinecap="round"
        className="animate-spin"
    >
        <title>Circle</title>
        <circle cx="256" cy="256" r="200" fill="transparent" strokeWidth="35" stroke="lightgray" />
        <path
            d="M256 56 A 200 200, 0, 0, 1, 256 456"
            fill="none"
            strokeWidth="35"
            stroke="white"
        />
    </svg>
);
export default Circle;
