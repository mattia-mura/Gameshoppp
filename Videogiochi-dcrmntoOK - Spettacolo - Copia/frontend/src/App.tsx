import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useCartSync } from './hooks/useCartSync';
import { useEffect } from "react";
import { fetchVideogiochi } from "./slices/videogiochiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./slices/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useCartSync();

  useEffect(() => {
    dispatch(fetchVideogiochi());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
