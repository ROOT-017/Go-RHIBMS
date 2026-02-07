import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LabeledInputMolecule from '../../components/LabeledInput/LabeledInput.molecule';
import LabelSelectMolecule from '../../components/Input/LabelSelectMolecule';
import { ButtonPrimary } from '../../components/design-system/buttons';
import { useAddCourse, useAdminManageCourses } from '../../hooks/admin.hooks';
import { levelOptions, semesterOptions } from '../../constants';

const AddCourse = () => {
  const navigate = useNavigate();
  const { options } = useAdminManageCourses(); // Reuse the options fetcher
  const { formData, onChange, isCreating, handleSubmit } = useAddCourse();

  return (
    <div className="p-5 lg:mx-72 my-12 w-full">
      <div className="flex items-center mb-8">
        <ArrowLeftOutlined
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-4xl flex-1 text-center">Add New Course</h2>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledInputMolecule
            label="Course Code"
            inputProps={{
              placeholder: 'e.g. SWE311',
              value: formData.code,
              onChange: (e) => onChange('code', e.target.value),
            }}
          />
          <LabeledInputMolecule
            label="Course Title"
            inputProps={{
              placeholder: 'e.g. Software Architecture',
              value: formData.title,
              onChange: (e) => onChange('title', e.target.value),
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LabelSelectMolecule
            label="Department"
            name="department"
            options={options.departments}
            value={formData.department_id}
            onChange={(e) => onChange('department_id', e.target.value)}
          />
          <LabelSelectMolecule
            label="Program"
            name="program"
            options={options.programs}
            value={formData.program_id}
            onChange={(e) => onChange('program_id', e.target.value)}
          />
          <LabelSelectMolecule
            label="Level"
            name="program_level"
            options={levelOptions}
            value={formData.program_level}
            onChange={(e) => onChange('program_level', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledInputMolecule
            label="Credits"
            inputProps={{
              type: 'number',
              value: formData.credits,
              onChange: (e) => onChange('credits', e.target.value),
            }}
          />
          <LabelSelectMolecule
            label="Semester"
            name="semester"
            options={semesterOptions}
            // value={formData.semester.toString()}
            onChange={(e) => onChange('semester', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledInputMolecule
            label="Description"
            inputProps={{
              // type: 'number',
              value: formData.description,
              onChange: (e) => onChange('description', e.target.value),
            }}
          />
          {/* <LabelSelectMolecule
            label="Semester"
            name="semester"
            options={semesterOptions}
            // value={formData.semester.toString()}
            onChange={(e) => onChange('semester', e.target.value)}
          /> */}
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <button
            className="px-8 py-2 border rounded-md"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <ButtonPrimary
            loading={isCreating}
            onClick={() => handleSubmit(() => navigate('/admin/courses'))}
          >
            Save Course
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
// import Center from '../../components/Layout/Center/Center';
// import { ButtonPrimary } from '../../components/design-system/buttons';
// import { useAddCourse } from '../../hooks/admin.hooks';
// import { ArrowLeftOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const AddCourses = () => {
//   const { loading, handleAddSubmit } = useAddCourse();
//   const navigate = useNavigate();

//   return (
//     <div className="p-5 my-12 w-full flex flex-col items-center">
//       <div className="flex items-center lg:w-[60%]">
//         <div
//           className="flex cursor-pointer items-center"
//           onClick={() => navigate('/admin/dashboard/add-course')}
//         >
//           <ArrowLeftOutlined className="" />
//           <p className="text-primaryColor pl-4"> Back To All A Courses</p>{' '}
//         </div>
//         <h2 className="text-4xl flex-1 text-center">Add Course</h2>
//       </div>
//       <div className="w-full lg:w-[60%]">
//         <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
//           {/* <FlexContainer labelRequired={false} label={''}>
//             <LabeledInputMolecule
//               inputProps={{
//                 required: true,
//                 placeholder: 'Course title',
//                 value: data.courseTitle,
//                 onChange: (e) => onChange('courseTitle', e.target.value),
//               }}
//               required
//               label="Course Title"
//             />
//           </FlexContainer> */}
//           {/* <FlexContainer labelRequired={false} label={''}>
//             <LabeledInputMolecule
//               inputProps={{
//                 required: true,
//                 // type: 'number',
//                 value: data.courseCode,
//                 placeholder: 'Course code',
//                 onChange: (e) => onChange('courseCode', e.target.value),
//               }}
//               required
//               label="Course Code"
//             />
//           </FlexContainer> */}
//         </div>
//         <div>
//           {/* <LabelSelectMolecule
//             label="Select School"
//             name="selectSchool"
//             required
//             placeholder={'Select school'}
//             showSearch={false}
//             options={[]}
//             allowClear={false}
//             onChange={(e) => onChange('school', e.target.value)}
//             filterSort={(optionA, optionB) =>
//               String(optionA?.label ?? '')
//                 .toLowerCase?.()
//                 .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
//             }
//           />
//           <LabelSelectMolecule
//             label="Select Department"
//             name="selectDepartment"
//             required
//             placeholder={'Select department'}
//             showSearch={false}
//             options={[]}
//             onChange={(e) => onChange('department', e.target.value)}
//             filterSort={(optionA, optionB) =>
//               String(optionA?.label ?? '')
//                 .toLowerCase?.()
//                 .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
//             }
//           /> */}
//         </div>
//         <div>
//           {/* <LabelSelectMolecule
//             label="Select Semester"
//             name="semester"
//             required
//             placeholder={'Select semester'}
//             showSearch={false}
//             options={Semester}
//             onChange={(e) => onChange('semester', e.target.value)}
//             filterSort={(optionA, optionB) =>
//               String(optionA?.label ?? '')
//                 .toLowerCase?.()
//                 .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
//             }
//           /> */}
//           {/* <LabelSelectMolecule
//             label="Select Level"
//             name="level"
//             required
//             placeholder={'Select level'}
//             showSearch={false}
//             options={academicLevel}
//             onChange={(e) => onChange('level', e.target.value)}
//             filterSort={(optionA, optionB) =>
//               String(optionA?.label ?? '')
//                 .toLowerCase?.()
//                 .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
//             }
//           /> */}
//           {/* <LabeledDateInputMolecule
//             label="Select Year"
//             name="year"
//             required
//             picker="year"
//             // placeholder={'Select year'}
//             // showSearch={false}
//             // options={[]}
//             value={data.year}
//             onDateChange={(_, e) => {
//               onChange('year', e);
//             }}
//             // filterSort={(optionA, optionB) =>
//             //   String(optionA?.label ?? '')
//             //     .toLowerCase?.()
//             //     .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
//             // }
//           /> */}
//           <Center>
//             <ButtonPrimary
//               className="p-4 flex w-full mt-4 justify-center items-center"
//               onClick={handleAddSubmit}
//               loading={loading}
//             >
//               Add Course
//             </ButtonPrimary>
//           </Center>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourses;
