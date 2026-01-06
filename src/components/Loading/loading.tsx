import { Alert, AlertProps, Spin, SpinProps } from "antd";
import { createPortal } from "react-dom";
export type LoadingProp = {
    text?: string;
    size?: SpinProps["size"]
    alert?: {
        title: string;
        description: string;
        type: AlertProps["type"]
    }
}
export const Loading = ({ text, alert, size = "large" }: LoadingProp) => createPortal(
    <div className="loading-container fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-slate-50/70 z-[9999]">
        <Spin size={size}>
            { text && <h3 style={{ fontSize: 24, color: '#074783', position: 'fixed', left: 0, right: 0, textAlign: 'center', bottom: '35%' }}> { text } </h3>}
            { (alert?.title || alert?.description) && <Alert message={alert.title} description={alert.description} type={alert.type} />}
        </Spin>
    </div>,
    document.body
)