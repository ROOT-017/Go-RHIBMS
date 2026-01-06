import { InterviewBookingDetails } from '../../@types';
import dayjs from 'dayjs';
import { isPastDate, preferredDateDisplay } from '../../utils/date-time';
import { BookingStatusBadge } from '../Badge';
import { StatusName } from '../../constants';

export const LicensePanel = ({ resume }: Partial<InterviewBookingDetails>) => {
  return (
    <div className="personal-info-panel flex justify-start flex-col gap-4">
      {resume?.licenses && resume?.licenses?.length > 0 ? (
        <table>
          <tbody>
            {resume.licenses.map((license) => (
              <tr key={license.id}>
                <td className="pb-6">
                  <div className="flex flex-col text-left">
                    <div>
                      {license.lState} {license.licenseNumber}
                    </div>
                    {isPastDate(license.lExpirationDate) ? (
                      <BookingStatusBadge
                        status={StatusName.canceled}
                        value={`Expired since ${preferredDateDisplay(license.lExpirationDate)}`}
                      />
                    ) : (
                      <div className={`font-thin`}>
                        Expires {preferredDateDisplay(license.lExpirationDate)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="pb-6">
                  {dayjs(license.lExpirationDate).isBefore(dayjs()) ? null : (
                    <span>Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
