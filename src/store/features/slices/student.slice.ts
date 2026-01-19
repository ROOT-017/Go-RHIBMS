// store/students/student.slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateStudentDTO, Student } from '../../../@types';
import { programService } from '../../../services/programService';
import { studentService } from '../../../services/studentService';

interface StudentState {
  students: Student[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  programs: any[]; // Program with department data
  isLoading: boolean;
  error: string | null;
  currentStudent: Student | null;
  isCreating: boolean;
  creationError: string | null;
  creationSuccess: boolean;
}

const initialState: StudentState = {
  students: [],
  programs: [],
  isLoading: false,
  error: null,
  currentStudent: null,
  isCreating: false,
  creationError: null,
  creationSuccess: false,
};

// Thunks
export const fetchPrograms = createAsyncThunk(
  'students/fetchPrograms',
  async (_, { rejectWithValue }) => {
    try {
      return await programService.getAllPrograms();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData: CreateStudentDTO, { rejectWithValue }) => {
    try {
      return await studentService.createStudent(studentData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const checkMatriculeAvailability = createAsyncThunk(
  'students/checkMatriculeAvailability',
  async (matricule: string, { rejectWithValue }) => {
    try {
      return await studentService.checkMatriculeAvailability(matricule);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearCreationState: (state) => {
      state.creationError = null;
      state.creationSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Programs
      .addCase(fetchPrograms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create Student
      .addCase(createStudent.pending, (state) => {
        state.isCreating = true;
        state.creationError = null;
        state.creationSuccess = false;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isCreating = false;
        state.creationSuccess = true;
        state.students.push(action.payload.student);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isCreating = false;
        state.creationError = action.payload as string;
      });
  },
});

export const { clearCreationState, clearError } = studentSlice.actions;
export default studentSlice.reducer;
