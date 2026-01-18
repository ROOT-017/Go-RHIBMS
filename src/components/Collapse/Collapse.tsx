import {
  Collapse as AntCollapse,
  CollapseProps as AntCollapseProps,
} from 'antd';
import { HTMLAttributes, ReactNode } from 'react';

interface CollapseProps extends AntCollapseProps {
  children: ReactNode;
  active?: boolean;
  label: string | ReactNode;
  onChange: ((key: string | string[]) => void) | undefined;
  defaultActive?: boolean;
  labelAttributes?: HTMLAttributes<HTMLSpanElement>;
  id?: string;
}

const Collapse = ({
  children,
  label,
  onChange,
  active,
  defaultActive,
  labelAttributes,
  collapsible = 'header',
  expandIconPosition = 'end',
  id,
  ...res
}: CollapseProps & { id?: string }) => {
  return (
    <div className="flex flex-col gap-2 flex-1 w-full" id={id}>
      <AntCollapse
        {...res}
        className="text-left"
        collapsible={collapsible}
        expandIconPosition={expandIconPosition}
        onChange={onChange}
        defaultActiveKey={defaultActive ? 1 : undefined}
        activeKey={active ? '1' : undefined}
        items={[
          {
            key: '1',
            label: typeof label === 'string' ? <>{label}</> : label,
            children: children,
          },
        ]}
      />
    </div>
  );
};

export default Collapse;
