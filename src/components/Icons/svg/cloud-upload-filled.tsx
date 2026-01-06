import { SVGAttributes } from "react"

export function CloudUploadFilled({ fill = "#4C4F4E", ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_1458_2170_CloudUploadFilled)">
        <path
            d="M19.725 10.04C19.045 6.59 16.015 4 12.375 4C9.485 4 6.975 5.64 5.725 8.04C2.715 8.36 0.375 10.91 0.375 14C0.375 17.31 3.065 20 6.375 20H19.375C22.135 20 24.375 17.76 24.375 15C24.375 12.36 22.325 10.22 19.725 10.04ZM14.375 13V17H10.375V13H7.375L12.375 8L17.375 13H14.375Z"
            fill={fill}
        />
        </g>
        <defs>
            <clipPath id="clip0_1458_2170_CloudUploadFilled">
                <rect width="24" height="24" fill="white" transform="translate(0.375)"/>
            </clipPath>
        </defs>
    </svg>
    
  );
}
