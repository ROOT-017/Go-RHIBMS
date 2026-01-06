import { Badge } from "antd"
import { StatusName, colorByStatusName } from "../../constants"
import { BookingBadgeProp } from "./types"

export const BookingStatusBadge = ({ status, value, className }: BookingBadgeProp) => {
    return (
        <Badge
            style={{
                color: colorByStatusName[status]?.color ?? colorByStatusName[StatusName.pending].color,
                backgroundColor: colorByStatusName[status]?.bgColor ?? colorByStatusName[StatusName.pending].bgColor,
                textTransform: 'capitalize',
            }}
            className={className ?? 'calendar-cell-btn-txt'}
            count={value ?? status}
        />
    )
}