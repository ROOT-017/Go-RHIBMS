import { Flex, FlexProps } from 'antd';
import React from 'react';

interface Props extends FlexProps {
  children: React.ReactNode;
}

const HStack = ({ children, className, ...res }: Props) => {
  return (
    <Flex className={`flex-1 items-center ${className}  flex-row `} {...res}>
      {children}
    </Flex>
  );
};

export default HStack;
