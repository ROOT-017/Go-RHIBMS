import { useNavigate } from 'react-router-dom';
import { useAdminManageSchools } from '../../hooks/admin.hooks';
import { Table } from 'antd';
import { ButtonPrimary } from '../../components/design-system/buttons';
import Filters from '../../components/Filter/Filters';
import { PlusOutlined } from '@ant-design/icons';

const AdminSchoolView = () => {
  const { data, filters, onChangeFilters } = useAdminManageSchools();
  const navigate = useNavigate();
  // const columns: TableProps<School>['columns'] = [
  //   {
  //     title: 'ID',
  //     dataIndex: 'id',
  //     key: 'id',
  //     render: (_, __, i) => i + 1,
  //   },
  //   {
  //     title: 'School Name',
  //     dataIndex: 'schoolName',
  //     key: 'schoolName',
  //     fixed: 'left',
  //     render: (_, record) => record.schoolName,
  //   },
  //   {
  //     title: 'Actions',
  //     key: 'actions',
  //     render: (_, record) => (
  //       <ButtonPrimary onClick={() => navigate(`${record.schoolName}/details`)}>
  //         View
  //       </ButtonPrimary>
  //     ),
  //   },
  // ];
  return (
    <div className="p-5 lg:mx-32 ">
      <div className="my-6">
        <h2 className="text-4xl text-center">All School Record</h2>
        <div className="flex justify-end"></div>
      </div>
      <Filters
        filters={filters}
        onChange={onChangeFilters}
        placeholder="Search for course code or title..."
        endComponent={
          <ButtonPrimary
            onClick={() => navigate('add-school')}
            icon={<PlusOutlined />}
          >
            Add School
          </ButtonPrimary>
        }
      />
      <Table
        dataSource={data}
        // columns={columns}
        // loading={loading}
        style={{
          overflowX: 'auto',
        }}
        // onRow={(record) => ({
        // onClick: () => navigate(`${record.schoolName}/details`),
        // title: 'View School Details',
        // })}
        // scroll={{
        //   x: 720,
        // }}
        // rowKey={(record) =>
        //   record.id ? record.id.toString() : record.schoolName
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

export default AdminSchoolView;
