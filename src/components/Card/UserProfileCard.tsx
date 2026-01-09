import { Image } from 'antd';
import { FaEnvelope, FaLocationPin, FaUser } from 'react-icons/fa6';

interface UserProfileCardProps {
  profile_url: string;
  name: string;
  email: string;
  location: string;
  phone: string;
}
const UserProfileCard = ({
  email,
  location,
  name,
  phone,
  profile_url,
}: UserProfileCardProps) => {
  return (
    <div>
      {' '}
      <div className="h-[32em] w-[28em] border-[1px]">
        <div className="h-[75%] overflow-hidden">
          <Image preview={false} src={profile_url} className="h-full w-full " />
        </div>
        <div className="h-[25%] bg-primaryColor  flex justify-center items-center  w-full p-2">
          <p className="text-3xl  text-white italic">Hi {name}!</p>
        </div>
      </div>
      <div className="text-textColor text-2xl flex flex-col gap-4">
        <p className="text-4xl my-4">Contact</p>
        <div className="flex gap-5">
          <FaUser /> <p>{phone}</p>
        </div>
        <div className="flex gap-5">
          <FaEnvelope /> <p>{email}</p>
        </div>
        <div className="flex gap-5">
          <FaLocationPin /> <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
