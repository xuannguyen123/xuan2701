import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blog from "./Component/Blog/Blog";
import BlogDetails from "./Component/Blog/BlogDetails";
import LoginUser from "./Component/Member";
import Account from "./Component/Account/Account";
import MyProduct from "./Component/Account/MyProduct";
import AddProduct from "./Component/Account/AddProduct";
import EditProduct from "./Component/Account/EditProduct";
import HomeProduct from "./Component/Products/HomeProduct";
import HomeProductDetail from "./Component/Products/HomeProductDetail";
import Cart from "./Component/Cart/Cart";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
          <Routes>
            <Route exact path="/" element={<HomeProduct />} />
            <Route  path="/home" element={<HomeProduct />} />
            <Route  path="/product/detail/:id" element={<HomeProductDetail />} />
            <Route  path="/cart/product" element={<Cart />} />
            

            <Route path="/blog/list" element={<Blog />} />
            <Route path="/blog/details/:id" element={<BlogDetails />} />

            <Route path='/account' element={<Account />}/>
            <Route path='/account/my-product' element={<MyProduct />} />
            <Route path='/account/product/add' element={<AddProduct />} />
            <Route path='/account/product/edit/:id' element={<EditProduct />} />

            <Route path="/login" element={ <LoginUser /> } />
          </Routes>
      </App>
    </Router>
  
  </React.StrictMode>
);


reportWebVitals();
