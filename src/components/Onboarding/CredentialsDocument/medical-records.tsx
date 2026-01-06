import { Button, Collapse, Layout, Select } from 'antd';
import { useMedTestDocument } from '../onboarding.hooks';
import LabeledDateInputMolecule from '../../LabeledDateInput/LabeledDateInput.molecule';
import { SaveFilled } from '@ant-design/icons';
import { FlexContainer } from '../../flex-container';
import { TuberculosisTestType } from '../../../constants';
import FileInput from '../../Icons/svg/file-input';
import { CloudUploadFilled } from '../../Icons/svg';
import { useTranslation } from 'react-i18next';

export const MedicalRecords = () => {
  const {
    medTestRecordsDefinition,
    activeKey,
    displayNextBtn,
    setActiveKey,
    setSelectedFiles,
    handleChange,
    errors,
    isLoading,
    onSubmit,
    handleSaveAndOpenNext,
    selectedFiles,
    medRecords,
  } = useMedTestDocument();
  const { t } = useTranslation();
  const items = medTestRecordsDefinition.map((test, index) => ({
    key: String(index),
    label: test.name,
    children: (
      <div style={{ textAlign: 'left' }}>
        {test && (
          <>
            {test.requiredFields.map((field, fieldIndex) => {
              const testName = test.name.replace(/\s+/g, '').toLowerCase();
              const errorKey = `${testName}-${field}`;
              const fieldName = field.replace(/\s+/g, '').toLowerCase();
              const fieldValue = medRecords?.[testName]?.[fieldName];
              let inputElement;
              if (field === 'Type of Tuberculosis Test') {
                inputElement = (
                  <FlexContainer label={field} key={fieldIndex} required>
                    <Select
                      style={{
                        marginTop: '10px',
                      }}
                      className="h-[40px] text-left"
                      placeholder={field}
                      value={fieldValue}
                      onChange={(value) =>
                        handleChange(testName, fieldName, value)
                      }
                      options={Object.entries(TuberculosisTestType).map(
                        ([k, v]) => ({
                          label: v,
                          value: k,
                        }),
                      )}
                    />
                  </FlexContainer>
                );
              } else if (field.includes('Date')) {
                inputElement = (
                  <FlexContainer key={fieldIndex} label={''}>
                    <LabeledDateInputMolecule
                      required
                      name={field}
                      picker="date"
                      onDateChange={(_, v) => {
                        handleChange(testName, fieldName, v);
                      }}
                      value={fieldValue}
                      label={field}
                    />
                  </FlexContainer>
                );
              } else if (field.includes('File')) {
                inputElement = (
                  <FlexContainer key={fieldIndex} label="Drag/Drop or Select">
                    <FileInput
                      id={`file-input-id-${testName}`}
                      label=""
                      onChange={(files) => {
                        if (files && files.length > 0) {
                          setSelectedFiles((prevFiles) => ({
                            ...prevFiles,
                            [testName]: files[0],
                          }));
                        }
                      }}
                      inputText={
                        selectedFiles?.[testName]?.name ||
                        t('select-drag-drop-upload')
                      }
                      title={selectedFiles?.[testName]?.name}
                      accept=".jpg,.png,.pdf"
                      className="h-[40px] w-full wkr-profile-file-btn"
                    >
                      <CloudUploadFilled className="text-[28px]" />
                    </FileInput>
                    {errors && errors[errorKey] && (
                      <Layout>{errors[errorKey]}</Layout>
                    )}
                  </FlexContainer>
                );
              }
              return (
                <div className="flex gap-4 flex-1" key={fieldIndex}>
                  <Layout
                    style={{
                      backgroundColor: 'inherit',
                    }}
                  >
                    {field.includes('Questionnaire') && (
                      <label>
                        <span
                          style={{
                            fontWeight: 600,
                            color: '#241773',
                            cursor: 'pointer',
                          }}
                        >
                          {field}
                        </span>

                        <span className="text-[#DF0A4A]">*</span>
                      </label>
                    )}
                    {inputElement}
                  </Layout>
                </div>
              );
            })}
          </>
        )}
        <div className="flex w-full p-2 md:p-8 justify-center">
          <Button
            className="text-white flex items-center h-[56px] bg-[#241773] w-[140px] justify-center"
              onClick={() => handleSaveAndOpenNext(test.name.replace(/\s+/g, '').toLowerCase())}
              disabled={isLoading}
          >
            Save <SaveFilled style={{ fontSize: 16 }} />
          </Button>
        </div>
      </div>
    ),
  }));
  return (
    <>
      <div className="flex text-center w-full gap-10 p-2 md:p-8 flex-col mt-[-10px] justify-center align-center">
        <h2 className="text-[32px] text-center font-[600] flex text-[#000]">
          Medical Test Records
        </h2>
      </div>
      <Collapse
        style={{
          textAlign: 'left',
          backgroundColor: 'inherit',
        }}
        items={items}
        defaultActiveKey={activeKey?.toString()}
        activeKey={activeKey?.toString()}
        expandIconPosition="end"
        onChange={(keys: string | string[]) => {
          // If a panel is manually opened, I want toooo update the active panel state
          if (typeof keys === 'string') {
            setActiveKey(parseInt(keys));
          } else {
            setActiveKey(parseInt(keys[1]));
          }
        }}
      />
      {displayNextBtn && (
        <div className="flex w-full p-2 md:p-8 justify-center">
          <Button
            className="text-white flex items-center h-[56px] bg-[#241773] w-[140px] justify-center"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Next <SaveFilled style={{ fontSize: 16 }} />
          </Button>
        </div>
      )}
    </>
  );
};

export default MedicalRecords;
