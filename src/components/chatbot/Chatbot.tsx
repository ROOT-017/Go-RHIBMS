import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Card, Flex, Input } from 'antd'; // Import Ant Design components
import {
  CloseOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'; // Icon for the chatbot button
import { AnimatePresence, motion } from 'framer-motion';
import { CiPaperplane } from 'react-icons/ci';
import { IconButton } from '@mui/material';
import { LuBot } from 'react-icons/lu';
import dayjs from 'dayjs';
import { BiCollapseAlt, BiExpandAlt } from 'react-icons/bi';
import { UseScreenDimensions } from '../../utils/getScreenWidth';
type ChabtbotProps = {
  onClick?: () => void;
};
const Chatbot = forwardRef(
  (_props: ChabtbotProps, buttonRef: Ref<HTMLButtonElement>) => {
    const [isOpen, setIsOpen] = useState(false);
    const { Search } = Input;
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };
    const [screenWidth] = UseScreenDimensions();
    const cardRef = useRef<HTMLDivElement>(null);
    const toggleChatSupport = () => {
      setIsOpen((prev) => !prev);
    };

    const [chats, setChats] = useState<{
      received: {
        message: string;
        createdAt: string;
      }[];
      sent: { message: string; createdAt: string }[];
    }>({
      received: [
        {
          message: '👋 Hi! How can we help you today?',
          createdAt: '2024-01-12',
        },
        {
          message: 'I have a question about my account.',
          createdAt: '2024-01-15',
        },
        {
          message:
            'I have a question about my accountdnskajdhbsak. Lorem ipsum d cjnd ddsn,sdmf dsf jksdfns,d fdsnfs,dfnds fmdsnfjkdsnf dsfndskjf    ',
          createdAt: '2025-02-15',
        },
      ],
      sent: [
        {
          message: 'Hello!',
          createdAt: '2024-01-13',
        },
        {
          message: 'I need help with setting up a new account.',
          createdAt: '2025-01-14',
        },
        {
          message: "I'm looking for a new job in healthcare.",
          createdAt: '2025-01-16',
        },
      ],
    });

    const formattedReceiver = chats.received.map((elt) => ({
      ...elt,
      source: 'system',
    }));

    const formattedSent = chats.sent.map((elt) => ({ ...elt, source: 'user' }));
    const data = [...formattedReceiver, ...formattedSent].sort(
      (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    );

    const onSubmit = () => {
      if (text) {
        setChats((prev) => ({
          ...prev,
          sent: [
            ...prev.sent,
            {
              message: text,
              createdAt: dayjs().format('YYYY-MM-DD'),
            },
          ],
        }));
        setText('');
      }
    };

    useEffect(() => {
      scrollToBottom();
    }, [chats]);

    return (
      <div className="z-[9999]">
        {/* Floating Button */}
        <div className="fixed bottom-5 right-5 ">
          <Button
            type="primary"
            shape="circle"
            icon={
              <AnimatePresence>
                {isOpen ? <CloseOutlined /> : <MessageOutlined />}
              </AnimatePresence>
            }
            size="large"
            onClick={toggleChatSupport}
            ref={buttonRef}
            className="shadow-lg hover:scale-125 transform transition-all duration-300"
          />
        </div>
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="chatbox"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`fixed bottom-24 right-4 ${
                isExpanded
                  ? 'lg:h-[80vh] h-[80vh] w-[95vw] lg:w-[50vw]'
                  : 'h-[80vh] lg:h-[50vh] lg:w-[30vw] w-[95vw]'
              }`}
            >
              <Card
                title={
                  <Flex justify="space-between" className=" items-center">
                    <h1 className="text-primaryColor text-2xl md:text-4xl font-bold">
                      ChatBot
                    </h1>
                    <IconButton
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {!isExpanded ? (
                        <BiExpandAlt className="text-[1.5em] hidden lg:block" />
                      ) : (
                        <BiCollapseAlt className="text-[1.5em] hidden lg:block" />
                      )}
                    </IconButton>
                  </Flex>
                }
                ref={cardRef}
                className="h-full  shadow-lg overflow-hidden rounded-xl"
                styles={{
                  body: {
                    padding: screenWidth < 786 ? '8px' : '16px',
                    height: isExpanded
                      ? `${screenWidth < 786 ? '90%' : '90%'}`
                      : `${screenWidth < 786 ? '90%' : '85%'}`,
                    display: 'flex',
                    flex: '1 1 0%',
                    flexDirection: 'column',
                  },
                }}
              >
                <div className="h-full flex flex-col">
                  <div
                    onScroll={(e) => {
                      e.isPropagationStopped();
                    }}
                    ref={containerRef}
                    className="flex flex-1 flex-col gap-2 overflow-y-auto pr-3 mb-4"
                  >
                    <p className="text-center text-gray-600 mb-3">
                      Chat started {dayjs().format('hh:mm a')}
                    </p>{' '}
                    {data.map((chat, index) =>
                      chat.source === 'user' ? (
                        <Flex key={index} className="gap-2 justify-end">
                          <div className="p-3 bg-blue-50 max-w-[82%] rounded-lg text-blue-800">
                            {chat.message}
                          </div>
                          <Avatar
                            size="small"
                            icon={<UserOutlined />}
                            className="bg-gray-300"
                          />
                        </Flex>
                      ) : (
                        <Flex key={index} className="gap-2 justify-start">
                          <Avatar
                            size="small"
                            icon={<LuBot />}
                            className="bg-gray-300"
                          />
                          <div className="p-3 bg-green-50 max-w-[82%] rounded-lg">
                            {chat.message}
                          </div>
                        </Flex>
                      ),
                    )}
                  </div>
                  <div className="h-[10%]items-center flex">
                    <Search
                      placeholder="Type your message here..."
                      enterButton={<CiPaperplane />}
                      size="large"
                      value={text}
                      onSearch={onSubmit}
                      onChange={(e) => setText(e.target.value)}
                      onPressEnter={onSubmit}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);

export default Chatbot;
