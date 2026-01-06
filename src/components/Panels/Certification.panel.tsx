import { Fragment } from 'react/jsx-runtime';
import { isPastDate, preferredDateDisplay } from '../../utils/date-time';
import { InterviewBookingDetails } from '../../@types';
import { BookingStatusBadge } from '../Badge';
import { StatusName } from '../../constants';

export const CertificationPanel = ({
  resume,
}: Partial<InterviewBookingDetails>) => {
  return (
    <div className="certification-panel flex justify-start flex-col gap-4">
      {resume?.certifications && resume?.certifications?.length > 0 ? (
        <table>
          <tbody>
            {resume.certifications.map((certification) => (
              <tr key={certification.id}>
                <td className="pb-6">
                  <div className="flex flex-col text-left">
                    <div>{certification.cname}</div>
                    {certification.expires ? (
                      <Fragment>
                        {isPastDate(certification.cExpirationDate) ? (
                          <BookingStatusBadge
                            status={StatusName.canceled}
                            value={`Expired since ${preferredDateDisplay(certification.cExpirationDate)}`}
                          />
                        ) : (
                          <div className={`font-thin`}>
                            Expires{' '}
                            {preferredDateDisplay(
                              certification.cExpirationDate,
                            )}
                          </div>
                        )}
                      </Fragment>
                    ) : (
                      <div className="font-thin">Active</div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
