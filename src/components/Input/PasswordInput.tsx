import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, InputProps } from 'antd';

export const PasswordInput = ({
  className,
  ...props
}: Omit<InputProps, 'type'>) => (
  <Input.Password
    className={`items-center med-pass-input !py-[3px]  ${className ?? ''}`}
    iconRender={(visible) =>
      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
    }
    {...props}
  />
);
