import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetails from './components/AllProducts/ProductsDetails';
import AllProviders from './pages/AllProviders';
import Cart from './pages/Cart';
import Shipping from './components/Shipping';
import Register from './pages/Register';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { get_category } from './store/reducers/homeReducer';
import { useEffect } from 'react';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import Payments from './components/Payments';
import ProtectUser from './utils/ProtectUser';
import UserDashBoard from './pages/UserDashBoard';
import Index from './components/Dashboard/Index';
import Orders from './components/Dashboard/Orders';
import WishList from './components/Dashboard/WishList';
import ChangePassword from './components/Dashboard/ChangePassword';
import OrderDetails from './components/Dashboard/OrderDetails';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_category())
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register></Register>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/' element={<Home></Home>} />
        <Route path='/allProducts' element={<AllProducts></AllProducts>} />
        <Route path='/products?' element={<CategoryShop></CategoryShop>} />
        <Route path='/products/search?' element={<SearchProducts></SearchProducts>} />
        <Route path='/product/details/:slug' element={<ProductDetails></ProductDetails>} />
        <Route path='/allProviders' element={<AllProviders></AllProviders>} />
        <Route path='/cart' element={<Cart></Cart>} />
        <Route path='/shipping' element={<Shipping></Shipping>} />
        <Route path='/payment' element={<Payments></Payments>} />

        <Route path='/dashboard' element={<ProtectUser></ProtectUser>}>
          <Route path='' element={<UserDashBoard></UserDashBoard>}>
            <Route path='' element={<Index></Index>}></Route>
            <Route path='myOrders' element={<Orders></Orders>}></Route>
            <Route path='order/details/:orderId' element={<OrderDetails></OrderDetails>}></Route>
            <Route path='wishList' element={<WishList></WishList>}></Route>
            <Route path='changePassword' element={<ChangePassword></ChangePassword>}></Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
