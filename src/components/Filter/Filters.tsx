import { Flex } from 'antd';
import { ButtonPrimary } from '../design-system/buttons';
import { FiltersType } from '../../@types';
import { SearchOutlined } from '@ant-design/icons';
import LabelSelectMolecule from '../Input/LabelSelectMolecule';
import LabeledInputMolecule from '../LabeledInput/LabeledInput.molecule';
import { FlexContainer } from '../flex-container';
import { ReactNode } from 'react';

export type FilterProps = {
  filters: Partial<Omit<FiltersType, 'mode'>>;
  programOption?: {
    label: string;
    value: string | number;
    [key: string]: string | number | boolean;
  }[];
  departmentOption?: {
    label: string;
    value: string | number;
    [key: string]: string | number | boolean;
  }[];
  placeholder?: string;
  onChange: (
    key: keyof FiltersType | 'endDate' | 'startDate',
    value: string,
  ) => void;
  modeEnd?: boolean;
  statusEnd?: boolean;
  statusStart?: boolean;
  reset?: boolean;
  manualSearch?: boolean;
  handleReset?: () => void;
  closeRange?: boolean;
  allowClear?: boolean;
  departmentPlaceholder?: string;
  allowClearDatePicker?: boolean;
  endComponent?: ReactNode;
};

const Filters = ({
  onChange,
  filters,
  programOption,
  placeholder,
  statusStart,
  allowClear,
  handleReset,
  departmentPlaceholder,
  endComponent,
  manualSearch,
  departmentOption,
}: FilterProps) => {
  const keyExist = (key: keyof typeof filters) =>
    Object.keys(filters).includes(key);

  return (
    <Flex className="justify-between flex-col lg:flex-row font-[400] gap-4 my-8">
      <Flex className="gap-4 flex flex-col lg:flex-row">
        {keyExist('department') && !statusStart && (
          <LabelSelectMolecule
            label="Department"
            name="department"
            placeholder={departmentPlaceholder ?? 'Department'}
            allowClear={allowClear}
            showSearch={false}
            options={departmentOption}
            onChange={(e) => onChange('department', e.target.value)}
            defaultValue={filters.department ? filters.department : undefined}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
        )}
        {keyExist('program') && !statusStart && (
          <LabelSelectMolecule
            label="Program"
            name="program"
            placeholder={departmentPlaceholder ?? 'Program'}
            allowClear={allowClear}
            showSearch={false}
            options={programOption}
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
          />
        )}
        {
          <LabeledInputMolecule
            inputProps={{
              placeholder: placeholder ?? 'Type to search...',
              value: filters.searchTerm ?? undefined,
              onChange: (e) => onChange('searchTerm', e.target.value),
            }}
            label="Search"
          />
        }
        {manualSearch && (
          <FlexContainer required={false} label={''}>
            <ButtonPrimary onClick={handleReset}>
              <SearchOutlined /> Search
            </ButtonPrimary>
          </FlexContainer>
        )}
      </Flex>
      <Flex className="gap-4  flex-col lg:flex-row ">
        {endComponent ? endComponent : <></>}
      </Flex>
    </Flex>
  );
};

export default Filters;
