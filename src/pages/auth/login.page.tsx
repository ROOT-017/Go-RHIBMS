import { useTranslation } from 'react-i18next';
import { Input, Space } from 'antd';
import logo from '../../assets/logos/rhibms-logo.png';
import { Link } from 'react-router-dom';
import { pathnames } from '../../routes/path-name';
// import { Alert } from 'antd';
import './style.scss';
import { ButtonPrimary } from '../../components/design-system/buttons';
import { PasswordInput } from '../../components/Input/PasswordInput';
import { Footer } from '../../components/Footer/footer';
import { useStudentLogin } from '../../hooks/auth.hooks';

export default function LoginPage() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  // const query = useQueryParams();
  const { inputValues, isLoading, onInputChange, onSubmit } = useStudentLogin();

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
                  Login to Go-RHIBMS
                </h2>
              </div>

              <Space direction="vertical" style={{ width: '100%' }}></Space>
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
                      {t('Matriculation Number')}
                    </label>
                    <Input
                      className="h-[35px]"
                      name="matricule"
                      placeholder="matriculation number"
                      onChange={onInputChange}
                      value={inputValues.matricule}
                    />
                    {inputValues.matricule.includes('@') && (
                      <p className="text-red-600 text-sm mt-1">
                        Please enter a valid matriculation number
                      </p>
                    )}
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
                      minLength={6}
                      // status={error?.password ? 'warning' : ''}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full md:flex-row md:gap-8 justify-center mt-[10px] items-center ">
                  <ButtonPrimary
                    loading={isLoading}
                    disabled={
                      isLoading ||
                      !inputValues.password ||
                      !inputValues.matricule ||
                      inputValues.matricule.includes('@')
                    }
                    // onClick={() =>
                    //   navigate(
                    //     query.u === 'admin' ? '/admin/dashboard' : '/dashboard',
                    //   )
                    // }
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
