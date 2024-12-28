
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import NavbarPart2 from "./components/NavbarPart2";
import AddProduct from "./pages/AddProduct";
import ProductsList from "./components/Products/ProductsList";
import ProductDetail from "./components/Products/ProductDetail";
import MyProduct from "./components/Products/MyProduct";
import BuyProductList from "./components/Products/BuyProductList";
import BuyerAddress from "./components/Address/BuyerAddress";



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
          path="/buyerAddress"
          element={
            <PrivateRoute>
             <BuyerAddress />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
