import { Flex, FlexProps } from 'antd';
import React from 'react';

interface ColumnProps extends FlexProps {
  children: React.ReactNode;
}

const Column = ({ children, className, ...res }: ColumnProps) => {
  return (
    <Flex className={`gap-4 ${className}  flex-col `} {...res}>
      {children}
    </Flex>
  );
};

export default Column;
