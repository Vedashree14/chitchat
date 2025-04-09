import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from '../../../components/utitlities/axiosInstance';
import { setUser, setLoading, setError, clearUser } from './user.slice';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", userData);
      const { token, user } = response.data;
      Cookies.set('token', token, { expires: 7 });
      toast.success("Login successful!");
      return user;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message || "Login failed";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);
      toast.success("Account created successfully!");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message || "Registration failed";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/api/auth/logout");
      Cookies.remove('token');
      toast.success("Logout successful!");
      return null;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message || "Logout failed";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/auth/profile");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message || "Failed to get profile";
      return rejectWithValue(errorOutput);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/auth/users");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message || "Failed to get users";
      return rejectWithValue(errorOutput);
    }
  }
);
