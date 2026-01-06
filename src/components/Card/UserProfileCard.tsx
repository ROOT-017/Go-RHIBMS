import { Image } from 'antd';
import profile from '../../assets/profile.jpg';
import { FaEnvelope, FaLocationPin, FaUser } from 'react-icons/fa6';

const UserProfileCard = () => {
  return (
    <div>
      {' '}
      <div className="h-[32em] w-[28em] border-[1px]">
        <div className="h-[75%]">
          <Image preview={false} src={profile} className="h-full w-full " />
        </div>
        <div className="h-[25%] bg-primaryColor  flex justify-center items-center  w-full p-2">
          <p className="text-3xl  text-white italic">Hi John Doe!</p>
        </div>
      </div>
      <div className="text-textColor text-2xl flex flex-col gap-4">
        <p className="text-4xl my-4">Contact</p>
        <div className="flex gap-5">
          <FaUser /> <p>+237 678 909 876</p>
        </div>
        <div className="flex gap-5">
          <FaEnvelope /> <p>exemple@gmail.com</p>
        </div>
        <div className="flex gap-5">
          <FaLocationPin /> <p>Muea, Buea</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
