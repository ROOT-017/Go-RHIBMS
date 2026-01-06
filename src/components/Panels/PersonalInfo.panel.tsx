import { Card, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useState } from 'react';
import { PersonalInfoForm } from './PersonalInfo.form';
import { Button } from '../design-system/buttons';
import { Candidate, InterviewBookingDetails } from '../../@types';

export const PersonalInfo = ({
  candidate,
  userProfile,
  emergencyContacts,
  onUpdateCandidate,
}: Partial<InterviewBookingDetails> & {
  candidate?: Candidate;
  onUpdateCandidate?: (values: Partial<Candidate>) => Promise<void>;
}) => {
  const [editInfo, setEditInfo] = useState(false);
  return (
    <div className="personal-info-panel flex justify-start flex-col gap-4">
      <div className="flex justify-between">
        <span className="font-light text-left">Basic Information</span>
        {typeof onUpdateCandidate == 'function' ? (
          <Button onClick={() => setEditInfo(true)} type="text">
            Edit <EditFilled />
          </Button>
        ) : null}
      </div>
      <Card>
        <div className="basic-info-content flex justify-start flex-wrap gap-8">
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">First Name</span>
            <span className="schedule-value">{candidate?.firstName}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">Last Name</span>
            <span className="schedule-value">{candidate?.lastName}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">Email</span>
            <span className="schedule-value">{candidate?.email}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">Phone Number</span>
            <span className="schedule-value">{candidate?.phone}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">Applicant Id</span>
            <span className="schedule-value">{candidate?.id}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">SSN</span>
            <span className="schedule-value">{userProfile?.ssn}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">Street Address</span>
            <span className="schedule-value">{candidate?.address}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">City</span>
            <span className="schedule-value">{candidate?.city}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">State</span>
            <span className="schedule-value">{candidate?.state}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">ZIP code</span>
            <span className="schedule-value">{candidate?.zipCode}</span>
          </div>
          <div className="schedule-date flex gap-4 min-w-[150px]">
            <span className="schedule-title font-[500]">Country</span>
            <span className="schedule-value">{candidate?.country}</span>
          </div>
        </div>
      </Card>

      <span className="font-light text-left">Emergency Contact</span>
      {emergencyContacts?.map((contact) => (
        <Card key={contact.id}>
          <div className="basic-info-content flex justify-start flex-wrap gap-8">
            <div className="schedule-date flex gap-4 min-w-[150px]">
              <span className="schedule-title font-[500]">Full Name</span>
              <span className="schedule-value">{`${contact.firstName ?? ''} ${contact.lastName ?? ''}`}</span>
            </div>
            <div className="schedule-date flex gap-4 min-w-[150px]">
              <span className="schedule-title font-[500]">Phone Number</span>
              <span className="schedule-value">{contact.phone ?? ''}</span>
            </div>
          </div>
        </Card>
      ))}
      <Modal
        width={680}
        open={editInfo}
        onCancel={() => setEditInfo(false)}
        footer={null}
        title={<h1>Edit Personal Information</h1>}
      >
        <PersonalInfoForm
          candidate={candidate}
          userProfile={userProfile}
          emergencyContacts={emergencyContacts}
          onSubmit={onUpdateCandidate}
          onDismiss={() => setEditInfo(false)}
        />
      </Modal>
    </div>
  );
};
