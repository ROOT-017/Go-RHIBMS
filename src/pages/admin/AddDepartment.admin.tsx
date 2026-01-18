import LabeledInputMolecule from '../../components/LabeledInput/LabeledInput.molecule';
// import { FlexContainer } from '../../components/flex-container';
import LabelSelectMolecule from '../../components/Input/LabelSelectMolecule';
// import { Gender, Programs } from '../../constants';
// import LabeledDateInputMolecule from '../../components/LabeledDateInput/LabeledDateInput.molecule';
import {
  useAdminManageDepartments,
} from '../../hooks/admin.hooks';
import { ButtonPrimary } from '../../components/design-system/buttons';
import Center from '../../components/Layout/Center/Center';
// import { CloudUploadFilled } from '../../components/Icons/svg';
// import FileInput from '../../components/Icons/svg/file-input';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const navigate = useNavigate();
  const {  loading, } =
    useAdminManageDepartments();
  return (
    <div className="p-5 lg:mx-72 my-12 w-full flex flex-col items-center">
      <div className="flex items-center lg:w-[60%] mb-4">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate('/admin/dashboard/departments')}
        >
          <ArrowLeftOutlined className="" />
          <p className="text-primaryColor pl-4">
            Back To All Departments
          </p>
        </div>
        <h2 className="text-4xl flex-1 text-center">Add Department</h2>
      </div>{' '}
      <div className="w-full lg:w-[60%]">
        <div>
          <LabeledInputMolecule
            inputProps={{
              required: true,
              placeholder: 'Department Name',
              // value: data.name,
              // onChange: (e) => onChange('name', e.target.value),
            }}
            required
            label="Department Name"
          />
          <LabelSelectMolecule
            label="Select School"
            name="school"
            required
            placeholder={'Select school'}
            showSearch={false}
            // options={academicLevel}
            // onChange={(e) => onChange('level', e.target.value)}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
          <Center>
            <ButtonPrimary
              className="mt-4 w-full flex justify-center items-center"
              // onClick={handleAddSubmit}
              loading={loading}
            >
              Add Department
            </ButtonPrimary>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
