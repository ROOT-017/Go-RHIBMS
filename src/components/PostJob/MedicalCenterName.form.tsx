import { Select } from 'antd';
import { MedicalCenter } from '../../@types';

export type NameFormType = {
  medicalCenters?: Record<string, MedicalCenter>;
  active?: MedicalCenter,
  onChange?: (val: string) => void;
  value?: string,
};

export default function MedicalCenterNameForm({
  medicalCenters,
  active,
  onChange,
  value,
}: NameFormType) {
  return (
    <div className="flex w-full gap-10 p-2 md:p-8 flex-col mt-[-10px] pb-10">
      <h2 className="text-smallSubHeading font-[600] flex text-textColor">
        Medical Center Name <span className="text-errorColor">*</span>
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-[-10px]">
        <div className="flex flex-col gap-2 flex-1">
          <label className="require-field text-[1.6rem] text-textColor font-[600]">
            Name
          </label>
          <Select
            options={medicalCenters ? Object.values(medicalCenters).map(m => ({ label: m.centerName, value: String(m.id) })) : []}
            className="h-[38px]"
            placeholder="Mk Laboratory"
            onChange={onChange}
            defaultValue={active?.id ? String(active?.id) : undefined}
            value={value}
          />
          {/* <Input
            className="h-[38px] med-input"
            name="medicalCenterName"
            defaultValue={medicalCenterName}
            type="text"
            disabled
            placeholder="Mk Laboratory"
          /> */}
        </div>
      </div>
    </div>
  );
}
