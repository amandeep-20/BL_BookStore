import React from 'react'
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';

type BreadcrumbsProps = {
    container?: string
}

const Breadcrumbs = ({container}:BreadcrumbsProps) => {

    const params = useParams()
    const bookId = params.id ?? 0

  return (
    <div>
     <Breadcrumb
    items={[
      {
        title: <a href='/home'>Home</a>,
      },
      {
        title: container === 'bookPage' ? <a href='/book'><p className='text-black font-semibold'>Book({Number(bookId)+1})</p></a> : container === 'myOrder' ? <a href='/myOrder'><p className='text-black font-semibold'>My Order</p></a> : container === 'wishlist' ? <a href='/wishlist'><p className='text-black font-semibold'>My Wishlist</p></a> :container === 'cart' ? <a href='/cart'><p className='text-black font-semibold'>My cart</p></a> :  container === 'profile' ? <a href='/profile'><p className='text-black font-semibold'>My Profile</p></a> : "",
      }
    ]}
  />
    </div>
  )
}

export default Breadcrumbs