import {
  ButtonHTMLAttributes,
  CSSProperties,
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ImageExtensions } from '../../../constants';
import './file-input.scss';

type FileInputProps = {
  id: string;
  label?: string;
  onChange?: (files: FileList | null) => void;
  multiple?: boolean;
  accept?: string;
  lableDescription?: string;
  inputText?: string;
  children?: React.ReactNode;
  loading?: boolean;
  containerClassName?: string;
  required?: boolean;
  labelClassName?: string;
  showSelected?: boolean;
  inputTextStyle?: CSSProperties;
  onSignUrl?: (key: string) => Promise<string>;
  safeRerenders?: boolean;
  value?: File | null | boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'type' | 'onDragOver' | 'onDrop' | 'value'
>;

const FileInput = ({
  id,
  label,
  lableDescription,
  inputText,
  children,
  onChange,
  multiple = false,
  accept = '',
  containerClassName,
  required,
  labelClassName,
  showSelected = false,
  inputTextStyle,
  onSignUrl,
  safeRerenders,
  value,
  loading,
  ...props
}: FileInputProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewImg, setPreviewImg] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(false);
  const [signedUrl, setSignedUrl] = useState('');
  // const imageRef = useRef<HTMLInputElement>();
  const effectRef = useRef(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      handlFileLoad(files[0]);
      onChange?.(files);
      setSelectedFiles(files);
    }
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files?.length > 0) {
      handlFileLoad(files[0]);
      onChange?.(files);
      setSelectedFiles(files);
    }
  };

  const handlFileLoad = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        if (file.type.includes('image')) {
          setPreviewImg(true);
          setPreviewDoc(false);
          setSignedUrl(e.target.result as string);
        } else if (file.type.includes('pdf')) {
          setPreviewDoc(true);
          setPreviewImg(false);
          setSignedUrl(e.target.result as string);
        } else {
          setPreviewImg(false);
          setPreviewDoc(false);
          setSignedUrl('');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSigning = useCallback(() => {
    if (selectedFiles == null || selectedFiles.length == 0) {
      if (inputText) {
        const isImg = ImageExtensions.some((imgExt) =>
          inputText?.toLowerCase().includes(imgExt),
        );
        const isPdf = inputText?.toLowerCase().includes('.pdf');
        if (isImg) {
          setPreviewImg(() => true);
        } else if (isPdf) {
          setPreviewDoc(() => true);
        }
        if (
          (isImg || isPdf) &&
          onSignUrl &&
          (!effectRef.current || safeRerenders)
        ) {
          onSignUrl(inputText).then((signedUrl) => {
            setSignedUrl(() => signedUrl);
          });
          effectRef.current = true;
        } else if (safeRerenders) {
          setSignedUrl(() => '');
        }
      }
    }
  }, [inputText, onSignUrl, safeRerenders, selectedFiles]);

  useEffect(() => {
    handleUrlSigning();
  }, [handleUrlSigning]);

  useEffect(() => {
    if (value && typeof value != 'boolean') {
      handlFileLoad(value);
      const isImg = ImageExtensions.some((imgExt) =>
        value?.type?.toLowerCase().includes(imgExt),
      );
      const isPdf = value?.type?.toLowerCase().includes('.pdf');
      if (isImg) {
        setPreviewImg(() => true);
      } else if (isPdf) {
        setPreviewDoc(() => true);
      }
    } else if (typeof value == 'boolean' && !value) {
      setSelectedFiles(null);
      onSignUrl?.('').then((signedUrl) => {
        setPreviewImg(() => false);
        setPreviewDoc(() => false);
        const isImg = ImageExtensions.some((imgExt) =>
          signedUrl?.toLowerCase().includes(imgExt),
        );
        const isPdf = signedUrl?.toLowerCase().includes('.pdf');
        if (isImg) {
          setPreviewImg(() => true);
        } else if (isPdf) {
          setPreviewDoc(() => true);
        }
        setSignedUrl(() => signedUrl);
      });
    } else {
      setPreviewImg(false);
      setPreviewDoc(false);
      setSignedUrl('');
      setSelectedFiles(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (loading) {
      setSignedUrl('');
      setSelectedFiles(null);
    }
  }, [loading]);

  const btnText = `Click to Change ${selectedFiles?.[0]?.name || (value as unknown as File)?.name || inputText || 'file'}`;

  return (
    <>
      <div
        className={containerClassName ?? 'flex flex-col items-center'}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label
          className={
            labelClassName ??
            'text-textColor font-[700] lg:ml-[30px] text-[1.2rem] sm:text-[1.8rem] md:text-[2.0rem]'
          }
          htmlFor={id}
        >
          {label}
          <span className="text-textColor text-[1.2rem] md:text-[2.0rem] font-[400]">
            {lableDescription}
          </span>
          {required ? (
            <span
              style={{
                color: 'red',
              }}
            >
              *
            </span>
          ) : (
            ''
          )}
        </label>
        <input
          type="file"
          id={id}
          onChange={handleChange}
          multiple={multiple}
          accept={accept}
          style={{ display: 'none' }} // Hide the default file input
        />
        <div
          className={`${props.className ?? ''} flex w-full ${(previewImg || previewDoc) && signedUrl ? ' h-auto ' : ' px-[16px]'} ${previewDoc ? ' rounded-none ' : ' rounded-[10px] '} min-h-[40px] items-center justify-between border-[1px] border-solid border-borderColor modal-trigger-container`}
          onClick={() => {
            if (
              onChange &&
              !props.disabled &&
              !((previewImg || previewDoc) && signedUrl)
            ) {
              document.getElementById(id)?.click();
            }
          }}
          style={props.style}
        >
          {signedUrl ? (
            <>
              {previewDoc ? (
                <iframe
                  src={signedUrl}
                  className="max-h-[300px] w-full object-contain m-auto"
                />
              ) : (
                <img
                  src={signedUrl}
                  alt={inputText}
                  className="max-h-[300px] max-w-[300px] h-full w-full object-contain m-auto"
                />
              )}
              {props.disabled ? null : (
                <>
                  <div
                    className="modal-trigger-scroll-holder left-0"
                    onClick={(e) => e?.stopPropagation()}
                  />
                  <div className="modal-trigger-btn-wrapper">
                    <button
                      onClick={(e) => {
                        if (onChange) {
                          document.getElementById(id)?.click();
                        }
                        e?.stopPropagation();
                      }}
                      disabled={props.disabled}
                      className={`modal-trigger-btn ${previewImg ? 'w-full right-0' : ''}`}
                      title={btnText}
                    >
                      {btnText}
                    </button>
                  </div>
                  <div
                    className="modal-trigger-scroll-holder right-0"
                    onClick={(e) => e?.stopPropagation()}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <span
                className="block text-body text-textColor font-[400]"
                style={{
                  maxWidth: '80%',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  ...(inputTextStyle ?? {}),
                }}
              >
                {showSelected && selectedFiles
                  ? Array.from(selectedFiles)
                      .map((file) => file.name)
                      .join(', ')
                  : inputText}
              </span>
              <span className="ml-0 md:ml-[8px] text-textColor">
                {children}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileInput;
