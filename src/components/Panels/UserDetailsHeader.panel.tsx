import { Skeleton } from 'antd';
import { useContext } from 'react';
import { CenterWorkerManagementContext } from '../../contexts/medical-worker-management-context/medical-worker-management.context';
import { preferredDateTimeDisplay } from '../../utils/date-time';

export const UserDetailsHeader = () => {
  const { selectedWorker, userId } = useContext(CenterWorkerManagementContext);

  return userId != null ? (
    selectedWorker != null ? (
      <div className="interview-schedule flex flex-wrap gap-6 md:gap-24 items-center justify-start w-full mb-6">
        {selectedWorker?.createdAt != null ? (
          <div className="schedule-date items-center flex gap-4">
            <span className="schedule-title">Member Since:</span>
            <span className="schedule-value font-bold">
              {preferredDateTimeDisplay(selectedWorker?.createdAt)}
            </span>
          </div>
        ) : null}
        <div className="schedule-time items-center flex gap-4">
          <span className="schedule-title">Role:</span>
          <span className="schedule-value font-bold">
            {/* <UserTypeBadge type={selectedWorker?.role as UserType} /> */}
          </span>
        </div>
      </div>
    ) : (
      <Skeleton paragraph={{ rows: 0 }} />
    )
  ) : null;
};
