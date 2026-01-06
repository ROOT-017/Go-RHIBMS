import { useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Candidate, InterviewBookingDetails } from '../../@types';
import { preferredDateDisplay } from '../../utils/date-time';
import { BookingStatusBadge } from '../Badge';
import { StatusName } from '../../constants';
import DownloadManager from '../DownloadManager/DownloadManager';
import { HTMLResume } from '../Resume/HTMLResume';

export const ResumeInfoPanel = ({
  resume,
  candidateReferences,
  candidate,
}: Partial<InterviewBookingDetails> & { candidate?: Candidate }) => {
  const [downloadOpen, setDownloadOpen] = useState(false);
  return (
    <div className="resume-info-panel flex justify-start flex-col gap-8">
      <div className="flex justify-between">
        <span className="font-light text-left">Experience</span>
        <Button onClick={() => setDownloadOpen(true)} type="text">
          Download <DownloadOutlined />
        </Button>
      </div>
      <div className="flex gap-4 justify-start flex-wrap">
        {resume?.workExperiences?.map((experience) => (
          <div
            key={experience.id}
            className="basic-info-content flex flex-col justify-start  gap-2 w-[200px] text-left"
          >
            <div className="font-bold ">{experience.position}</div>
            <div className="schedule-date flex gap-4">
              <span className="schedule-title">{experience.company}</span>
            </div>
            <div className="schedule-date flex gap-4 font-thin">
              <span className="schedule-title">
                {preferredDateDisplay(experience.startDate)}
              </span>
              <span> - </span>
              <span className="schedule-title">
                {experience.currentlyEmployed
                  ? 'Present'
                  : preferredDateDisplay(experience.endDate)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <span className="font-light text-left">Education</span>
      <div className="flex gap-4 justify-start flex-wrap">
        {resume?.educations?.map((education) => (
          <div
            key={education.id}
            className="basic-info-content flex flex-col justify-start  gap-2 w-[200px] text-left"
          >
            <div className="font-bold">{education.school}</div>
            <div className="schedule-date flex gap-4">
              <span className="schedule-title">{education.fieldOfStudy}</span>
            </div>
            <div className="schedule-date flex gap-4">
              <span className="schedule-title">
                {preferredDateDisplay(education.startDate)}
              </span>
              <span> - </span>
              <span className="schedule-title">
                {education.currentlyEnrolled
                  ? 'Present'
                  : preferredDateDisplay(education.endDate)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <span className="font-light text-left">Reference</span>
      <div className="flex gap-4 justify-start flex-wrap">
        {candidateReferences?.map((reference) => (
          <div
            key={reference.id}
            className="basic-info-content flex flex-col justify-start  gap-2 w-[200px] text-left"
          >
            <div className="font-bold">{`${reference.firstName ?? ''} ${reference.lastName ?? ''}`}</div>
            <div className="schedule-date flex gap-4">
              <span className="schedule-title">{reference.company}</span>
            </div>
            <div className="schedule-date flex gap-4">
              <BookingStatusBadge
                status={
                  reference.jsonRepresentation != null
                    ? StatusName.completed
                    : StatusName.pending
                }
                value={
                  reference.jsonRepresentation != null
                    ? JSON.parse(reference.jsonRepresentation).relationship
                    : undefined
                }
              />
            </div>
          </div>
        ))}
      </div>
      <DownloadManager
        open={downloadOpen}
        onCancel={() => setDownloadOpen(false)}
        fileName={`${candidate?.firstName ?? ''} ${candidate?.lastName ?? ''}_Resume`}
      >
        <HTMLResume data={resume} candidate={candidate} />
      </DownloadManager>
    </div>
  );
};
