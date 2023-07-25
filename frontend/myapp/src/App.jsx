import React, { useEffect } from "react";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/homeScreen";
import Footer from "./components/footer";
import FilterCityScreen from "./screens/FilterCityScreen";
import DetailScreen from "./screens/DetailScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import CartScreen from "./screens/CartScreen";
import AddCartScreen from "./screens/AddCartScreen";
import AdminAuthendication from "./components/AdminAuthendication";
import DashboardScreen from "./screens/admin/dashboardScreen";
import AdminProductScreen from "./screens/admin/AdminProductScreen";
import AdminCreateTrainScreen from "./screens/admin/AdminCreateTrainScreen";
import AdminEditTrainScreen from "./screens/admin/AdminEditTrainScreen";
import AdminUserScreen from "./screens/admin/AdminUserScreen";
import AdminCityScreen from "./screens/admin/AdminCityScreen";
import AddCityScreen from "./screens/admin/AddCityScreen";
import AdminOrderScreen from "./screens/admin/AdminOrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import { isSesstionExpires } from "./utilities/IsSeccionExpires";
import { useSelector, useDispatch } from "react-redux";
import { loginSelector } from "./features/auth/loginSlice";
import { logoutUser } from "./features/auth/loginSlice";

const App = () => {
  const { userInfo } = useSelector(loginSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("this is app useeffect");
    const checkInterval = setInterval(() => {
      console.log(typeof userInfo.expireIn);
      console.log(userInfo.expireIn);
      if (isSesstionExpires(userInfo.expireIn)) {
        dispatch(logoutUser);
      }
    }, 60000);
    return () => clearInterval(checkInterval);
  }, [userInfo, dispatch]);

  return (
    <>
      <Header />

      <main className="main-height bodyColor">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/train/filter" element={<FilterCityScreen />} />
          <Route path="/train/:id" element={<DetailScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/cart/:id" element={<AddCartScreen />}></Route>
          <Route path="/order/:id" element={<OrderDetailScreen />}></Route>
        </Routes>
        <Routes>
          <Route path="admin" element={<AdminAuthendication isadmin />}>
            <Route path="" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="train" element={<AdminProductScreen />} />
            <Route path="train/add" element={<AdminCreateTrainScreen />} />
            <Route path="train/edit/:id" element={<AdminEditTrainScreen />} />
            <Route path="user" element={<AdminUserScreen />} />
            <Route path="city" element={<AdminCityScreen />} />
            <Route path="city/add" element={<AddCityScreen />} />
            <Route path="order" element={<AdminOrderScreen />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
