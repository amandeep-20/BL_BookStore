import React, { useState, useEffect } from 'react';
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';
import Breadcrumbs from '../components/Same/Breadcrumbs';
import { getWishlist, removeWishlist } from '../utils/API';
import WishListContainer from '../components/Same/WishListContainer';
import { v4 as uuid } from 'uuid';

function WishList() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const data = await getWishlist(token);
      setWishlist(data);
    } catch (err: any) {
      setWishlist([]); // Reset wishlist on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      await removeWishlist(id);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.product_id._id !== id));
      await fetchWishlist();
    } catch (err: any) {
      await fetchWishlist();
    }
  };

  const renderWishlistContent = () => {
    if (loading) {
      return <p className="p-4">Loading...</p>;
    }
    
    if (wishlist.length === 0) {
      return <p className="p-4">Your wishlist is empty.</p>;
    }

    return wishlist.map((item) => (
      <div key={uuid()}>
        <WishListContainer
          order={item}
          container="wishlist"
          onRemove={handleRemoveFromWishlist}
        />
      </div>
    ));
  };

  return (
    <div>
      <Header container="home" />
      <div className="min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col gap-2 mt-2">
        <Breadcrumbs container="wishlist" />
        <div className="mt-5">
          <div className="p-4 bg-[#F5F5F5] border-2 border-[#E4E4E4]">
            <p className="font-bold">My Wishlist</p>
          </div>
          {renderWishlistContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WishList;