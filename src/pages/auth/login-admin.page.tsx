import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import logo from '../../assets/logos/rhibms-logo.png';
import { Link } from 'react-router-dom';
import { pathnames } from '../../routes/path-name';
// import { useLoginSignup } from '../../hooks/auth.hooks';
import './style.scss';
import { ButtonPrimary } from '../../components/design-system/buttons';
import { PasswordInput } from '../../components/Input/PasswordInput';
import { Footer } from '../../components/Footer/footer';
import { useLoginSignup } from '../../hooks/auth.hooks';
// import { ErrorLabel } from '../../components/Input/ErrorLabel';

export default function LoginPage() {
  const { t } = useTranslation();
  const { inputValues, onInputChange, onSubmit, isLoading } =
    useLoginSignup('admin');

  return (
    <div className="maincontainer">
      <main className="mainWrapper flex w-screen flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <div className="flex w-[90%] md:w-[60%] lg:w-[40%]">
            <div className="flex w-full flex-col gap-2 p-[30px] mt-[20px] mb-[20px] bg-[#fff] justify-center items-center rounded-[10px]">
              <Link to={pathnames.HOME}>
                <img src={logo} className="w-[80px] sm:w-[80px]" />
              </Link>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-[18px] md:text-[20px] lg:text-[28px] font-[700] text-[#000]">
                 Admin Login to Go-RHIBMS
                </h2>
              </div>

              {/* <Space direction="vertical" style={{ width: '100%' }}>
                {error?.status?.trim() != null && (
                  <Alert
                    message={error?.status}
                    type="error"
                    closable
                    showIcon
                  />
                )}
                {message && message?.trim() != '' && (
                  <Alert message={message} type="success" closable showIcon />
                )}
              </Space> */}
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                className="w-full"
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2 flex-1 relative mb-4">
                    <label className="require-field require-field text-[1.6rem] text-[#241773] font-[600]">
                      {t('Email')}
                    </label>
                    <Input
                      className="h-[35px]"
                      name="email"
                      placeholder="Email"
                      type="email"
                      onChange={onInputChange}
                      // onBlur={onBlur}
                      // status={error?.email ? 'error' : ''}
                    />
                    {/* <ErrorLabel error={error?.email} className="absolute" /> */}
                  </div>
                  <div className="flex flex-col gap-2 flex-1 mb-4">
                    <label className="require-field require-field text-[1.6rem] text-[#241773] font-[600]">
                      {t('password')}
                    </label>
                    <PasswordInput
                      className="h-[35px]"
                      name="password"
                      value={inputValues.password}
                      onChange={onInputChange}
                      placeholder="Password"
                      // onBlur={onBlur}
                      minLength={8}
                      // status={error?.password ? 'warning' : ''}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full md:flex-row md:gap-8 justify-center mt-[10px] items-center ">
                  <ButtonPrimary
                    loading={isLoading}
                    disabled={
                      isLoading ||
                      // error?.email != null ||
                      !inputValues.password ||
                      !inputValues.email
                    }
                    htmlType="submit"
                    className="flex justify-evenly items-center w-[90%] md:w-[70%] h-[35px]"
                  >
                    {t('login')}
                  </ButtonPrimary>
                  <button className="hidden"> SUBMIT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
}
