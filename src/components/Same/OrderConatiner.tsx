import { Circle, Trash2} from "lucide-react";
import React from "react";

type orderProps = {
  order: any;
  container: string;
};
function OrderConatiner({ order, container }: orderProps) {
  return (
    <div
      className={` flex flex-col md:flex-row justify-between ${
        container === "wishlist" ? "items-center" : "items-start"
      } w-full py-6 px-4 border-2 border-[#E4E4E4] rounded-sm `}>
      <div className="flex items-center space-x-8">
        <div>
          <img className="w-[65px]" src={order?.pic} alt="order-cover-image" />
        </div>
        <div>
          <p className="text-lg">{order?.title}</p>
          <p className="text-[#9D9D9D] text-xs">{order?.author}</p>
          <div className="mt-1 flex items-center space-x-2">
            <p className="font-semibold">Rs. {order?.price}</p>
            <p className="text-[#878787] text-xs line-through">Rs. 2000</p>
          </div>
        </div>
      </div>
      <div>
        {container === "myOrder" && (
          <div>
            <div className="flex items-center space-x-2 ">
            <Circle className="text-[#26A541] fill-current" size={16} />
              <p className="text-sm text-[#0A0102] font-semibold">
                Order placed on May 21
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderConatiner;