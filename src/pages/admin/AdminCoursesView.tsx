import Filters from '../../components/Filter/Filters';
import { useAdminManageCourses } from '../../hooks/admin.hooks';
import { useNavigate } from 'react-router-dom';
import { ButtonPrimary } from '../../components/design-system/buttons';
import { PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';
// import { FlexContainer } from '../../components/flex-container';
// import { Table, TableProps } from 'antd';
// import { Course } from '../../@types';

const AdminCoursesView = () => {
  const { data, filters, loading, onChangeFilters } = useAdminManageCourses();
  const navigate = useNavigate();
  // const columns: TableProps<Course>['columns'] = [
  //   // {
  //   //   title: 'Id',
  //   //   dataIndex: 'id',
  //   //   key: 'id',
  //   //   fixed: 'left',
  //   //   width: '70px',
  //   //   render(_, _r, i) {
  //   //     return i + 1;
  //   //   },
  //   // },
  //   {
  //     title: 'Course Code',
  //     dataIndex: 'courseCode',
  //     key: 'courseCode',
  //     fixed: 'left',
  //     render: (_, record) => record.courseCode,
  //   },
  //   {
  //     title: 'Course Title',
  //     dataIndex: 'courseTitle',
  //     key: 'courseTitle',
  //     // width: '200px',
  //     render: (_, record) => record.courseTitle,
  //   },

  //   {
  //     title: 'Department',
  //     dataIndex: 'department',
  //     key: 'department',
  //     render: (_, record) => record.department,
  //   },
  //   {
  //     title: 'Level',
  //     dataIndex: 'level',
  //     key: 'level',
  //     render: (_, record) => record.level,
  //   },
  //   {
  //     title: 'Semester',
  //     dataIndex: 'semester',
  //     key: 'semester',
  //     render: (_, record) => record.semester,
  //   },
  //   {
  //     title: 'Credit Units',
  //     dataIndex: 'creditUnits',
  //     key: 'creditUnits',
  //     render: (_, record) => record.creditUnits,
  //   },
  //   {
  //     title: 'Year',
  //     dataIndex: 'year',
  //     key: 'year',
  //     render: (_, record) => record.year,
  //   },
  //   {
  //     title: 'School',
  //     dataIndex: 'school',
  //     key: 'school',
  //     render: (_, record) => record.school,
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (_, record) => (
  //       <FlexContainer required={false} label={''}>
  //         <ButtonPrimary
  //           className="p-4 flex justify-center items-center"
  //           onClick={() => navigate(`${record.courseCode}/details`)}
  //         >
  //           View
  //         </ButtonPrimary>
  //       </FlexContainer>
  //     ),
  //   },
  // ];

  // const handleAddCourse = () => {
  //   navigate('add-course');
  // };
  return (
    <div className="p-5 lg:mx-32">
      <div className="my-6">
        <h2 className="text-4xl text-center">All Courses Record</h2>
        <div className="flex justify-end"></div>
      </div>
      <Filters
        filters={filters}
        onChange={onChangeFilters}
        placeholder="Search for course code or title..."
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
        // columns={columns}
        loading={loading}
        style={{
          // width: 'fit-content',
          // minWidth: '100%',
          overflowX: 'auto',
        }}
        // onRow={(record) => ({
        //   onClick: () => navigate(`${record.matriculationNumber}`),
        // })}
        // scroll={{
        //   x: 720,
        // }}
        // rowKey={(record) =>
        //   record.id ? record.id.toString() : record.courseCode
        // }
        //  pagination={{
        //         current: workers.number + 1,
        //         total: workers.totalElements,
        //         pageSize: workers.size,
        //         showSizeChanger: true,
        //         showTotal: (total) => `Total ${total} items`,
        //       }}
        // className="custom-gray-header"
      />
    </div>
  );
};

export default AdminCoursesView;
