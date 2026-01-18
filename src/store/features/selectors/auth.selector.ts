import { RootState } from "../..";

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectProfile = (state: RootState) => state.auth.profile;
export const selectSession = (state: RootState) => state.auth.session;
export const selectStudent = (state: RootState) => state.auth.student;
export const selectAdmin = (state: RootState) => state.auth.admin;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

// Role-based selectors
export const selectIsAdmin = (state: RootState) =>
  state.auth.profile?.role === 'admin' && !!state.auth.admin;

export const selectIsStudent = (state: RootState) =>
  state.auth.profile?.role === 'student' && !!state.auth.student;

export const selectUserRole = (state: RootState) => state.auth.profile?.role;
export const selectUserFullName = (state: RootState) =>
  state.auth.profile?.full_name;
export const selectUserEmail = (state: RootState) => state.auth.profile?.email;

// Student-specific selectors
export const selectStudentMatricule = (state: RootState) =>
  state.auth.student?.matricule;
export const selectStudentProgram = (state: RootState) =>
  state.auth.student?.program;
export const selectStudentFeeStatus = (state: RootState) =>
  state.auth.student?.fee_status;

// Admin-specific selectors
export const selectAdminPosition = (state: RootState) =>
  state.auth.admin?.position;
