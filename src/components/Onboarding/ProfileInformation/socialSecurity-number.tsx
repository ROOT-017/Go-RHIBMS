import { Card, Input, Layout } from 'antd';
import { useSocialSecurityNumberDocument } from '../onboarding.hooks';
import { useTranslation } from 'react-i18next';
import { FlexContainer } from '../../flex-container';
import FileInput from '../../Icons/svg/file-input';
import { CloudUploadFilled } from '../../Icons/svg';
import { ButtonPrimary, Button } from '../../design-system/buttons';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ValidationPattern } from '../../../constants';
import { formatSSN } from '../../../utils';

const SocialsecurityNumber = () => {
  const {
    selectedFileName,
    isLoading,
    ssn,
    setSelectedFile,
    errors,
    onChange,
    onSubmit,
    onPrevious,
    onSignUrl,
    formUpdated,
  } = useSocialSecurityNumberDocument();
  const { t } = useTranslation();
  return (
    <Card
      className="p-[10px]"
      title={
        <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
          Social Security Number
        </h2>
      }
    >
      <div className="flex w-full gap-8 flex-col md:flex-row flex-wrap mt-[10px]">
        <FlexContainer label="SSN" required>
          <Input
            value={ssn}
            onChange={(e) => onChange(formatSSN(e.target.value))}
            placeholder="721-07-1426"
            type="text"
            maxLength={11}
          />
        </FlexContainer>

        <FlexContainer label="Upload SSN Document" required>
          <FileInput
            id="file-input-ssn-doc"
            label=""
            onChange={(files) => {
              if (files && files?.length > 0) {
                setSelectedFile(files[0]);
              }
            }}
            inputText={selectedFileName || t('select-drag-drop-upload')}
            title={selectedFileName}
            accept=".jpg,.png,.pdf"
            className="h-[40px] w-full wkr-profile-file-btn"
            onSignUrl={onSignUrl}
          >
            <CloudUploadFilled className="text-[28px]" />
          </FileInput>
          {errors.file && (
            <Layout
              style={{ fontSize: '12px', color: 'red', fontStyle: 'italic' }}
            >
              {errors.file}
            </Layout>
          )}
        </FlexContainer>
        {errors && errors['SSN document'] && (
          <Layout
            style={{ color: 'red', fontStyle: 'italic', borderRadius: '5px' }}
          >
            {errors['SSN document']}
          </Layout>
        )}
      </div>
      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button bordered onClick={onPrevious}>
          <ArrowLeftOutlined />
          Previous
        </Button>
        <ButtonPrimary
          onClick={onSubmit}
          disabled={
            isLoading ||
            !ssn ||
            !selectedFileName ||
            Object.values(errors).some((error) => error !== null) ||
            !formUpdated ||
            !ValidationPattern.ssnRegex.test(ssn)
          }
          loading={isLoading}
        >
          Continue <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </Card>
  );
};

export default SocialsecurityNumber;
