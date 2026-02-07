import { PlusOutlined } from '@ant-design/icons';
import Filters from '../../components/Filter/Filters';
import { useMemo } from 'react';
import { Student } from '../../@types';
import { ButtonPrimary } from '../../components/design-system/buttons';
import { Table, TableProps } from 'antd';
import { useAdminManageStudents } from '../../hooks/admin.hooks';
import { useNavigate } from 'react-router-dom';

// const AdminStudentView = () => {
//   const {
//     filters,
//     loading,
//     onChangeFilters,
//     data: dataSource,
//   } = useAdminManageStudents();
//   const navigate = useNavigate();
//   const columns = useMemo(() => {
//     const columns: TableProps<Student>['columns'] = [
//       {
//         title: 'Full Name',
//         dataIndex: 'fullName',
//         key: 'fullName',
//         fixed: 'left',
//         // width: 150,
//         // render(_, record) {
//         //   return record.fullName;
//         // },
//       },
//       {
//         title: 'Matriculation Number',
//         dataIndex: 'matriculationNumber',
//         key: 'matriculationNumber',
//         width: 250,

//         // render(_, record) {
//         //   return record.matriculationNumber;
//         // },
//       },
//       {
//         title: 'Department',
//         dataIndex: 'department',
//         key: 'department',
//         // render(_, record) {
//         //   return record.department;
//         // },
//       },
//       {
//         title: 'Program',
//         dataIndex: 'program',
//         key: 'program',
//         // render(_, record) {
//         //   return record.program;
//         // },
//       },
//     ];
//     return columns;
//   }, []);

//   return (
//     <div className="p-5 lg:mx-32">
//       <div className="my-6">
//         <h2 className="text-4xl text-center">All Student Record</h2>
//         <div className="flex justify-end"></div>
//       </div>
//       <Filters
//         filters={filters}
//         onChange={onChangeFilters}
//         programOption={Programs}
//         placeholder="Type name or matricle number"
//         endComponent={
//           <ButtonPrimary onClick={() => navigate('add-student')}>
//             <PlusOutlined /> Add Student
//           </ButtonPrimary>
//         }
//       />
//       <Table
//         dataSource={dataSource}
//         columns={columns}
//         loading={loading}
//         // onRow={(record) => ({
//           // onClick: () => navigate(`${record.matriculationNumber}/details`),
//         //   title: 'View Student Details',
//         //   style: { cursor: 'pointer' },
//         // })}
//         // rowKey={(record) =>
//         //   record.id ? record.id.toString() : record.matriculationNumber
//         // }
//       />
//     </div>
//   );
// };

const AdminStudentView = () => {
  const {
    filters,
    loading,
    onChangeFilters,
    data: dataSource,
    options,
  } = useAdminManageStudents();
  const navigate = useNavigate();

  const columns = useMemo(() => {
    const columns: TableProps<Student>['columns'] = [
      {
        title: 'Full Name',
        dataIndex: 'fullName', // Matches the mapping in service
        key: 'fullName',
        fixed: 'left',
        // sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      },
      {
        title: 'Matricule',
        dataIndex: 'matriculationNumber', // Matches the mapping in service
        key: 'matriculationNumber',
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
      // {
      //   title: 'Status',
      //   dataIndex: 'feeStatus',
      //   key: 'feeStatus',
      //   render: (status) => (
      //     <span className={`capitalize ${status === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
      //       {status}
      //     </span>
      //   )
      // }
    ];
    return columns;
  }, []);

  return (
    <div className="p-5 lg:mx-32">
      <div className="my-6">
        <h2 className="text-4xl text-center font-bold">Student Records</h2>
      </div>
      <Filters
        filters={filters}
        onChange={onChangeFilters}
        departmentOption={options.departments}
        programOption={options.programs}
        allowClear={true}
        placeholder="Search by name or matricule..."
        endComponent={
          <ButtonPrimary onClick={() => navigate('add-student')}>
            <PlusOutlined /> Add Student
          </ButtonPrimary>
        }
      />
      
      {/* <Filters
        filters={filters}
        onChange={onChangeFilters}
        // Assuming Programs comes from your constants
        programOption={Programs} 
        placeholder="Search by name or matricle..."
        endComponent={
          <ButtonPrimary onClick={() => navigate('add-student')}>
            <PlusOutlined /> Add Student
          </ButtonPrimary>
        }
      /> */}

      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="shadow-sm border rounded-lg overflow-hidden"
        onRow={(record) => ({
          onClick: () => navigate(`${record.id}/details`),
          className: 'cursor-pointer hover:bg-blue-50 transition-colors'
        })}
      />
    </div>
  );
};

export default AdminStudentView;
