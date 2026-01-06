import { Link } from 'react-router-dom';
import { Button, ButtonPrimary } from '../design-system/buttons';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { Image } from 'antd';

type Props = {
  slides: Array<{
    image: string;
    alt: string;
    heading: string;
    subheading: string;
    text: string;
    buttonText: string;
    buttonLink: string;
    button1ArialLabel: string;
    buttonText_2: string;
    button2ArialLabel: string;
    buttonLink_2: string;
    list?: {
      item1: string;
      item2?: string;
    };
  }>;
};

const HeroSlideShow = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // To store interval ID
  const [data, setData] = useState(props.slides[0]);
  const handlePrevNextClick = (intent: 'prev' | 'next') => {
    setActiveIndex((prev) =>
      intent === 'prev'
        ? prev === 0
          ? props.slides.length - 1
          : prev - 1
        : prev === props.slides.length - 1
          ? 0
          : prev + 1,
    );

    // Reset the timer when clicking previous or next
    clearAndRestartTimer();
  };

  useEffect(() => {
    setData(props.slides[activeIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const clearAndRestartTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startTimer();
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === props.slides.length - 1 ? 0 : prev + 1,
      );
    }, 15000); // Adjust the interval time as needed
  };

  useEffect(() => {
    // Start the timer on component mount
    startTimer();

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Add data.length as a dependency

  return (
    <div className="h-full">
      <div className="flex justify-center items-center w-full h-[80vh]">
        <div className="w-[10%] flex justify-end z-10">
          <Button type="link" onClick={() => handlePrevNextClick('prev')}>
            <LeftOutlined style={{ fontSize: 30, color: '#BEC2C1' }} />
          </Button>
        </div>
        <div className="flex  text-textColor lg:flex-row flex-col justify-center items-center md:gap-[40px] gap-[12px] xl:px-[15%] lg:px-[8%] lg:mt-[100px] mt-[90px] z-10">
          <div className="lg:w-[50%]  w-ful flex flex-col gap-8">
            <h1 className="md:text-heading text-textColor text-subHeading font-[700] md:font-[800] w-full">
              {data.heading}
            </h1>
            <p className="text-smallSubHeading font-[600] ">
              {data.subheading}
            </p>
            {data.text && (
              <p className="text-smallSubHeading font-[500] ">{data.text}</p>
            )}{' '}
            {data.list && (
              <ul className="list-disc text-smallSubHeading font-[500] pl-8">
                <li>{data.list.item1}</li>
                {data.list.item2 && <li>{data.list.item2}</li>}
              </ul>
            )}
            <div className="flex gap-6 md:gap-8 ">
              <div>
                <Link to={data.buttonLink}>
                  <ButtonPrimary aria-label={data.button1ArialLabel}>
                    {data.buttonText}
                  </ButtonPrimary>
                </Link>
              </div>
              <div>
                <Link to={`${data.buttonLink_2}`}>
                  <Button bordered aria-label={data.button2ArialLabel}>
                    {data.buttonText_2}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-[50%] w-full">
            <Image
              preview={false}
              src={data.image}
              alt={data.alt}
              className="flex rounded-[20px]"
            />
          </div>
        </div>
        <div className="flex justify-start">
          <Button type="link" onClick={() => handlePrevNextClick('next')}>
            <RightOutlined style={{ fontSize: 30, color: '#BEC2C1' }} />
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-8 gap-6 mt-8 md:mt-0">
        {props.slides.map((_, i) => (
          <div
            style={{
              width: activeIndex === i ? '4rem' : '1.5rem',
              height: '1.5rem',
              backgroundColor: activeIndex === i ? '#05998C' : '#e5e7eb',
              transition: 'width ease .4s',
            }}
            key={i}
            className="rounded-full cursor-pointer"
            onClick={() => (i !== activeIndex ? setActiveIndex(i) : null)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlideShow;
