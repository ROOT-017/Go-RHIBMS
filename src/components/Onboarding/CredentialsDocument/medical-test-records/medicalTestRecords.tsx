import { Spin } from 'antd';
import { CovidForm } from './covidTest';
import { FitTestForm } from './fitTest';
import { MedicalTestCollapse } from './MedicalTestCollapse';
import { PETestForm } from './peTest';
import { TBQuestionnaireForm } from './tbQuestionare';
import { useMedicalTestRecords } from './testrecords.hooks';
import { TBTestForm } from './tuberclosisTest';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { usePrincipal } from '../../../../hooks/common.hooks';

const MedicalTestRecords = () => {
  const {
    loading,
    loadingList,
    completed,
    medicalTestData,
    steps,
    onChange,
    onNext,
    onPrevious,
    onSubmit,
    onSignUrl,
    toggleActive,
    active,
    formIsUpdated,
    formIsValid,
    handleFormIsUpdated,
    handleFormIsValid,
    medicalTest,
  } = useMedicalTestRecords();

  const principal = usePrincipal();
  return (
    <div className="flex flex-col gap-8 rounded-[10px] max-h-[650px] overflow-auto md:p-10 border-none md:border-solid border-[1px] border-borderColor">
      <div className="flex text-center w-full flex-col justify-center align-center">
        <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
          Medical Test Records
        </h2>
      </div>
      {!loadingList ? (
        <>
          <MedicalTestCollapse
            active={active['tuberculosis-test']}
            completed={completed['tuberculosis-test']}
            label={steps['tuberculosis-test'].label}
            onChange={() => toggleActive('tuberculosis-test')}
          >
            <TBTestForm
              onSubmit={onSubmit('tuberculosis-test')}
              disabled={
                !formIsValid['tuberculosis-test'] ||
                !formIsUpdated['tuberculosis-test']
              }
              file={medicalTestData['tuberculosis-test']?.file}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              originalData={medicalTest['tuberculosis-test'] ?? {}}
              expiryDate={medicalTestData['tuberculosis-test']?.expiryDate}
              issueDate={medicalTestData['tuberculosis-test']?.issueDate}
              testType={medicalTestData['tuberculosis-test']?.testType}
              onChange={onChange('tuberculosis-test')}
              loading={loading}
              recordDocumentKey={
                medicalTestData['tuberculosis-test']?.recordDocumentKey
              }
              onSignUrl={onSignUrl}
            />
          </MedicalTestCollapse>
          <MedicalTestCollapse
            active={active['tuberculosis-questionnaire']}
            onChange={() => toggleActive('tuberculosis-questionnaire')}
            completed={completed['tuberculosis-questionnaire']}
            label={steps['tuberculosis-questionnaire'].label}
          >
            <TBQuestionnaireForm
              onChange={onChange('tuberculosis-questionnaire')}
              onSubmit={onSubmit('tuberculosis-questionnaire')}
              originalData={medicalTest['tuberculosis-questionnaire'] ?? {}}
              disabled={
                !formIsValid['tuberculosis-questionnaire'] ||
                !formIsUpdated['tuberculosis-questionnaire']
              }
              file={medicalTestData['tuberculosis-questionnaire']?.file}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              issueDate={
                medicalTestData['tuberculosis-questionnaire']?.issueDate
              }
              expiryDate={
                medicalTestData['tuberculosis-questionnaire']?.expiryDate
              }
              recordDocumentKey={
                medicalTestData['tuberculosis-questionnaire']?.recordDocumentKey
              }
              user={principal?.user}
              loading={loading}
              onSignUrl={onSignUrl}
              goToPrevious={toggleActive}
            />
          </MedicalTestCollapse>
          <MedicalTestCollapse
            active={active['covid-19']}
            completed={completed['covid-19']}
            onChange={() => toggleActive('covid-19')}
            label={steps['covid-19'].label}
          >
            <CovidForm
              onChange={onChange('covid-19')}
              onSubmit={onSubmit('covid-19')}
              disabled={!formIsValid['covid-19'] || !formIsUpdated['covid-19']}
              originalData={medicalTest['covid-19'] ?? {}}
              file={medicalTestData['covid-19']?.file}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              issueDate={medicalTestData['covid-19']?.issueDate}
              recordDocumentKey={medicalTestData['covid-19']?.recordDocumentKey}
              loading={loading}
              goToPrevious={toggleActive}
              onSignUrl={onSignUrl}
            />
          </MedicalTestCollapse>
          <MedicalTestCollapse
            active={active['pe-test']}
            // active={completed['covid-19']}
            completed={completed['pe-test']}
            label={steps['pe-test'].label}
            onChange={() => toggleActive('pe-test')}
          >
            <PETestForm
              onChange={onChange('pe-test')}
              onSubmit={onSubmit('pe-test')}
              file={medicalTestData['pe-test']?.file}
              originalData={medicalTest['pe-test'] ?? {}}
              disabled={!formIsValid['pe-test'] || !formIsUpdated['pe-test']}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              user={principal?.user}
              issueDate={medicalTestData['pe-test']?.issueDate}
              expiryDate={medicalTestData['pe-test']?.expiryDate}
              recordDocumentKey={medicalTestData['pe-test']?.recordDocumentKey}
              loading={loading}
              onSignUrl={onSignUrl}
              goToPrevious={toggleActive}
            />
          </MedicalTestCollapse>
          <MedicalTestCollapse
            active={active['fit-test']}
            completed={completed['fit-test']}
            label={steps['fit-test'].label}
            onChange={() => toggleActive('fit-test')}
          >
            <FitTestForm
              onChange={onChange('fit-test')}
              onSubmit={onSubmit('fit-test')}
              file={medicalTestData['fit-test']?.file}
              originalData={medicalTest['fit-test'] ?? {}}
              disabled={!formIsValid['fit-test'] || !formIsUpdated['fit-test']}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              goToPrevious={toggleActive}
              issueDate={medicalTestData['fit-test']?.issueDate}
              expiryDate={medicalTestData['fit-test']?.expiryDate}
              recordDocumentKey={medicalTestData['fit-test']?.recordDocumentKey}
              loading={loading}
              onSignUrl={onSignUrl}
            />
          </MedicalTestCollapse>
        </>
      ) : (
        <Spin />
      )}
      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button bordered onClick={onPrevious}>
          <ArrowLeftOutlined />
          Previous
        </Button>
        <ButtonPrimary
          onClick={onNext}
          disabled={
            completed == null ||
            Object.keys(medicalTestData).some(
              (k) => !completed[k as keyof typeof completed],
            )
          }
        >
          Continue <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default MedicalTestRecords;
