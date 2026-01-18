import { ServiceComponentProps } from './service.type';

const ServiceComponent: React.FC<ServiceComponentProps> = ({
  heading,
  children,
}) => {
  return (
    <div className="flex w-full flex-col xl:px-[15%] lg:px-[8%] md:px-[32px] text-center justify-center items-center">
      <h2 className="font-[600] lg:w-[50%] sm:w-[80%] w-full text-textColor text-subHeading">
        {heading}
      </h2>
      <div className="flex text-center w-full flex-wrap lg:p-20 p-10 gap-12 flex md:flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default ServiceComponent;
