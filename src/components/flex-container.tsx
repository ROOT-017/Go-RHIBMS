import { ReactNode } from 'react';

interface FlexContainerProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  labelRequired?: boolean;
  className?: string;
}
export const FlexContainer = ({
  label,
  children,
  required,
  labelRequired = true,
  className,
}: FlexContainerProps) => (
  <div className={`${className ?? ''} flex flex-col gap-4 flex-1 w-full`}>
    {labelRequired ? (
      <label className="text-body text-textColor font-[600]">
        <span>{label}</span>
        {required ? (
          <span
            style={{
              color: 'red',
              marginLeft: 8,
            }}
          >
            *
          </span>
        ) : (
          ''
        )}
      </label>
    ) : (
      ''
    )}

    {children}
  </div>
);
