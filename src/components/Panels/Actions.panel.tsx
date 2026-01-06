import { Avatar, Card } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { CenterWorkerManagementContext } from '../../contexts/medical-worker-management-context/medical-worker-management.context';
import { UserStatusBadge } from '../Badge/userStatus.badge';
import { getInitials } from '../../utils/strings';

export const ActionsPanel = () => {
  const { workerDetails } = useContext(CenterWorkerManagementContext);

  return workerDetails != null ? (
    <div className="background-check w-full md:w-1/5">
      <Card
        title={
          workerDetails?.resume?.id == null ? null : (
            <div className="flex flex-col gap-4 py-6">
              <div className="flex justify-start">
                <Avatar
                  style={{
                    verticalAlign: 'middle',
                    color: '#241773',
                    backgroundColor: '#E9F1FA',
                    border: 'solid #241773 1px',
                    padding: '20px',
                    fontSize: '1.6rem',
                    fontWeight: '800',
                  }}
                  size={'large'}
                  icon={
                    workerDetails?.resume?.candidate?.firstName != null ? (
                      getInitials(
                        `${workerDetails?.resume?.candidate?.firstName ?? ''} ${workerDetails?.resume?.candidate?.lastName ?? ''}`,
                      )
                    ) : (
                      <UserOutlined />
                    )
                  }
                />
              </div>
              <UserStatusBadge
                status={!!workerDetails?.resume?.candidate?.user?.active}
              />
              <div className="flex justify-start font-bold">
                {`${workerDetails?.resume?.candidate?.firstName ?? ''} ${workerDetails?.resume?.candidate?.lastName ?? ''}`}
              </div>
            </div>
          )
        }
        className="sticky-at-top"
        classNames={{
          body: '!p-4',
          header: '!p-4',
        }}
        loading={workerDetails?.resume?.candidate?.id == null}
      >
        <div className="flex flex-col gap-4 justify-start">
          <div className="candidate-mail flex justify-start gap-4">
            <MailOutlined />
            <div className="break-all">
              {workerDetails?.resume?.candidate?.email}
            </div>
          </div>
          <div className="candidate-phone flex justify-start gap-4">
            <PhoneOutlined />
            <div className="break-all">
              {workerDetails?.resume?.candidate?.phone}
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : (
    <div className="background-check w-full md:w-1/5">
      <Card></Card>
    </div>
  );
};
