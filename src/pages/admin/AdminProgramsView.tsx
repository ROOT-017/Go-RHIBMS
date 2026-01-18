import { PlusOutlined } from '@ant-design/icons';
import { ButtonPrimary } from '../../components/design-system/buttons';
import Filters from '../../components/Filter/Filters';
import { Table, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAdminManagePrograms } from '../../hooks/admin.hooks';
import { Program } from '../../@types';

const AdminProgramsView = () => {
  const { data, filters, loading, onChangeFilters } = useAdminManagePrograms();
  const navigate = useNavigate();
  const columns: TableProps<Program>['columns'] = [
    {
      title: 'Program Name',
      dataIndex: 'programName',
      key: 'programName',
      fixed: 'left',
      // render: (_, record) => record.programName,
    },
    {
      title: 'Program Type',
      dataIndex: 'programType',
      key: 'programType',
      // render: (_, record) => record.programType,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      // render: (_, record) => record.department,
    },
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
      // render: (_, record) => record.school,
    },
  ];

  return (
    <div className="p-5 lg:mx-32 ">
      <div className="my-6">
        <h2 className="text-4xl text-center">All Programs Record</h2>
        <div className="flex justify-end"></div>
      </div>
      <Filters
        filters={filters}
        onChange={onChangeFilters}
        placeholder="Search for course code or title..."
        endComponent={
          <ButtonPrimary
            onClick={() => navigate('add-program')}
            icon={<PlusOutlined />}
          >
            Add Programs
          </ButtonPrimary>
        }
      />
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        style={{
          overflowX: 'auto',
        }}
        // onRow={(record) => ({
        //   onClick: () => navigate(`${record.programName}/details`),
        //   title: 'View Program Details',
        // })}
        // scroll={{
        //   x: 720,
        // }}
        // rowKey={(record) =>
        //   record.id ? record.id.toString() : record.programName
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

export default AdminProgramsView;
