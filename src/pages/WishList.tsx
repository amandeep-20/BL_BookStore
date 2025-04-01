import React, { useState, useEffect } from 'react';
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';
import Breadcrumbs from '../components/Same/Breadcrumbs';
import { getWishlist, removeWishlist } from '../utils/API';
import WishListContainer from '../components/Same/WishListContainer';

function WishList() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = await getWishlist(token);
      console.log("Fetched wishlist:", data); // Debug the response
      setWishlist(data || []); // Ensure we set an array even if data is null
    } catch (err: any) {
      console.error("Error fetching wishlist:", err);
      setWishlist([]); // Set empty array on error to prevent crashes
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      setLoading(true); // Show loading state during removal
      await removeWishlist(id);
      console.log("Item removed with ID:", id); // Debug the removal
      await fetchWishlist(); // Refetch to ensure state matches server
    } catch (err: any) {
      console.error("Error removing from wishlist:", err);
      await fetchWishlist(); // Refetch even on error to recover
    } finally {
      setLoading(false); // Reset loading state
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
              <div key={item.product_id?._id || index}> {/* Use unique ID if available */}
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