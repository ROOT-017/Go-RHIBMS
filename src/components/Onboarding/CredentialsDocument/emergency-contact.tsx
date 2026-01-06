import { Card, Input, Select } from 'antd';
import { FlexContainer } from '../../flex-container';
import { RelationshipName } from '../../../constants';
import { useEmergencyContactDocument } from '../onboarding.hooks';
import PhoneNumberInput from '../../PhoneNumberInput/phone-number-input.component';
import { ButtonPrimary, Button } from '../../design-system/buttons';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const EmergencyContact = () => {
  const {
    isLoading,
    validity,
    onSubmit,
    setValidity,
    onPrevious,
    completed,
    formIsUpdated,
    formIsValid,
    onChange,
    updatedData,
  } = useEmergencyContactDocument();
  return (
    <Card
      className="md:p-[10px] p-0"
      title={
        <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
          Emergency Contact
        </h2>
      }
    >
      <div className="flex w-full gap-8 flex-col md:flex-row flex-wrap mt-[10px]">
        <FlexContainer label="First Name" required>
          <Input
            className="h-[40px] text-left"
            value={updatedData.firstName || undefined}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder="John"
          />
        </FlexContainer>
        <FlexContainer label="Last Name" required>
          <Input
            value={updatedData.lastName || undefined}
            onChange={(e) => onChange('lastName', e.target.value)}
            placeholder="Doe"
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 flex-col md:flex-row flex-wrap mt-[10px]">
        <FlexContainer label="Relationship" required>
          <Select
            className="h-[40px] text-left"
            value={updatedData.relationship || undefined}
            onChange={(e) => onChange('relationship', e)}
            placeholder="Spouse"
            options={Object.entries(RelationshipName).map(([k, v]) => ({
              label: v,
              value: k,
            }))}
          ></Select>
        </FlexContainer>

        <FlexContainer label="Phone Number" required>
          <PhoneNumberInput
            value={updatedData.phone ?? ''}
            onChange={(e) => onChange('phone', e)}
            onValidityChange={(valid) => {
              setValidity((v) => ({ ...(v ?? {}), phone: valid }));
            }}
            dial={updatedData.dial}
            onDialChange={(d) => onChange('dial', d ?? '')}
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 flex-col md:flex-row flex-wrap mt-[10px]">
        <FlexContainer label="Email Address" required>
          <Input
            value={updatedData.email}
            onChange={(e) => {
              setValidity((v) => ({
                ...(v ?? {}),
                email: e.target.validity.valid,
              }));
              onChange('email', e.target.value);
            }}
            placeholder="emergencycontact@gmail.com"
            type="email"
            status={validity?.email != null && !validity?.email ? 'error' : ''}
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button bordered onClick={onPrevious}>
          <ArrowLeftOutlined />
          Previous
        </Button>
        <ButtonPrimary
          onClick={onSubmit}
          disabled={
            completed && !formIsUpdated
              ? true
              : formIsUpdated && formIsValid
                ? false
                : !formIsValid
          }
          loading={isLoading}
        >
          Continue <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </Card>
  );
};

export default EmergencyContact;
