import React, { useState, useEffect } from 'react';
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';
import Breadcrumbs from '../components/Same/Breadcrumbs';
import { getWishlist, removeWishlist } from '../utils/API';
import WishListContainer from '../components/Same/WishListContainer';

function WishList() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); 

  // Function to fetch wishlist data
  const fetchWishlist = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token');
      const data = await getWishlist(token);
      setWishlist(data);
    } catch (err: any) {
      console.error('Failed to fetch wishlist:', err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Handle removal of an item from the wishlist
  const handleRemoveFromWishlist = async (id: string) => {
    try {
      await removeWishlist(id);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.product_id._id !== id));
      await fetchWishlist();
    } catch (err: any) {
      console.error('Failed to remove item from wishlist:', err);
      await fetchWishlist();
    }
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
          {loading ? (
            <p className="p-4">Loading...</p>
          ) : wishlist.length === 0 ? (
            <p className="p-4">Your wishlist is empty.</p>
          ) : (
            wishlist.map((item, index) => (
              <div key={index}>
                <WishListContainer
                  order={item}
                  container="wishlist"
                  onRemove={handleRemoveFromWishlist}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WishList;