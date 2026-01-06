import { Button as AntButton, ButtonProps } from 'antd';
import classes from './button-base.module.scss';
import { LegacyRef, forwardRef } from 'react';
export type ButtonBaseProps = ButtonProps & { bordered?: boolean, transparent?: boolean, centered?: boolean };
export const Button = forwardRef(({
  children,
  className,
  bordered,
  transparent,
  centered,
  ...props
}: ButtonBaseProps, ref: LegacyRef<HTMLButtonElement | HTMLAnchorElement>) => (
  <AntButton
    className={`${
      className ?? 'w-full md:w-auto'
    } ${classes.btn} ${
      bordered ? classes.btnBordered : ''
    } ${
      transparent ? classes.btnTransparent : ''
    } ${
      centered ? classes.btnCentered : ''
    } ${
      props.danger ? classes.btnDanger : ''
    }`}
    {...props}
    ref={ref}
  >
    {children}
  </AntButton>
));
