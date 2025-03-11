import React from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";

const reviews = [
  {
    id: 1,
    name: "Aniket Chile",
    rating: 3,
    review:
      "Good product. Even though the translation could have been better, Chanakya's neeti are thought-provoking. Chanakya has written on many different topics and his writings are succinct.",
  },
  {
    id: 2,
    name: "Shweta Bodkar",
    rating: 4,
    review:
      "Good product. Even though the translation could have been better, Chanakya's neeti are thought-provoking. Chanakya has written on many different topics and his writings are succinct.",
  },
];

function Feedback() {
  return (
    <div className="mt-4">
      {reviews.map((review) => (
        <div className="flex gap-3 py-2 items-start" key={review.id}>   
          {/* User Initials */}
          <div className="w-20 h-10 bg-[#F5F5F5] flex items-center justify-center rounded-full">
            <p className="text-[#707070]">
              {review.name.split(" ")[0].charAt(0).toUpperCase()}
              {review.name.split(" ")[1].charAt(0).toUpperCase()}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[#0A0102] font-semibold">{review.name}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-xl">
                  {star <= review.rating ? (
                    <IoStarSharp className="text-[#FFD700]" />
                  ) : (
                    <IoStarOutline className="text-[#707070]" />
                  )}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#707070]">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feedback;