import { FlexContainer } from '../../flex-container';
import FileInput from '../../Icons/svg/file-input';
import { CloudUploadFilled } from '../../Icons/svg';
import { Button, ButtonPrimary } from '../../design-system/buttons';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useOnChangeQueryParams } from '../../../hooks/common.hooks';
import Label from '../../Label/Label';
type Props = {
  documentKey: string;
  onSignUrl: (key: string) => Promise<string>;
  onFileChange: (key: string, value: File | null) => void;
  formIsValid: boolean;
  loading: boolean;
  onSubmit: () => void;
};

const UploadBackgroundResults = ({
  onSignUrl,
  documentKey,
  formIsValid,
  loading,
  onFileChange,
  onSubmit,
}: Props) => {
  const queryStringChange = useOnChangeQueryParams();

  return (
    <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
      <FlexContainer label="">
        <Label
          label="Upload latest background check results"
          className="text-[16px]"
        ></Label>
        <Label
          label="Drag/Drop or Select"
          className="font-bold"
          required
        ></Label>
        <FileInput
          id={'background-check-result'}
          onChange={(files) => {
            if (files && files?.length > 0) {
              onFileChange('file', files[0]);
            }
          }}
          inputText={documentKey || 'Select file or drag/drop to upload'}
          accept=".jpg,.png,.pdf"
          className="text-body text-textColor flex justify-between items-center w-full"
          showSelected
          onSignUrl={onSignUrl}
        >
          <CloudUploadFilled className="text-[24px]" />
        </FileInput>
      </FlexContainer>
      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button
          bordered
          onClick={() => {
            onFileChange('file', null);
            queryStringChange((params) => params.delete('action'));
          }}
        >
          Fill manually instead
        </Button>
        <ButtonPrimary
          onClick={onSubmit}
          disabled={!formIsValid}
          loading={loading}
        >
          Submit <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default UploadBackgroundResults;
