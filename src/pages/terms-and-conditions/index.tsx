// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

import styles from './terms.module.scss';

// import { sampleMarkdown } from '../privacy-policy/sample';
// import NavbarOrganism from '../../components/Navbar/Navbar.organism';
import { Flex, Spin } from 'antd';
import { useEffect, useState } from 'react';
import Chatbot from '../../components/chatbot/Chatbot';

const TermsAndConditionPage = () => {
  const [loading] = useState(false);
  // const { content, loading } = useGetContentDocuments('terms-and-conditions');
  useEffect(() => {
    //Navigate to top page smoothly.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    // <div className={`${styles.terms__and__condition}`}>
    <div className="flex w-full flex-col text-textColor mt-[5vh] md:mt-[10vh] bg-dashboardCardColor ">
      {/* <NavbarOrganism /> */}
      {loading ? (
        <Flex justify="center" align="center" className="h-[60vh]">
          <Spin />
        </Flex>
      ) : (
        <div className=" gap-12  flex-col justify-center mt-28  p-2 items-center">
          {/* <div className="flex gap-16 mt-24 flex-col ">
            <h1 className="text-textColor text-center md:text-subHeading text-[2em] font-[700] lg:font-[800]">
              {t('terms-and-conditions')}
            </h1>
          </div> */}
          <main
            className={styles['terms_and_condition_container']}
            dangerouslySetInnerHTML={{ __html: '' }}
          ></main>
          <div></div>
        </div>
      )}
      <Chatbot />
      {/* <Footer /> */}
    </div>
  );
};

export default TermsAndConditionPage;
