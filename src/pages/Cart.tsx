import React, { useState } from 'react';
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';
import Breadcrumbs from '../components/Same/Breadcrumbs';
import CartData from '../components/Cart/CartData.js'
const Cart = () => {
  return (
    <div>
      <Header container="home" />
      <div className='min-h-[89.75vh] max-w-6xl p-5 mx-auto flex flex-col gap-2 m mt-2'>
        <div className='ml-5'>
        <Breadcrumbs container='cart'/>
        </div>
        <CartData />
      </div>
      <Footer/>
    </div>
  )
}

export default Cart;