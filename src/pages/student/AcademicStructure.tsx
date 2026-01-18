import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

const AcademicStructure = () => {
  // const onChange = (key: string | string[]) => {
  //   console.log(key);
  // };

  const data = [
    {
      school: 'School of Biomedical Sciences',
      departments: [
        {
          department: 'Nursing',
          programs: ['Program 1', 'Program 2'],
        },
        {
          department: 'MLS',
          programs: ['Program 1', 'Program 2'],
        },
      ],
    },
    {
      school: 'School of Engineering and Technology',
      departments: [
        {
          department: 'Computer Science and Network',
          programs: ['Program 1', 'Program 2'],
        },
      ],
    },
    {
      school: 'School of Management and Economics',
      departments: [
        {
          department: 'Business Administration',
          programs: ['Program 1', 'Program 2'],
        },
      ],
    },
  ];

  return (
    <div className="p-5 lg:mx-32 my-5">
      <p className="text-4xl text-center mb-8">
        School Departments and Programs
      </p>

      <div className="my-4 flex flex-col gap-8">
        {data.map((item, index) => (
          <Collapse
            key={index}
            activeKey={[0]}
            bordered={false}
            expandIcon={() => <></>}
            items={[
              {
                label: (
                  <CollapsePanel
                    key={index}
                    header={
                      <p className="text-primaryColor text-3xl">
                        {item.school}
                      </p>
                    }
                  />
                ),
                children: (
                  <Collapse
                    key={index}
                    bordered={false}
                    expandIcon={(e) =>
                      e.isActive ? <MinusOutlined /> : <PlusOutlined />
                    }
                    items={item.departments.map(
                      (department, departmentIndex) => ({
                        label: department.department,
                        key: departmentIndex,
                        children: (
                          <Collapse
                            key={index}
                            bordered={false}
                            expandIcon={(e) =>
                              e.isActive ? <MinusOutlined /> : <PlusOutlined />
                            }
                            items={department.programs.map(
                              (programs, programIndex) => ({
                                label: programs,
                                children: <></>,
                                key: programIndex,
                              }),
                            )}
                          />
                        ),
                      }),
                    )}
                    style={{}}
                  />
                ),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default AcademicStructure;
