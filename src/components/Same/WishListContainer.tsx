import { Trash2 } from "lucide-react";
import bookImage from '../../assets/images/BookCover1.png';

type orderProps = {
  order: any;
  container: string;
  onRemove: (id: string) => void;
};

function WishListContainer({ order, container, onRemove }: orderProps) {
  const handleRemove = () => {
    if (order.product_id?._id) {
      onRemove(order.product_id._id); // Only call onRemove if ID exists
    } else {
      console.warn("No valid product ID found for removal");
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row justify-between ${
        container === "wishlist" ? "items-center" : "items-start"
      } w-full py-6 px-4 border-2 border-[#E4E4E4] rounded-sm`}
    >
      <div className="flex items-center space-x-8">
        <div>
          <img className="w-[65px]" src={bookImage} alt="order-cover-image" />
        </div>
        <div>
          <p className="text-lg">{order.product_id?.bookName || "Unknown Book"}</p>
          <p className="text-[#9D9D9D] text-xs">{order.product_id?.author || "Unknown Author"}</p>
          <div className="mt-1 flex items-center space-x-2">
            <p className="font-semibold">
              Rs. {order.product_id?.discountPrice || "N/A"}
            </p>
            <p className="text-[#878787] text-xs line-through">
              Rs. {order.product_id?.price || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div>
        {container === "wishlist" && (
          <button
            onClick={handleRemove}
            className="text-[#9D9D9D] cursor-pointer hover:text-red-500"
            aria-label="Remove from wishlist"
          >
            <Trash2 />
          </button>
        )}
      </div>
    </div>
  );
}

export default WishListContainer;