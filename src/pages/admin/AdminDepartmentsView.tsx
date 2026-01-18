import { useAdminManageDepartments } from '../../hooks/admin.hooks';
import { useNavigate } from 'react-router-dom';
import Filters from '../../components/Filter/Filters';
import { ButtonPrimary } from '../../components/design-system/buttons';
import { PlusOutlined } from '@ant-design/icons';
import { Table, TableProps } from 'antd';
import { Department } from '../../@types';

const AdminDepartmentsView = () => {
  const { data, loading, filters, onChangeFilters } =
    useAdminManageDepartments();
  const navigate = useNavigate();

  const columns: TableProps<Department>['columns'] = [
    {
      title: 'Department Name',
      dataIndex: 'departmentName',
      key: 'departmentName',
      fixed: 'left',
      // render: (_, record) => record.departmentName,
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
        <h2 className="text-4xl text-center">All Courses Record</h2>
        <div className="flex justify-end"></div>
      </div>
      <Filters
        filters={filters}
        onChange={onChangeFilters}
        placeholder="Search for course code or title..."
        endComponent={
          <ButtonPrimary
            onClick={() => navigate('add-department')}
            icon={<PlusOutlined />}
          >
            Add Department
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
        //   onClick: () => navigate(`${record.departmentName}/details`),
        //   title: 'View Department Details',
        // })}
        // scroll={{
        //   x: 720,
        // }}
        // rowKey={(record) =>
        //   record.id ? record.id.toString() : record.departmentName
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

export default AdminDepartmentsView;
