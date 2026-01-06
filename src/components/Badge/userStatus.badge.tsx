import { Badge } from "antd";
import { colorByUserStatus } from "../../constants";
import { UserStatusBadgeProp } from "./types";

export const UserStatusBadge = ({ status, value, className }: UserStatusBadgeProp) => {
    return (
        <Badge
            style={{
                color: colorByUserStatus[`${status}`]?.color ?? colorByUserStatus.true.color,
                backgroundColor: colorByUserStatus[`${status}`]?.bgColor ?? colorByUserStatus.true.bgColor,
                textTransform: 'capitalize',
            }}
            className={className ?? 'calendar-cell-btn-txt'}
            count={value ?? (status ? 'Active' : 'Suspended')}
        />
    )
}