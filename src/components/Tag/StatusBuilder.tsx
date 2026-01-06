import { Tag } from 'antd';
import { StatusConfig } from '../../constants';

type StatusBuilderProps = { status: string };
const StatusBuilder = ({ status }: StatusBuilderProps) => {
  const { color, label } =
    StatusConfig[status.toLowerCase()] || StatusConfig.NO_VALID_STATUS;


  return (
    <Tag className="ml-2 w-fit" color={color}>
      {label}
    </Tag>
  );
};

export default StatusBuilder;
