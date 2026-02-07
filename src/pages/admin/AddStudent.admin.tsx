import LabeledInputMolecule from '../../components/LabeledInput/LabeledInput.molecule';
import { FlexContainer } from '../../components/flex-container';
import LabelSelectMolecule from '../../components/Input/LabelSelectMolecule';
import {
  admissionYearOptions,
  Gender,
  levelOptions,
  semesterOptions,
} from '../../constants';
// import LabeledDateInputMolecule from '../../components/LabeledDateInput/LabeledDateInput.molecule';
import { useAddStudent } from '../../hooks/admin.hooks';
import { ButtonPrimary } from '../../components/design-system/buttons';
import Center from '../../components/Layout/Center/Center';
import { CloudUploadFilled } from '../../components/Icons/svg';
import FileInput from '../../components/Icons/svg/file-input';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Alert, Spin } from 'antd';

const AddStudent = () => {
  const {
    formData,
    programs,
    loading,
    isCreating,
    checkingMatricule,
    // matriculeAvailable,
    errors,
    creationSuccess,
    onChange,
    handleAddSubmit,
    checkMatricule,
    // validateField,
    // clearErrors,
    // resetForm,
    goBack,
  } = useAddStudent();

  const programOptions = programs.map((program) => ({
    value: program.id,
    label: `${program.name} (${program.award})`,
  }));

  return (
    <div className="p-5 lg:mx-72 my-12 w-full flex flex-col items-center">
      <div className="flex items-center lg:w-[60%] mb-8">
        <div className="flex cursor-pointer items-center" onClick={goBack}>
          <ArrowLeftOutlined className="" />
          <p className="text-primaryColor pl-4"> Back To All Students</p>
        </div>
        <h2 className="text-4xl flex-1 text-center">Add Student</h2>
      </div>

      {creationSuccess && (
        <div className="w-full lg:w-[60%] mb-6">
          <Alert
            message="Student Created Successfully"
            description="The student has been created and credentials have been generated. Please provide the student with their login details."
            type="success"
            showIcon
            closable
          />
        </div>
      )}

      {checkingMatricule && (
        <div className="w-full lg:w-[60%] mb-6">
          <Alert
            message="Checking Matricule Availability"
            description="Please wait while we check if the matricule number is available..."
            type="info"
            showIcon
          />
        </div>
      )}

      <div className="w-full lg:w-[60%]">
        <div className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <FlexContainer labelRequired={false} label={''}>
                <LabeledInputMolecule
                  inputProps={{
                    required: true,
                    placeholder: 'John Doe',
                    value: formData.full_name,
                    onChange: (e) => onChange('full_name', e.target.value),
                    disabled: isCreating,
                  }}
                  required
                  label="Full Name"
                  error={errors.full_name}
                />
              </FlexContainer>

              {/* Matriculation Number */}
              <FlexContainer labelRequired={false} label={''}>
                <LabeledInputMolecule
                  inputProps={{
                    required: true,
                    placeholder: 'e.g., 24-CMP-HND-001',
                    value: formData.matricule,
                    onChange: (e) => onChange('matricule', e.target.value),
                    onBlur: () => checkMatricule(),
                    disabled: isCreating || checkingMatricule,
                  }}
                  required
                  label="Matriculation Number"
                  error={errors.matricule}
                  // helpText={
                  //   checkingMatricule
                  //     ? 'Checking availability...'
                  //     : matriculeAvailable === true
                  //       ? '✓ Available'
                  //       : matriculeAvailable === false
                  //         ? '✗ Already exists'
                  //         : ''
                  // }
                />
              </FlexContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Email */}
              <FlexContainer labelRequired={false} label={''}>
                <LabeledInputMolecule
                  inputProps={{
                    required: true,
                    type: 'email',
                    placeholder: 'student@school.edu',
                    value: formData.email,
                    onChange: (e) => onChange('email', e.target.value),
                    disabled: isCreating,
                  }}
                  required
                  label="Email"
                  error={errors.email}
                />
              </FlexContainer>

              {/* Password */}
              <FlexContainer labelRequired={false} label={''}>
                <LabeledInputMolecule
                  inputProps={{
                    required: true,
                    type: 'password',
                    placeholder: 'Password',
                    value: formData.password,

                    // onChange: (e) => onChange('password', e.target.value),
                    disabled: true,
                  }}
                  required
                  label="Password"
                  error={errors.password}
                  // helpText="Default: Welcome123 (can be changed by student)"
                />
              </FlexContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Gender */}
              <FlexContainer labelRequired={false} label={''}>
                <LabelSelectMolecule
                  label="Gender"
                  name="gender"
                  required
                  placeholder={'Select gender'}
                  showSearch={false}
                  options={Gender}
                  value={formData.gender}
                  onChange={(e) => onChange('gender', e.target.value)}
                  disabled={isCreating}
                  error={errors.gender}
                />
              </FlexContainer>

              {/* Date of Birth */}
              <FlexContainer labelRequired={false} label={''}>
                <LabeledInputMolecule
                  inputProps={{
                    type: 'date',
                    placeholder: 'YYYY-MM-DD',
                    value: formData.date_of_birth,
                    onChange: (e) => onChange('date_of_birth', e.target.value),
                    disabled: isCreating,
                    max: new Date().toISOString().split('T')[0],
                  }}
                  label="Date of Birth"
                  error={errors.date_of_birth}
                />
              </FlexContainer>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Academic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Program */}
              <FlexContainer labelRequired={false} label={''}>
                <LabelSelectMolecule
                  label="Program"
                  name="program_id"
                  required
                  placeholder={'Select program'}
                  showSearch={true}
                  options={programOptions}
                  value={formData.program_id}
                  onChange={(e) => onChange('program_id', e.target.value)}
                  disabled={isCreating || loading}
                  error={errors.program_id}
                  loading={loading}
                />
              </FlexContainer>

              {/* Level */}
              <FlexContainer labelRequired={false} label={''}>
                <LabelSelectMolecule
                  label="Level"
                  name="level"
                  required
                  placeholder={'Select level'}
                  showSearch={false}
                  options={levelOptions}
                  value={formData.level}
                  onChange={(e) => onChange('level', e.target.value)}
                  disabled={isCreating}
                  error={errors.level}
                />
              </FlexContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Admission Year */}
              <FlexContainer labelRequired={false} label={''}>
                <LabelSelectMolecule
                  label="Admission Year"
                  name="admission_year"
                  required
                  placeholder={'Select year'}
                  showSearch={false}
                  options={admissionYearOptions}
                  value={formData.admission_year.toString()}
                  onChange={(e) => onChange('admission_year', Number(e))}
                  disabled={isCreating}
                  error={errors.admission_year}
                />
              </FlexContainer>

              {/* Current Semester */}
              <FlexContainer labelRequired={false} label={''}>
                <LabelSelectMolecule
                  label="Current Semester"
                  name="current_semester"
                  required
                  placeholder={'Select semester'}
                  showSearch={false}
                  options={semesterOptions}
                  value={formData.current_semester.toString()}
                  onChange={(e) => onChange('current_semester', Number(e))}
                  disabled={isCreating}
                  error={errors.current_semester}
                />
              </FlexContainer>

              {/* Total Fee */}
              <FlexContainer labelRequired={false} label={''}>
                <LabeledInputMolecule
                  inputProps={{
                    type: 'number',
                    placeholder: '0.00',
                    value: formData.total_fee,
                    onChange: (e) =>
                      onChange('total_fee', Number(e.target.value)),
                    disabled: isCreating,
                    min: 0,
                    step: '0.01',
                  }}
                  label="Total Fee"
                  error={errors.total_fee}
                  // prefix="$"
                />
              </FlexContainer>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Student Photo</h3>
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
                accept=".jpg,.jpeg,.png"
                className="text-body text-textColor flex justify-between items-center w-full"
                showSelected
                disabled={isCreating}
              >
                <CloudUploadFilled className="text-[24px]" />
              </FileInput>
              <p className="text-sm text-gray-500 mt-2">
                Accepted formats: JPG, PNG (Max 2MB)
              </p>
            </FlexContainer>
          </div>

          {/* Notes Section */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">
              Important Notes
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Student will receive login credentials via email</li>
              <li>
                • Student will be automatically registered for current semester
                courses
              </li>
              <li>• Fee status will be set to "unpaid" initially</li>
              <li>• Student can change their password after first login</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Center>
            <div className="flex gap-4 mt-8">
              <button
                onClick={goBack}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isCreating}
              >
                Cancel
              </button>
              <ButtonPrimary
                className="px-8 py-2"
                onClick={handleAddSubmit}
                loading={isCreating}
                disabled={isCreating || checkingMatricule}
              >
                {isCreating ? (
                  <span className="flex items-center gap-2">
                    <Spin size="small" />
                    Creating Student...
                  </span>
                ) : (
                  'Create Student'
                )}
              </ButtonPrimary>
            </div>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
