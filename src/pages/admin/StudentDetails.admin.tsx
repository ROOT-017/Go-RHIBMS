import { useParams } from 'react-router-dom';

const StudentDetailsAdmin = () => {
  const queryParams = useParams();
  return <div>{queryParams.matriculationNumber}</div>;
};

export default StudentDetailsAdmin;
