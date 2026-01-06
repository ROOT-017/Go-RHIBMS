import { FlexContainer } from '../../flex-container';
import { Input } from 'antd';
import { userInfo } from '../../../@types';

type PersonalInformationProps = {
  userInfo: userInfo;
  handlePersonalInfoChange: (field: keyof userInfo, value: string) => void;
};

function PersonalInformation({
  userInfo,
  handlePersonalInfoChange,
}: PersonalInformationProps) {
  return (
    <div>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="First Name" className="relative" required>
          <Input
            value={userInfo.firstName || undefined}
            name="firstName"
            onChange={(e) => {
              handlePersonalInfoChange('firstName', e.target.value);
            }}
            placeholder="John"
            disabled={true}
          />
        </FlexContainer>{' '}
        <FlexContainer label="Last Name" className="relative" required>
          <Input
            value={userInfo.lastName || undefined}
            name="lastName"
            onChange={(e) => {
              handlePersonalInfoChange('lastName', e.target.value);
            }}
            placeholder="John"
            disabled={true}
          />
        </FlexContainer>
        <FlexContainer label="Phone Number" required>
          <Input
            value={userInfo.phoneNumber || undefined}
            name="phoneNumber"
            onChange={(e) => {
              handlePersonalInfoChange('phoneNumber', e.target.value);
            }}
            placeholder="+1 (XXX) XXX XXXXX"
            disabled={true}
          />
        </FlexContainer>
      </div>{' '}
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        {/* <FlexContainer label="Date of Birth" required>
          <LabeledDateInputMolecule
            // label="Date of Birth"
            label=""
            // required
            value={userInfo.dateOfBirth}
            name="dateOfBirth"
            onDateChange={(_, v) => handlePersonalInfoChange('dateOfBirth', v)}
            maxDate={toJavaLocalDateString(
              dayjs().subtract(18, 'year').toDate(),
              false,
            )}
            picker="date"
          />
        </FlexContainer>{' '} */}
        <FlexContainer label="Date of Birth" className="relative" required>
          <Input
            value={userInfo.dateOfBirth || undefined}
            name="dateOfBirth"
            onChange={(e) => {
              handlePersonalInfoChange('dateOfBirth', e.target.value);
            }}
            placeholder="2024-01-01"
            disabled={true}
          />
        </FlexContainer>{' '}
        <FlexContainer label="SSN" required>
          <Input
            value={userInfo.ssn || undefined}
            name="ssn"
            onChange={(e) => {
              handlePersonalInfoChange('ssn', e.target.value);
            }}
            placeholder="XXXX"
            disabled={true}
          />
        </FlexContainer>{' '}
        <FlexContainer label="Email" className="relative" required>
          <Input
            value={userInfo.email || undefined}
            name="email"
            onChange={(e) => {
              handlePersonalInfoChange('email', e.target.value);
            }}
            placeholder="john@example.com"
            disabled={true}
          />
        </FlexContainer>
      </div>
    </div>
  );
}

export default PersonalInformation;
