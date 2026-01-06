import { Card, Button } from 'antd';
import logo from '../../assets/logos/rhibms-logo.png';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { pathnames } from '../../routes/path-name';

export default function Error404() {
  return (
    <main className="bg-[#e5e5e5] w-screen h-screen flex justify-center items-center">
      <div className="w-full text-[#f0f0f0] flex flex-col justify-center items-center gap-[30px]">
        {/* <img src={logo} alt="" className="w-[150px]" /> */}
        <Card
          hoverable
          className="w-[90%] md:w-[30%] p-4 md:p-6 text-center flex justify-center items-center"
        >
          <Link to={pathnames.HOME} className='w-full flex justify-center'>
            <img
              src={logo}
              className="w-[80px] sm:w-[100px] mt-[50px] md:mt-[10px]"
            />
          </Link>
          <div className="flex flex-col gap-4 w-full justify-center items-center m-auto">
            <div>
              <h1 className="text-[1.8rem] md:text-[2.2rem] font-[700] text-[#2E3130]">
                Page Not Found
              </h1>
            </div>
            <div>
              <p>Not bad you arrived here</p>
            </div>
            <div>
              <Link to={pathnames.HOME}>
                <Button className="flex justify-evenly items-center button1 w-full xl:w-full h-[45px] bg-[#241773] text-[#fff]">
                  Please Start Over
                  <ArrowRightOutlined />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
