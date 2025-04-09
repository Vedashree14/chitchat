import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import "./App.css";
import { Toaster } from "react-hot-toast";
import { getUserProfileThunk } from "./store/slice/user/user.thunk";
import { initializeSocket } from "./utilities/socket.utility";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      initializeSocket(user._id);
    }
  }, [user?._id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
