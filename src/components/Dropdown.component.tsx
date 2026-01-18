import React, { CSSProperties } from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import { useLogout } from '../hooks/common.hooks';

interface SignUpHeaderProps {
  menuFunction?: () => void;
  currentStep?: number;
  completedSteps?: number[];
  arrowStyle?: CSSProperties;
}

const DropdownComponent: React.FC<SignUpHeaderProps> = (props) => {
  // const logout = useLogout();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Refer a Friend
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Help
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <Button className="text-left w-full  p-0" type="link" onClick={()=>{}}>
          Logout
        </Button>
      ),
    },
  ];
  return (
    <main className="md:w-full">
      <div>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <div className="flex gap-4">
              {/* <AvatarInternal /> */}
              <DownOutlined style={props.arrowStyle} />
            </div>
          </a>
        </Dropdown>
      </div>
    </main>
  );
};

export default DropdownComponent;
