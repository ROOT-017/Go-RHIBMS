import { useRef } from 'react';
import { Modal, ModalProps } from 'antd';
import html2pdf from 'html2pdf.js';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button } from '../design-system/buttons';

type DownloadManagerProps = {
  fileName: string;
  children?: React.ReactNode;
} & Omit<ModalProps, 'footer' | 'closeIcon' | 'width'>;

const DownloadManager = ({
  open,
  fileName,
  onCancel,
  children,
  ...modalProps
}: DownloadManagerProps) => {
  const interestNodeRef = useRef<HTMLDivElement | null>(null);
  return (
    <Modal
      {...modalProps}
      width={740}
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={null}
    >
      <div
        className="fixed flex flex-row top-0 left-0 text-white font-bold text-[2rem] w-full"
        style={{ background: 'rgba(0, 0, 0, 0.45)' }}
      >
        <div className="flex flex-row w-full justify-between px-2 md:px-10 py-8">
          <div className="flex flex-row gap-8">
            <CloseOutlined onClick={onCancel} />
            <h1>{fileName}</h1>
          </div>
          <div className="flex flex-row gap-8">
            <Button
              type="text"
              onClick={() =>
                html2pdf()
                  .set({
                    filename: `${fileName}.pdf`,
                    html2canvas: { scale: 4 },
                    margin: 8,
                  })
                  .from(interestNodeRef.current)
                  .to('pdf')
                  .save()
              }
              className="!text-white"
              ghost
            >
              Save
              <DownloadOutlined />
            </Button>
          </div>
        </div>
      </div>
      <div ref={interestNodeRef}>{children}</div>
    </Modal>
  );
};

export default DownloadManager;
