import React from 'react';
import LabeledInputMolecule from '../../components/LabeledInput/LabeledInput.molecule';
import { FlexContainer } from '../../components/flex-container';
import LabelSelectMolecule from '../../components/Input/LabelSelectMolecule';
import { Gender, Programs } from '../../constants';
import LabeledDateInputMolecule from '../../components/LabeledDateInput/LabeledDateInput.molecule';
import { useAddStudent } from '../../hooks/admin.hooks';
import { ButtonPrimary } from '../../components/design-system/buttons';
import Center from '../../components/Layout/Center/Center';
import { CloudUploadFilled } from '../../components/Icons/svg';
import FileInput from '../../components/Icons/svg/file-input';

const AddStudent = () => {
  const { data, onChange, loading, handleAddSubmit } = useAddStudent();
  return (
    <div className="p-5 lg:mx-72 my-12 w-full flex flex-col items-center">
      <h2 className="text-4xl text-center">Add Student</h2>
      <div className="w-full lg:w-[60%]">
        <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
          <FlexContainer labelRequired={false} label={''}>
            <LabeledInputMolecule
              inputProps={{
                required: true,
                placeholder: 'Full Names',
                value: data.fullName,
                onChange: (e) => onChange('fullName', e.target.value),
              }}
              required
              label="Full Name"
            />
          </FlexContainer>
          <FlexContainer labelRequired={false} label={''}>
            <LabeledInputMolecule
              inputProps={{
                required: true,
                value: data.matriculationNumber,
                placeholder: 'Matriculation number',
                onChange: (e) =>
                  onChange('matriculationNumber', e.target.value),
              }}
              required
              label="Matriculation Number"
            />
          </FlexContainer>
        </div>
        <div>
          <LabelSelectMolecule
            label="Gender"
            name="gender"
            required
            placeholder={'Gender'}
            showSearch={false}
            options={Gender}
            allowClear={false}
            onChange={(e) => onChange('gender', e.target.value)}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
          <FlexContainer labelRequired={false} label={''}>
            <LabeledDateInputMolecule
              name="dateOfBirth"
              value={data.dateOfBirth}
              onDateChange={(_, e) => onChange('dateOfBirth', e)}
              required
              picker="date"
              label="Date of Birth"
            />
          </FlexContainer>
          <LabelSelectMolecule
            label="School or Department"
            name="department"
            required
            placeholder={'Select school or department'}
            showSearch={false}
            options={[]}
            onChange={(e) => onChange('department', e.target.value)}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
        </div>
        <div>
          <FlexContainer labelRequired={false} label={''}>
            <LabeledInputMolecule
              inputProps={{
                required: true,
                placeholder: 'Place of Birth',
                value: data.placeOfBirth,
                onChange: (e) => onChange('placeOfBirth', e.target.value),
              }}
              required
              label="Place of Birth"
            />
          </FlexContainer>
          <LabelSelectMolecule
            label="Select Program"
            name="program"
            required
            placeholder={'Select program'}
            showSearch={false}
            options={Programs}
            onChange={(e) => onChange('program', e.target.value)}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
          <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
            <FlexContainer label="Student 4x4 Photo">
              <FileInput
                id="studentProfile"
                label=""
                onChange={(files) => {
                  if (files && files?.length > 0) {
                    onChange('file', files[0]);
                  }
                }}
                inputText={'Select file or drag/drop to upload'}
                accept=".jpg,.png,.pdf"
                className="text-body text-textColor flex justify-between items-center w-full"
                showSelected
                // onSignUrl={(e) => {
                //   onChange('file', e);
                //   return onSignUrl ? onSignUrl(e) : new Promise(() => {});
                // }}
              >
                <CloudUploadFilled className="text-[24px]" />
              </FileInput>
            </FlexContainer>
          </div>{' '}
          <Center>
            <ButtonPrimary
              className="mt-4 w-full text-ce"
              onClick={handleAddSubmit}
              loading={loading}
            >
              Add Student
            </ButtonPrimary>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
