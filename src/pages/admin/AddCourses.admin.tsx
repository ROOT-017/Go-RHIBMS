import { FlexContainer } from '../../components/flex-container';
import LabeledInputMolecule from '../../components/LabeledInput/LabeledInput.molecule';
import LabelSelectMolecule from '../../components/Input/LabelSelectMolecule';
import Center from '../../components/Layout/Center/Center';
import { ButtonPrimary } from '../../components/design-system/buttons';
import { useAddCourse } from '../../hooks/admin.hooks';
import { academicLevel, Semester } from '../../constants';
import LabeledDateInputMolecule from '../../components/LabeledDateInput/LabeledDateInput.molecule';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AddCourses = () => {
  const { data, onChange, loading, handleAddSubmit } = useAddCourse();
  const navigate = useNavigate();

  return (
    <div className="p-5 my-12 w-full flex flex-col items-center">
      <div className="flex items-center lg:w-[60%]">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate('/admin/dashboard/add-course')}
        >
          <ArrowLeftOutlined className="" />
          <p className="text-primaryColor pl-4"> Back To All A Courses</p>{' '}
        </div>
        <h2 className="text-4xl flex-1 text-center">Add Course</h2>
      </div>
      <div className="w-full lg:w-[60%]">
        <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
          <FlexContainer labelRequired={false} label={''}>
            <LabeledInputMolecule
              inputProps={{
                required: true,
                placeholder: 'Course title',
                value: data.courseTitle,
                onChange: (e) => onChange('courseTitle', e.target.value),
              }}
              required
              label="Course Title"
            />
          </FlexContainer>
          <FlexContainer labelRequired={false} label={''}>
            <LabeledInputMolecule
              inputProps={{
                required: true,
                // type: 'number',
                value: data.courseCode,
                placeholder: 'Course code',
                onChange: (e) => onChange('courseCode', e.target.value),
              }}
              required
              label="Course Code"
            />
          </FlexContainer>
        </div>
        <div>
          <LabelSelectMolecule
            label="Select School"
            name="selectSchool"
            required
            placeholder={'Select school'}
            showSearch={false}
            options={[]}
            allowClear={false}
            onChange={(e) => onChange('school', e.target.value)}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
          <LabelSelectMolecule
            label="Select Department"
            name="selectDepartment"
            required
            placeholder={'Select department'}
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
          <LabelSelectMolecule
            label="Select Semester"
            name="semester"
            required
            placeholder={'Select semester'}
            showSearch={false}
            options={Semester}
            onChange={(e) => onChange('semester', e.target.value)}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
          <LabelSelectMolecule
            label="Select Level"
            name="level"
            required
            placeholder={'Select level'}
            showSearch={false}
            options={academicLevel}
            onChange={(e) => onChange('level', e.target.value)}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
          <LabeledDateInputMolecule
            label="Select Year"
            name="year"
            required
            picker="year"
            // placeholder={'Select year'}
            // showSearch={false}
            // options={[]}
            value={data.year}
            onDateChange={(_, e) => {
              onChange('year', e);
            }}
            // filterSort={(optionA, optionB) =>
            //   String(optionA?.label ?? '')
            //     .toLowerCase?.()
            //     .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            // }
          />
          <Center>
            <ButtonPrimary
              className="p-4 flex w-full mt-4 justify-center items-center"
              onClick={handleAddSubmit}
              loading={loading}
            >
              Add Course
            </ButtonPrimary>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default AddCourses;
