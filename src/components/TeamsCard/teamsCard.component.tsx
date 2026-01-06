import { TeamsProps } from './teamscard.type';

const TeamsCard: React.FC<TeamsProps> = ({
  jobtitle,
  memberName,
  image,
}) => {
  return (
    <div className="flex w-[250px] h-[300px] justify-center flex-col rounded-[10px] border-[2px] border-[solid] border-lightTextColor items-center">
        <img src={image} alt="" className="w-full h-[80%] rounded-t-[10px]" />
      <div className="w-full flex flex-col h-[20%] rounded-b-[8px] py-4 text-[#fff] text-center justify-center bg-[#05998C] items-center">
        <h2 className="font-[600] w-full md:text-[1.8rem] text-[1.6rem]">
          {memberName}
        </h2>
        <p className="md:text-[1.6rem] text-[1.4rem]">
          {jobtitle}
        </p>
      </div>
    </div>
  );
};

export default TeamsCard;
