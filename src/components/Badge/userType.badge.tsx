import { Badge } from "antd";
import { UserType, colorByUserType } from "../../constants";
import { UserTypeBadgeProp } from "./types";

export const UserTypeBadge = ({ type, value, className }: UserTypeBadgeProp) => {
    return (
        <Badge
            style={{
                color: colorByUserType[type]?.color ?? colorByUserType[UserType.worker].color,
                backgroundColor: colorByUserType[type]?.bgColor ?? colorByUserType[UserType.worker].bgColor,
                textTransform: 'capitalize',
            }}
            className={className ?? 'calendar-cell-btn-txt'}
            count={value ?? type}
        />
    )
}