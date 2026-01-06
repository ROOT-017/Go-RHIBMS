import { Input, InputProps } from "antd";
import { ValidationPattern } from "../../constants";

export const EmailInput = (props: Omit<InputProps, 'type' | 'pattern'>) => {
    return (
        <Input
            {...props}
            pattern={ValidationPattern.email}
            type="email"
        />
    );
}