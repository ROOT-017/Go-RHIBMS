import { Col, Image, Input, Row } from 'antd';

type Props = {
  value?: string;
  onChange: () => void;
};

const SignaturePreview = ({ value, onChange }: Props) => {
  return (
    <div>
      {value ? (
        <Row justify="center" className="w-full min-h-[40px] border-[1px] rounded-2xl">
          <Col xs={24} sm={12} md={8} lg={100}>
            <Image
              src={value}
              onClick={onChange}
              preview={false}
              style={{ width: '100%', height: 'auto' }}
              className="cursor-pointer"
            />
          </Col>
        </Row>
      ) : (
        <Input
          required
          className="h-[40px] text-left mb-[5px] cursor-pointer"
          value={'Click to sign'}
          onClick={onChange}
          onChange={() => {
            return;
          }}
          placeholder="click here to sign"
        />
      )}
    </div>
  );
};

export default SignaturePreview;
