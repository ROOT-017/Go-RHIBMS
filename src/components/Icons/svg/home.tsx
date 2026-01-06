import { SVGAttributes } from "react"

export const HomeIcon = ({ fill = "#000D1A", ...props }: SVGAttributes<SVGSVGElement>) => {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clipPath="url(#clip0_5089_1202)">
          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill={fill}/>
        </g>
        <defs>
          <clipPath id="clip0_5089_1202">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    )
};
