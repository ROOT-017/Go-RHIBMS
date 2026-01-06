import { CovidForm } from './covid19';
import { HepatitisForm } from './hepatitis';
import { InfluenzaForm } from './influenza';
import { MMRForm } from './measels';
import { TetanusForm } from './tetanus';
import { ChikenpoxForm } from './chikenpox';
import { InitialInternalSteps } from '../../../../pages/dashboard/profile/worker/internal-definitions';
import { Spin } from 'antd';
import { VaccineCollapse } from './VaccineCollapse';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useVaccinations } from './vaccines.hooks';
const VaccinationRecord = () => {
  const {
    loading,
    loadingList,
    vaccinationData,
    completed,
    onChange,
    onSubmit,
    onNext,
    onPrevious,
    onSignUrl,
    active,
    vaccination,
    toggleActive,
    formIsValid,
    formIsUpdated,
    handleFormIsUpdated,
    handleFormIsValid,
  } = useVaccinations();

  return (
    <div className="flex flex-col gap-8 rounded-[10px] max-h-[650px] overflow-auto md:p-10 border-none md:border-solid border-[1px] border-borderColor">
      <div className="flex text-center w-full flex-col justify-center align-center">
        <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
          Vaccinations
        </h2>
      </div>
      {!loadingList ? (
        <>
          <VaccineCollapse
            active={active['covid-19']}
            completed={completed['covid-19']}
            label={InitialInternalSteps.vaccinations.subSteps['covid-19'].label}
            onChange={() => toggleActive('covid-19')}
          >
            <CovidForm
              onSubmit={onSubmit('covid-19')}
              originalData={vaccination['covid-19']}
              file={vaccinationData['covid-19']?.file}
              manufacturer={vaccinationData['covid-19']?.manufacturer}
              completeSeriesReceived={
                vaccinationData['covid-19']?.completeSeriesReceived
              }
              finalDate={vaccinationData['covid-19']?.finalDate}
              onChange={onChange('covid-19')}
              loading={loading}
              vaccineDocumentKey={
                vaccinationData['covid-19']?.vaccineDocumentKey
              }
              disabled={
                !formIsValid['covid-19'] ||
                !formIsUpdated['covid-19']
              }
              onSignUrl={onSignUrl}
              reasonNotVaccinated={
                vaccinationData['covid-19']?.reasonNotVaccinated
              }
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
            />
          </VaccineCollapse>
          <VaccineCollapse
            active={active['hepatitis']}
            completed={completed['hepatitis']}
            label={
              InitialInternalSteps.vaccinations.subSteps['hepatitis'].label
            }
            onChange={() => toggleActive('hepatitis')}
          >
            <HepatitisForm
              onSubmit={onSubmit('hepatitis')}
              disabled={
                !formIsValid['hepatitis'] ||
                !formIsUpdated['hepatitis']
              }
              file={vaccinationData['hepatitis']?.file}
              originalData={vaccination['hepatitis']}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              finalDate={vaccinationData['hepatitis']?.finalDate}
              vaccineDocumentKey={
                vaccinationData['hepatitis']?.vaccineDocumentKey
              }
              seriesDates={vaccinationData['hepatitis']?.seriesDates}
              immunityType={vaccinationData['hepatitis']?.immunityType}
              onChange={onChange('hepatitis')}
              loading={loading}
              onSignUrl={onSignUrl}
              goToPrevious={toggleActive}
            />
          </VaccineCollapse>
          <VaccineCollapse
            active={active['influenza']}
            completed={completed['influenza']}
            onChange={() => toggleActive('influenza')}
            label={
              InitialInternalSteps.vaccinations.subSteps['influenza'].label
            }
          >
            <InfluenzaForm
              goToPrevious={toggleActive}
              onSubmit={onSubmit('influenza')}
              disabled={
                !formIsValid['influenza'] ||
                !formIsUpdated['influenza']
              }
              file={vaccinationData['influenza']?.file}
              originalData={vaccination.influenza}
              issueDate={vaccinationData['influenza']?.issueDate}
              expiryDate={vaccinationData['influenza']?.expiryDate}
              vaccineDocumentKey={
                vaccinationData['influenza']?.vaccineDocumentKey
              }
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              currentOnShots={vaccinationData['influenza']?.currentOnShots}
              onChange={onChange('influenza')}
              loading={loading}
              onSignUrl={onSignUrl}
            />
          </VaccineCollapse>
          <VaccineCollapse
            active={active['mmr']}
            onChange={() => toggleActive('mmr')}
            completed={completed['mmr']}
            label={InitialInternalSteps.vaccinations.subSteps['mmr'].label}
          >
            <MMRForm
              goToPrevious={toggleActive}
              onSubmit={onSubmit('mmr')}
              disabled={
                !formIsValid['mmr'] || !formIsUpdated['mmr']
              }
              file={vaccinationData['mmr']?.file}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              issueDate={vaccinationData['mmr']?.issueDate}
              immunityType={vaccinationData['mmr']?.immunityType}
              vaccineDocumentKey={vaccinationData['mmr']?.vaccineDocumentKey}
              onChange={onChange('mmr')}
              loading={loading}
              originalData={vaccination.mmr}
              onSignUrl={onSignUrl}
            />
          </VaccineCollapse>
          <VaccineCollapse
            onChange={() => toggleActive('tdap')}
            active={active['tdap']}
            completed={completed['tdap']}
            label={InitialInternalSteps.vaccinations.subSteps['tdap'].label}
          >
            <TetanusForm
              goToPrevious={toggleActive}
              onSubmit={onSubmit('tdap')}
              disabled={
                !formIsValid['tdap'] || !formIsUpdated['tdap']
              }
              file={vaccinationData['tdap']?.file}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              issueDate={vaccinationData['tdap']?.issueDate}
              originalData={vaccination.tdap}
              expiryDate={vaccinationData['tdap']?.expiryDate}
              vaccineDocumentKey={vaccinationData['tdap']?.vaccineDocumentKey}
              onChange={onChange('tdap')}
              loading={loading}
              onSignUrl={onSignUrl}
            />
          </VaccineCollapse>
          <VaccineCollapse
            onChange={() => toggleActive('varicella')}
            active={active['varicella']}
            completed={completed['varicella']}
            label={
              InitialInternalSteps.vaccinations.subSteps['varicella'].label
            }
          >
            <ChikenpoxForm
              goToPrevious={toggleActive}
              onSubmit={onSubmit('varicella')}
              handleFormIsUpdated={handleFormIsUpdated}
              handleFormIsValid={handleFormIsValid}
              disabled={
                !formIsValid['varicella'] ||
                !formIsUpdated['varicella']
              }
              issueDate={vaccinationData['varicella']?.issueDate}
              vaccineDocumentKey={
                vaccinationData['varicella']?.vaccineDocumentKey
              }
              file={vaccinationData.varicella?.file}
              seriesDates={vaccinationData['varicella']?.seriesDates}
              immunityType={vaccinationData['varicella']?.immunityType}
              onChange={onChange('varicella')}
              loading={loading}
              onSignUrl={onSignUrl}
            />
          </VaccineCollapse>
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
            Object.keys(vaccinationData).some(
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

export default VaccinationRecord;
