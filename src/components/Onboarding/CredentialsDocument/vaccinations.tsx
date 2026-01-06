import { Collapse, Layout, Select, Radio } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { FlexContainer } from '../../flex-container';
import LabeledDateInputMolecule from '../../LabeledDateInput/LabeledDateInput.molecule';
import FileInput from '../../Icons/svg/file-input';
import { CloudUploadFilled } from '../../Icons/svg';
import { useVaccinationsDocument } from '../onboarding.hooks';
import { Header } from 'antd/es/layout/layout';
import { Button } from '../../design-system/buttons';
import './index.css';

const Vaccinations = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    vaccinationConfig,
    errors,
    vaccinationsData,
    selectedFiles,
    setSelectedFiles,
    onSubmit,
    displayNextBtn,
    handleChange,
    activeKey,
    setActiveKey,
    handleSaveAndOpenNext,
  } = useVaccinationsDocument();

  const items = vaccinationConfig.map((vaccination, index) => ({
    key: String(index),
    label: vaccination.name,
    children: (
      <div className="text-left text-body text-textColor flex flex-col gap-8">
        {vaccination.fields &&
          vaccination.fields.map((field, fieldIndex) => {
            const vaccinationName = vaccination.name
              .replace(/\s+/g, '')
              .toLowerCase();
            const fieldValue =
              vaccinationsData?.[vaccinationName]?.[field.name];
            const errorKey = `${vaccinationName}-${field.type}`;
            return (
              <div className="flex flex-1" key={fieldIndex}>
                <Layout className="bg-whiteColor">
                  {field.type === 'radio' ? (
                    <Header
                      style={{
                        backgroundColor: 'inherit',
                        paddingLeft: 0,
                        marginBottom: 20,
                      }}
                      className="w-full h-[10px]"
                    >
                      <label>
                        <span className="text-body font-[500] text-textColor">
                          {field.label}
                        </span>
                        {field.required && (
                          <span className="text-body text-errorColor"> * </span>
                        )}
                      </label>
                      <Radio.Group
                        onChange={(e) =>
                          handleChange(
                            vaccinationName,
                            field.name,
                            e.target.value,
                          )
                        }
                        value={fieldValue}
                      >
                        {field.options?.map((option) => (
                          <Radio key={option.value} value={option.value}>
                            {option.label}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Header>
                  ) : field.type === 'select' ? (
                    <FlexContainer label={field.label} key={fieldIndex}>
                      <Select
                        className="h-[40px] text-left"
                        placeholder={field.placeholder}
                        value={fieldValue}
                        onChange={(value) =>
                          handleChange(vaccinationName, field.name, value)
                        }
                      >
                        {field.options?.map((option, optionIndex) => (
                          <Select.Option key={optionIndex} value={option.value}>
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </FlexContainer>
                  ) : field.type === 'date' ? (
                    <FlexContainer label={field.label} key={fieldIndex}>
                      <LabeledDateInputMolecule
                        key={fieldIndex}
                        name="finalVaccinationDate"
                        picker="date"
                        onDateChange={(_, v) =>
                          handleChange(vaccinationName, field.name, v)
                        }
                        value={fieldValue}
                        label=""
                      />
                    </FlexContainer>
                  ) : field.type === 'file' ? (
                    <FlexContainer
                      key={fieldIndex}
                      label={`Drag/Drop or Select ${vaccinationName.toUpperCase()} Vaccination file`}
                    >
                      <FileInput
                        id={`file-input-id-${vaccinationName}`}
                        label=""
                        onChange={(files) => {
                          if (files && files.length > 0) {
                            setSelectedFiles((prevFiles) => ({
                              ...prevFiles,
                              [vaccinationName]: files[0],
                            }));
                          }
                        }}
                        inputText={
                          selectedFiles?.[vaccinationName]?.name ||
                          t('select-drag-drop-upload')
                        }
                        title={selectedFiles?.[vaccinationName]?.name}
                        accept=".jpg,.png,.pdf"
                        className="text-body text-textColor flex justify-between items-center w-full"
                      >
                        <CloudUploadFilled className="text-[24px]" />
                      </FileInput>
                      {errors && errors[errorKey] && (
                        <Layout
                          style={{
                            color: 'red',
                            fontStyle: 'italic',
                            borderRadius: '5px',
                          }}
                        >
                          {errors[errorKey]}
                        </Layout>
                      )}
                    </FlexContainer>
                  ) : (
                    <input type="text" />
                  )}
                </Layout>
              </div>
            );
          })}
        <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
          <Button bordered>Cancel</Button>
          <Button
            onClick={() => handleSaveAndOpenNext(vaccination.name)}
            disabled={isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    ),
  }));
  return (
    <div className="flex flex-col gap-8 rounded-[10px] max-h-[650px] overflow-auto md:p-10 border-none md:border-solid border-[1px] border-borderColor">
      <div className="flex text-center w-full flex-col justify-center align-center">
        <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
          Vaccinations
        </h2>
      </div>
      <Collapse
        className="text-body text-textColor"
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
          <Button onClick={() => onSubmit} disabled={isLoading}>
            Next <ArrowRightOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Vaccinations;
