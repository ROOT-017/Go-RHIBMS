import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary, Button } from '../design-system/buttons';
import { SectionProps } from './section.types';
import { motion } from 'framer-motion';
import { Image } from '../Optimizer';
import { Image as AntImage, Spin } from 'antd';
import { useState, useEffect } from 'react';

const Section: React.FC<SectionProps> = ({
  heading,
  subheading,
  buttontext1,
  img,
  buttontext2,
  path1,
  path2,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, []);
  return (
    <>
      {isLoading ? (
        <div className="flex py-[200px] justify-center items-center">
          <Spin size="large" />
          <Image
            src={img}
            onDOMContentLoaded={(loaded) => setIsLoading(!loaded)}
          />
        </div>
      ) : (
        <div className="flex text-textColor w-full flex-col justify-between gap-[50px] lg:flex-row xl:px-[15%] lg:px-[8%] md:px-[40px] px-[16px]">
          <div className="w-full lg:w-[40%] flex flex-col gap-[24px]">
            <h1 className="text-[2.7em] text-textColor font-[800]  lg:font-[800] w-full">
              {heading}
            </h1>
            <p className="text-smallSubHeading font-[500] ">{subheading}</p>
            <div className="flex gap-6 md:gap-8 ">
              {buttontext1 ? (
                <div>
                  <Link to={path1}>
                    <ButtonPrimary
                      aria-label={t('home.hero.template.aria-label-find-job')}
                      className="font-bold"
                    >
                      {buttontext1}
                    </ButtonPrimary>
                  </Link>
                </div>
              ) : (
                <></>
              )}

              {buttontext2 ? (
                <div>
                  <Link to={path2}>
                    <Button
                      bordered
                      aria-label={t('home.hero.template.aria-label-hire-staff')}
                    >
                      {buttontext2}
                    </Button>
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="w-full lg:w-[60%] flex flex-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <AntImage
                src={img}
                preview={false}
                alt={t('home.hero.template.alt-hero')}
                className="flex w-full rounded-[20px]"
              />
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Section;
