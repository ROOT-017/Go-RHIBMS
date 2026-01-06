import { useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './SignaturePad.scss';
import { Button, Flex } from 'antd';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  onClear: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = sigCanvas.current?.getCanvas();

    if (!container || !canvas) return;

    const resizeCanvas = () => {
      const { clientWidth, clientHeight } = container;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      sigCanvas.current?.clear();
    };

    // Initial resize
    resizeCanvas();

    // Setup ResizeObserver
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);
  const handleClear = () => {
    sigCanvas.current?.clear();
    onClear();
  };

  const handleSave = () => {
    const signature = sigCanvas.current?.toDataURL();
    if (signature) {
      onSave(signature);
    }
  };

  return (
    <div className="h-[32rem]">
      <div
        ref={containerRef}
        className="h-[85%] border rounded-2xl overflow-hidden  signature-container"
      >
        <SignatureCanvas
          penColor="black"
          ref={sigCanvas}
          canvasProps={{ className: 'signatureCanvas' }}
        />
      </div>
      <Flex className="justify-end h-[15%] items-center gap-3">
        <Button onClick={handleClear}>Clear</Button>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </div>
  );
};

export default SignaturePad;
