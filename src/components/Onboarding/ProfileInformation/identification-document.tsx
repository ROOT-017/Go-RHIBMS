import { Card, Flex, Layout, Select } from 'antd';
import { FlexContainer } from '../../flex-container';
import { AdditionalDocumentRequired, IdDocumentName } from '../../../constants';
import FileInput from '../../Icons/svg/file-input';
import { CloudUploadFilled } from '../../Icons/svg';
import { useTranslation } from 'react-i18next';
import { useProfileIdDocument } from '../onboarding.hooks';
import LabeledDateInputMolecule from '../../LabeledDateInput/LabeledDateInput.molecule';
import { ButtonPrimary, Button } from '../../design-system/buttons';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { toJavaLocalDateString } from '../../../utils/date-time';

export const IdentificationDocument = () => {
  const {
    selectedFileName,
    requireAdditionalDoc,
    errors,
    onChange,
    // issueDate,
    // expiryDate,
    formIsValid,
    isLoading,
    onSubmit,
    onPrevious,
    onSignUrl,
    setFileName,
    formIsUpdated,
    setSelectedFile,
    userPersonalData,
    setAdditionalFileName,
    additionalSelectedFileName,
    setAdditionalSelectedFile,
  } = useProfileIdDocument();
  const { t } = useTranslation();
  return (
    <Card
      className="p-[10px]"
      title={
        <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
          Identification Document
        </h2>
      }
    >
      <div className="flex w-full gap-8 flex-col md:flex-row flex-wrap">
        <FlexContainer label="Identification Type" required>
          <Select
            value={userPersonalData.identificationType || undefined}
            onChange={(value) => {
              onChange('identificationType', value);
            }}
            placeholder="Please select Identification type"
            options={Object.entries(IdDocumentName).map(([k, v]) => ({
              label: v,
              value: k,
            }))}
          />
        </FlexContainer>
        <FlexContainer label="Upload Identification Document" required>
          <FileInput
            id="file-input-id-doc"
            label=""
            onChange={(files) => {
              if (files && files?.length > 0) {
                setSelectedFile(files[0]);
                setFileName(files[0].name);
              }
            }}
            inputText={selectedFileName || t('select-drag-drop-upload')}
            title={selectedFileName}
            accept=".jpg,.png,.pdf"
            className="h-[40px] w-full wkr-profile-file-btn"
            onSignUrl={onSignUrl}
          >
            <CloudUploadFilled className="text-[24px]" />
          </FileInput>
        </FlexContainer>
        {errors && errors['Identification Document'] && (
          <Layout
            style={{ color: 'red', fontStyle: 'italic', borderRadius: '5px' }}
          >
            {errors['Identification Document']}
          </Layout>
        )}
      </div>

      <div className="flex w-full gap-8 flex-col md:flex-row flex-wrap mt-[20px]">
        <Flex className="flex-1">
          {' '}
          <LabeledDateInputMolecule
            label="Issue Date"
            required
            value={userPersonalData.issueDate}
            onDateChange={(_, v) => onChange('issueDate', v)}
            maxDate={toJavaLocalDateString(new Date(), false)}
            name="issueDate"
            picker="date"
          />
        </Flex>
        <Flex className="flex-1">
          <LabeledDateInputMolecule
            label="Expiration Date"
            required
            disabled={!userPersonalData.issueDate}
            minDate={toJavaLocalDateString(new Date(), false)}
            value={userPersonalData.expiryDate}
            onDateChange={(_, v) => onChange('expiryDate', v)}
            name="expiryDate"
            picker="date"
          />
        </Flex>
      </div>
      {requireAdditionalDoc && (
        <>
          <div className="flex w-full gap-8 flex-col md:flex-row flex-wrap mt-[20px]">
            <FlexContainer label="Additional Identification type" required>
              <Select
                className="h-[40px] text-left"
                value={
                  userPersonalData.additionalIdentificationType || undefined
                }
                onChange={(value) =>
                  onChange('additionalIdentificationType', value)
                }
                placeholder="Select Additional Identification type"
                options={Object.entries(AdditionalDocumentRequired).map(
                  ([k, v]) => ({
                    label: v,
                    value: k,
                  }),
                )}
              />
            </FlexContainer>
            <FlexContainer label="Upload Additional Identification document" required>
              <FileInput
                id="file-input-add-id-doc"
                label=""
                onChange={(files) => {
                  if (files && files?.length > 0) {
                    setAdditionalSelectedFile(files[0]);
                    setAdditionalFileName(files[0].name);
                  }
                }}
                inputText={
                  additionalSelectedFileName || t('select-drag-drop-upload')
                }
                title={additionalSelectedFileName ?? ''}
                accept=".jpg,.png,.pdf"
                className="h-[40px] w-full wkr-profile-file-btn"
              >
                <CloudUploadFilled className="text-[28px]" />
              </FileInput>
            </FlexContainer>

            {errors && errors['Additional Identification Document'] && (
              <Layout
                style={{
                  color: 'red',
                  fontStyle: 'italic',
                  borderRadius: '5px',
                }}
              >
                {errors['Additional Identification Document']}
              </Layout>
            )}
          </div>
          <div className="flex w-full gap-8 flex-col md:flex-row flex-wrap mt-[20px]">
            <Flex className="flex-1">
              {' '}
              <LabeledDateInputMolecule
                label="Issue Date"
                required
                value={userPersonalData.addDocIssueDate}
                onDateChange={(_, v) => onChange('addDocIssueDate', v)}
                maxDate={toJavaLocalDateString(new Date(), false)}
                name="issueDate"
                picker="date"
              />
            </Flex>
            <Flex className="flex-1">
              <LabeledDateInputMolecule
                label="Expiration Date"
                required
                disabled={!userPersonalData.addDocIssueDate}
                minDate={toJavaLocalDateString(new Date(), false)}
                value={userPersonalData.addDocExpiryDate}
                onDateChange={(_, v) => onChange('addDocExpiryDate', v)}
                name="expiryDate"
                picker="date"
              />
            </Flex>
          </div>
        </>
      )}
      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button bordered onClick={onPrevious}>
          <ArrowLeftOutlined />
          Previous
        </Button>
        <ButtonPrimary
          onClick={onSubmit}
          disabled={
            !formIsValid ||
            isLoading ||
            !formIsUpdated ||
            Object.values(errors).some((error) => error !== null)
          }
          loading={isLoading}
        >
          Continue <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </Card>
  );
};

export default IdentificationDocument;
