import { CSSProperties, useMemo } from 'react';
import { Collapse, CollapseProps } from 'antd';
import { PanelHeaderLabel } from './labels/PanelHeader.label';
import {
  EnvironmentOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Candidate, WorkerDetails } from '../../@types';
import { PersonalInfo } from './PersonalInfo.panel';
import { ResumeInfoPanel } from './ResumeInfo.panel';
import { LicensePanel } from './License.panel';
import { CertificationPanel } from './Certification.panel';

type WorkerPanelGroupProp = {
  data?: WorkerDetails;
  loading?: boolean;
  onUpdateCandidate?: (values: Partial<Candidate>) => Promise<void>;
};
export const WorkerPanelGroup = ({
  data,
  loading,
  onUpdateCandidate,
}: WorkerPanelGroupProp) => {
  const panelStyle: CSSProperties = {
    border: '1px solid #eee',
    background: '#fff',
    borderRadius: 8,
  };
  const itemKeys = [
    'personal-information',
    'resume-info',
    'licenses',
    'certifications',
  ] as const;
  const infoItems: Record<(typeof itemKeys)[number], CollapseProps['items']> =
    useMemo(() => {
      return {
        [itemKeys[0]]: [
          {
            key: itemKeys[0],
            label: (
              <PanelHeaderLabel
                label="Personal Information"
                icon={<UserOutlined />}
              />
            ),
            children: (
              <PersonalInfo
                candidateReferences={data?.candidateReferences}
                emergencyContacts={data?.emergencyContacts}
                candidate={data?.resume?.candidate}
                userProfile={data?.userProfile}
                onUpdateCandidate={onUpdateCandidate}
              />
            ),
            style: panelStyle,
          },
        ],
        [itemKeys[1]]: [
          {
            key: itemKeys[1],
            label: (
              <PanelHeaderLabel
                label="Resume Information"
                icon={<EnvironmentOutlined />}
              />
            ),
            children: (
              <ResumeInfoPanel
                resume={data?.resume}
                candidate={data?.resume?.candidate}
              />
            ),
            style: panelStyle,
          },
        ],
        [itemKeys[2]]: [
          {
            key: itemKeys[2],
            label: (
              <PanelHeaderLabel
                label="License"
                icon={<ThunderboltOutlined />}
              />
            ),
            children: <LicensePanel resume={data?.resume} />,
            style: panelStyle,
          },
        ],
        [itemKeys[3]]: [
          {
            key: itemKeys[3],
            label: (
              <PanelHeaderLabel
                label="Certification"
                icon={<ThunderboltOutlined />}
              />
            ),
            children: <CertificationPanel resume={data?.resume} />,
            style: panelStyle,
          },
        ],
      };
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading]);
  return (
    <>
      <Collapse
        items={infoItems[itemKeys[0]]}
        expandIconPosition="end"
        style={{ background: 'none' }}
        bordered={false}
        defaultActiveKey={[itemKeys[0]]}
      />
      <Collapse
        items={infoItems[itemKeys[1]]}
        expandIconPosition="end"
        style={{ background: 'none' }}
        bordered={false}
        defaultActiveKey={[itemKeys[1]]}
      />
      <Collapse
        items={infoItems[itemKeys[2]]}
        expandIconPosition="end"
        style={{ background: 'none' }}
        bordered={false}
        defaultActiveKey={[itemKeys[2]]}
      />
      <Collapse
        items={infoItems[itemKeys[3]]}
        expandIconPosition="end"
        style={{ background: 'none' }}
        bordered={false}
        defaultActiveKey={[itemKeys[3]]}
      />
    </>
  );
};
