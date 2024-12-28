// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Hotels from "./pages/Hotels";
import Blood from "./pages/Blood";
import BloodForm from "./pages/BloodForm";
import LibManagement from "./pages/LibManagment";
import NavbarPart2 from "./components/NavbarPart2";
import AddProduct from "./pages/AddProduct";
import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";
import MyProduct from "./components/MyProduct";
import BuyProductList from "./components/BuyProductList";
import FileManager from "./pages/FileHandling";

function App() {
  return (
    <Router>
      <Navbar /> 
      <NavbarPart2 /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotels"
          element={
            <PrivateRoute>
              <Hotels />
            </PrivateRoute>
          }
        />
        <Route
          path="/blood"
          element={
            <PrivateRoute>
              <Blood />
            </PrivateRoute>
          }
        />
        <Route
          path="/bloodForm"
          element={
            <PrivateRoute>
              <BloodForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/libManage"
          element={
            <PrivateRoute>
              <LibManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/getallproducts"
          element={
            <PrivateRoute>
              <ProductsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/userproducts"
          element={
            <PrivateRoute>
              <MyProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/buyproductlist"
          element={
            <PrivateRoute>
              <BuyProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/FileExample"
          element={
            <PrivateRoute>
              <FileManager />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
