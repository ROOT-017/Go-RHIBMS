import { Avatar, Select, SelectProps } from "antd";
import { ReactNode } from "react"
import { colors } from "../../../assets/colors";
type HeaderLabelProp = {
    icon?: ReactNode,
    label?: ReactNode,
    suffix?: ReactNode,
    prefix?: ReactNode,
} & SelectProps;
export const PanelHeaderLabel = ({ icon, label, options, suffix, prefix, ...props }: HeaderLabelProp) => {
    return (
        <div className="flex justify-between">
            <div className="flex flex-start gap-6 items-center">
                { prefix }
                {
                    icon ? (
                        <Avatar size={24} style={{ background: colors.tealColor }} icon={icon} />
                    ) : null
                }
                {
                    label ? (
                        <div className="text-[1.6rem] font-bold">
                            { label }
                        </div>
                    ) : null
                }
            </div>
            {
                options && options.length > 0 ? (
                    <Select removeIcon options={options} {...props} onClick={e => e?.stopPropagation()}/>
                ) : null
            }
            {
                suffix
            }
        </div>
    )
}