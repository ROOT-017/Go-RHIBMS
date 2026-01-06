import { Collapse } from 'antd';
import { VaccineLabel } from './VaccineLabel';
import { VaccineCollapseProps } from './types';

export const VaccineCollapse = ({
  children,
  active,
  completed,
  label,
  onChange,
}: VaccineCollapseProps) => (
  <div className="flex flex-col gap-2 flex-1 w-full">
    <Collapse
      collapsible="header"
      className="text-left"
      expandIconPosition="end"
      activeKey={active ? '1' : undefined}
      // activeKey={active && !completed ? '1' : undefined}
      onChange={onChange}
      items={[
        {
          key: '1',
          label: <VaccineLabel label={label} completed={completed} />,
          children: children,
        },
      ]}
    />
  </div>
);
