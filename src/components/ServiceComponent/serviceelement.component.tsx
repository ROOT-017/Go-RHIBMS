import React from 'react';
import { ServiceElementComponentProps } from './service.type';

const ServiceElementComponent: React.FC<ServiceElementComponentProps> = ({
  elementHeading,
  elementText,
  image,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 md:w-[300px] w-full">
        <img src={image} alt="" className='w-[75px]' />
        <h3 className='text-subHeading2 font-[700] text-blueColor'>{elementHeading}</h3>
        <p className='text-bodyMedium text-textColor'>
          {elementText}
        </p>
      </div>
  );
};

export default ServiceElementComponent;
