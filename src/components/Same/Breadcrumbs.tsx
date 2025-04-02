import React from 'react';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';

type BreadcrumbsProps = {
  container?: string;
};

const Breadcrumbs = ({ container }: BreadcrumbsProps) => {
  const params = useParams();
  const bookId = params.id ?? 0;

  // Function to determine the second breadcrumb item
  const getSecondBreadcrumbItem = () => {
    if (container === 'bookPage') {
      return (
        <a href="/book">
          <p className="text-black font-semibold">Book({Number(bookId) + 1})</p>
        </a>
      );
    }
    if (container === 'myOrder') {
      return (
        <a href="/myOrder">
          <p className="text-black font-semibold">My Order</p>
        </a>
      );
    }
    if (container === 'wishlist') {
      return (
        <a href="/wishlist">
          <p className="text-black font-semibold">My Wishlist</p>
        </a>
      );
    }
    if (container === 'cart') {
      return (
        <a href="/cart">
          <p className="text-black font-semibold">My cart</p>
        </a>
      );
    }
    if (container === 'profile') {
      return (
        <a href="/profile">
          <p className="text-black font-semibold">My Profile</p>
        </a>
      );
    }
    return ""; // Default case
  };

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <a href="/home">Home</a>,
          },
          {
            title: getSecondBreadcrumbItem(),
          },
        ]}
      />
    </div>
  );
};

export default Breadcrumbs;