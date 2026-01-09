import React from 'react';
import LabelSelectMolecule from '../../components/Input/LabelSelectMolecule';

const FormB = () => {
  return (
    <div className="p-5 lg:mx-32 my-5">
      {/* <LabelSelectMolecule
        label="Select Academic year"
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
      /> */}
    </div>
  );
};

export default FormB;
