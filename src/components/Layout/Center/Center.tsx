import { Flex, FlexProps } from 'antd';
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
