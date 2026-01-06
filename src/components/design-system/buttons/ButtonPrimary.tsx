import { LegacyRef, forwardRef } from 'react';
import { Button, ButtonBaseProps } from './Button';

export const ButtonPrimary = forwardRef(({
  children,
  ...props
}: Omit<ButtonBaseProps, 'type'> & { bordered?: boolean }, ref: LegacyRef<HTMLButtonElement | HTMLAnchorElement>) => (
  <Button type="primary" {...props} ref={ref}>
    {children}
  </Button>
));
