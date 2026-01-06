import { CheckSquareFilled } from "@ant-design/icons";

type VaccineLabelProps = {
    label: string,
    completed?: boolean,
}

export const VaccineLabel = ({ completed, label }: VaccineLabelProps) => (
    <span>
        { completed ? <CheckSquareFilled /> : null}
        <span className="ml-4">{ label }</span>
    </span>
)