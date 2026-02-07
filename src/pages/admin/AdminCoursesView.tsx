import { useMemo } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filters from '../../components/Filter/Filters';
import { ButtonPrimary } from '../../components/design-system/buttons';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAdminManageCourses } from '../../hooks/admin.hooks';
import { Course } from '../../@types';

const AdminCoursesView = () => {
  const { data, filters, loading, onChangeFilters, options } =
    useAdminManageCourses();
  const navigate = useNavigate();

  const columns: ColumnsType<Course> = useMemo(
    () => [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: (text) => <b className="text-primaryColor">{text}</b>,
      },
      {
        title: 'Course Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Credits',
        dataIndex: 'credit',
        key: 'credit',
        align: 'center',
      },
      {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        render: (level) => <Tag color="blue">{level}</Tag>,
      },
      {
        title: 'Program',
        dataIndex: 'program',
        key: 'program',
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
      },
    ],
    [],
  );

  return (
    <div className="p-5 lg:mx-32">
      <div className="my-6">
        <h2 className="text-4xl text-center font-bold">Academic Courses</h2>
      </div>

      <Filters
        filters={filters}
        onChange={onChangeFilters}
        departmentOption={options.departments}
        programOption={options.programs}
        allowClear
        placeholder="Search code or title..."
        endComponent={
          <ButtonPrimary
            onClick={() => navigate('add-courses')}
            icon={<PlusOutlined />}
          >
            Add Course
          </ButtonPrimary>
        }
      />

      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="id"
        className="shadow-md rounded-lg overflow-hidden"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

// import Filters from '../../components/Filter/Filters';
// import { useAdminManageCourses } from '../../hooks/admin.hooks';
// import { useNavigate } from 'react-router-dom';
// import { ButtonPrimary } from '../../components/design-system/buttons';
// import { PlusOutlined } from '@ant-design/icons';
// import { Table } from 'antd';

// const AdminCoursesView = () => {
//   const { data, filters, loading, onChangeFilters } = useAdminManageCourses();
//   const navigate = useNavigate();
//   return (
//     <div className="p-5 lg:mx-32">
//       <div className="my-6">
//         <h2 className="text-4xl text-center">All Courses Record</h2>
//         <div className="flex justify-end"></div>
//       </div>
//       <Filters
//         filters={filters}
//         onChange={onChangeFilters}
//         placeholder="Search for course code or title..."
//         endComponent={
//           <ButtonPrimary
//             onClick={() => navigate('add-courses')}
//             icon={<PlusOutlined />}
//           >
//             Add Course
//           </ButtonPrimary>
//         }
//       />
//       <Table
//         dataSource={data}
//         // columns={columns}
//         loading={loading}
//         style={{
//           // width: 'fit-content',
//           // minWidth: '100%',
//           overflowX: 'auto',
//         }}
//         // onRow={(record) => ({
//         //   onClick: () => navigate(`${record.matriculationNumber}`),
//         // })}
//         // scroll={{
//         //   x: 720,
//         // }}
//         // rowKey={(record) =>
//         //   record.id ? record.id.toString() : record.courseCode
//         // }
//         //  pagination={{
//         //         current: workers.number + 1,
//         //         total: workers.totalElements,
//         //         pageSize: workers.size,
//         //         showSizeChanger: true,
//         //         showTotal: (total) => `Total ${total} items`,
//         //       }}
//         // className="custom-gray-header"
//       />
//     </div>
//   );
// };

export default AdminCoursesView;
