import { ExportOutlined } from '@ant-design/icons';
import { preferredDateDisplay } from '../../utils/date-time';
import { Button } from '../design-system/buttons';

export const CompliancePanel = () => {
  return (
    <div className="certification-panel flex justify-start flex-col gap-4">
      <table>
        <tbody>
          <tr>
            <td className="pb-6">
              <div className="flex flex-col text-left">
                <div>Center Policy</div>
                <div className={`font-thin`}>
                  Expires {preferredDateDisplay(new Date())}
                </div>
              </div>
            </td>
            <td className="flex justify-end">
              <Button bordered centered>
                View <ExportOutlined />
              </Button>
            </td>
          </tr>
          <tr>
            <td className="pb-6">
              <div className="flex flex-col text-left">
                <div>Compliance Requirements</div>
                <div className={`font-thin`}>
                  Expires {preferredDateDisplay(new Date())}
                </div>
              </div>
            </td>
            <td className="flex justify-end">
              <Button bordered centered>
                View <ExportOutlined />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
