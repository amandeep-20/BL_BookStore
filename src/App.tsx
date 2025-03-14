import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgetPassword'
import BookPage from './pages/BookPage'
import MyOrder from './pages/MyOrder'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import UserProfile from './pages/UserProfile'
import GuestView from './components/Same/GuestView'
import OrderConfirm from './pages/OrderConfirm'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/home/:id' element={<BookPage />}/>
        <Route path='myOrder' element={<MyOrder/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/guest' element={<GuestView />}/>
        <Route path='/orderConfirm' element={<OrderConfirm />}/>
      </Routes>
    </div>
  )
}

export default App
