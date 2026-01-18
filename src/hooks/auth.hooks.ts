import { ChangeEvent, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from '../store';
import {
  loginAdmin,
  loginStudent,
  loginUser,
  logoutUser,
} from '../store/features/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

// type UserType = 'admin' | 'student';

// export const useLoginSignup = (userType: UserType) => {
//   const initialInput = {
//     email: '',
//     password: '',
//   };
//   const [inputValues, setInputValues] = useState<{
//     email: string;
//     password: string;
//   }>(initialInput);
//   const [isLoading, _setIsLoading] = useState(false);

//   // const query = useQueryParams();

//   // const principal = useSelector((state) => state.user?.payload);
//   // const navigate = useNavigate();
//   // const dispatch = useDispatch();

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {}, []);

//   const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setInputValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = async () => {
//     _setIsLoading(true);
//     try {
//       const {
//         error,
//         data: { session, user },
//       } = await supabase.auth.signInWithPassword({
//         email: inputValues.email,
//         password: inputValues.password,
//       });
//       if (error) {
//         toast.error(error.message);
//       }
//       console.log(user);
//       console.log(session);

//     } catch (err) {
//       console.log(err);

//       toast.error('An error occurred during login');
//     } finally {
//       _setIsLoading(false);
//     }
//   };

//   const handleEnter = (e: KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       //   onSubmit();
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return {
//     handleEnter,
//     onInputChange,
//     onSubmit,
//     isLoading,
//     inputValues,
//   };
// };

// export const useLoginSignup = () => {
//   const dispatch = useDispatch();

//   const [inputValues, setInputValues] = useState({
//     email: '',
//     password: '',
//   });

//   const [isLoading] = useState(false);

//   const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setInputValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = async () => {
//     const result = await dispatch(loginUser(inputValues));

//     if (loginUser.rejected.match(result)) {
//       toast.error(result.payload || 'Login failed');
//     } else {
//       toast.success('Login successful');
//     }
//   };
//   const handleEnter = (e: KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       onSubmit();
//     }
//   };

//   return {
//     inputValues,
//     isLoading,
//     onInputChange,
//     onSubmit,
//     handleEnter,
//   };
// };
// export const useAdminLogin = () => {
//   const dispatch = useDispatch();

//   const [inputValues, setInputValues] = useState({
//     email: '',
//     password: '',
//   });

//   const [isLoading] = useState(false);

//   const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setInputValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = async () => {
//     const result = await dispatch(loginUser(inputValues));

//     if (loginUser.rejected.match(result)) {
//       toast.error(result.payload || 'Login failed');
//     } else {
//       toast.success('Login successful');
//     }
//   };
//   const handleEnter = (e: KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       onSubmit();
//     }
//   };

//   return {
//     inputValues,
//     isLoading,
//     onInputChange,
//     onSubmit,
//     handleEnter,
//   };
// };

export const useAdminLogin = () => {
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    if (!inputValues.email || !inputValues.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await dispatch(loginAdmin(inputValues));
    setIsLoading(false);

    if (loginAdmin.rejected.match(result)) {
      toast.error(result.payload || 'Login failed');
    } else {
      toast.success('Admin login successful');
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return {
    inputValues,
    isLoading,
    onInputChange,
    onSubmit,
    handleEnter,
  };
};

export const useStudentLogin = () => {
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    matricule: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    if (!inputValues.matricule || !inputValues.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await dispatch(loginStudent(inputValues));
    setIsLoading(false);

    if (loginStudent.rejected.match(result)) {
      toast.error(result.payload || 'Login failed');
    } else {
      toast.success('Student login successful');
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return {
    inputValues,
    isLoading,
    onInputChange,
    onSubmit,
    handleEnter,
  };
};

export const useLogin = () => {
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    identifier: '', // Can be email or matricule
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    if (!inputValues.identifier || !inputValues.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await dispatch(loginUser(inputValues));
    setIsLoading(false);

    if (loginUser.rejected.match(result)) {
      toast.error(result.payload || 'Login failed');
    }
    // Success toast will be shown based on user role in component
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return {
    inputValues,
    isLoading,
    onInputChange,
    onSubmit,
    handleEnter,
  };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const performLogout = useCallback(async () => {
    try {
      const result = await dispatch(logoutUser());

      if (logoutUser.rejected.match(result)) {
        toast.error(result.payload || 'Logout failed');
      } else {
        toast.success('Logged out successfully');
        navigate('/'); 
      }
    } catch {
      toast.error('An unexpected error occurred');
    }
  }, [dispatch, navigate]);

  return {
    logout: performLogout,
  };
};
