import { Collapse } from 'antd';
import { MedicalTestLabel } from './MedicalTestLabel';
import { MedicalTestCollapseProps } from './types';

export const MedicalTestCollapse = ({
  children,
  active,
  completed,
  label,
  onChange,
}: MedicalTestCollapseProps) => (
  <div className="flex flex-col gap-2 flex-1 w-full">
    <Collapse
      collapsible="header"
      className="text-left"
      expandIconPosition="end"
      // activeKey={active && !completed ? '1' : undefined}
      onChange={onChange}
      activeKey={active ? '1' : undefined}
      items={[
        {
          key: '1',
          label: <MedicalTestLabel label={label} completed={completed} />,
          children: children,
        },
      ]}
    />
  </div>
);
