import LabeledInputMolecule from '../../components/LabeledInput/LabeledInput.molecule';
import { FlexContainer } from '../../components/flex-container';
import { useAdminManageSchools } from '../../hooks/admin.hooks';
import { ButtonPrimary } from '../../components/design-system/buttons';
import Center from '../../components/Layout/Center/Center';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AddSchool = () => {
  const { data, onChange, loading, handleAddSubmit } = useAdminManageSchools();
  const navigate = useNavigate();
  return (
    <div className="p-5 lg:mx-72 my-12 w-full flex flex-col items-center">
      <div className="flex items-center lg:w-[60%]">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate('/admin/dashboard/schools')}
        >
          <ArrowLeftOutlined className="" />
          <p className="text-primaryColor pl-4"> Back To All Schools</p>{' '}
        </div>
        <h2 className="text-4xl flex-1 text-center">Add School</h2>
      </div>{' '}
      <div className="w-full lg:w-[60%]">
        <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
          <FlexContainer labelRequired={false} label={''}>
            <LabeledInputMolecule
              inputProps={{
                required: true,
                value: data.name,
                placeholder: 'School Name',
                onChange: (e) => onChange('name', e.target.value),
              }}
              required
              label="Name"
            />
          </FlexContainer>
        </div>
        <div>
          <LabeledInputMolecule
            inputProps={{
              required: true,
              value: data.name,
              placeholder: 'Description',
              onChange: (e) => onChange('name', e.target.value),
            }}
            required
            label="Description"
          />
        </div>
        <Center>
          <ButtonPrimary
            className="mt-4 w-full flex text-center justify-center items-center"
            onClick={handleAddSubmit}
            loading={loading}
          >
            Add School
          </ButtonPrimary>
        </Center>
      </div>
    </div>
  );
};

export default AddSchool;
