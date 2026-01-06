import { Collapse, Spin } from 'antd';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useFAQs } from '../pages/faq/hook';
import { pathnames } from '../routes/path-name';
import { ButtonPrimary } from './design-system/buttons';

export default function FAQ() {
  const { t } = useTranslation();
  const { faqs, loading } = useFAQs();

  return (
    <div className="flex w-full flex-col justify-between gap-[50px] lg:flex-row py-[50px] xl:px-[15%] lg:px-[8%] md:px-[40px] px-[16px]">
      <div className="w-full lg:w-[40%] flex flex-col gap-[24px]">
        <h1 className="text-textColor text-subHeading font-[700] lg:font-[800] w-[90%]">
          {t('frequently-asked-question-faqs')}{' '}
        </h1>
        <p className="text-smallSubHeading font-[500] lg:w-[90%] text-textColor w-full ">
          {/* {t('medsync-desc')} */}
          Got questions? We’ve got answers! Whether you’re a medical center
          streamlining your hiring process or a medical worker searching for
          your next opportunity, MedSyncAI is here to help. Find quick solutions
          to common inquiries below. Need more help? Our support team is ready
          to assist you.
          {/* {t('faq-desc')} */}
          <br />
          <br />
          <br />
          <Link to={pathnames.CONTACT_US}>
            <ButtonPrimary>Contact Us</ButtonPrimary>
          </Link>
        </p>
      </div>
      <div className="w-full lg:w-[60%] flex flex-col flex-center justify-center items-center">
        {loading ? (
          <Spin />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Collapse
                expandIconPosition="end"
                className="w-full"
                items={faqs?.slice(0, 6).map((item) => ({
                  id: item.id.toString(),
                  label: item.question,
                  children: (
                    <p className="text-body text-textColor">{item.answer}</p>
                  ),
                }))}
                accordion
                defaultActiveKey={0}
              />
              {faqs.length > 6 ? (
                <div className="flex justify-end w-full mt-4 text-blueColor text-xl hover:underline cursor-pointer">
                  <Link to={'/faqs'}> Show all FAQs</Link>
                </div>
              ) : null}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
