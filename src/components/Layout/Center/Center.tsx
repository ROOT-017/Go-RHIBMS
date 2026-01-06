import { Flex, FlexProps } from 'antd';
import React from 'react';

interface Props extends FlexProps {
  children: React.ReactNode;
}

const Center = ({ children, ...res }: Props) => {
  return (
    <Flex justify="center" align="center" {...res}>
      {children}
    </Flex>
  );
};

export default Center;
