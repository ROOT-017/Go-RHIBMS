import auth from './features/slices/auth.slice';
import students from './features/slices/student.slice';

const rootReducer = {
  auth,
  students
};
export default rootReducer;
