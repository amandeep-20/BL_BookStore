import React, { useState, useEffect } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { addBookReviews } from '../../utils/API.js';

function FeedbackForm({ bookId, onReviewSubmitted }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (submitStatus && submitStatus.includes("success")) {
            const timer = setTimeout(() => {
                setSubmitStatus(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    const handleSubmit = async () => {
        if (!rating || !reviewComment.trim()) {
            setSubmitStatus("Please provide both a rating and a review.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await addBookReviews(reviewComment, rating, bookId);
            console.log(response)
            // Create a new review object with the assumed structure
            const newReview = {
                _id: response._id || Date.now().toString(), // Use response ID if available, else temporary ID
                user_id: {
                    fullName: "Current User", // This should ideally come from auth context or API response
                },
                rating: rating,
                comment: reviewComment
            };

            // Call the callback to update parent component immediately
            onReviewSubmitted(newReview);

            // Reset form
            setRating(0);
            setReviewComment("");
            setSubmitStatus("Review submitted successfully!");
        } catch (error) {
            setSubmitStatus("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg">Customer Feedback</p>
            <div className="flex flex-col rounded-sm gap-2 bg-[#F5F5F5] p-4">
                <p className="text-xs font-semibold">Overall rating</p>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                            className="cursor-pointer text-xl"
                        >
                            {star <= (hover || rating) ? (
                                <IoStarSharp className="text-[#FFD700]" />
                            ) : (
                                <IoStarOutline className="text-[#707070]" />
                            )}
                        </span>
                    ))}
                </div>
                <textarea
                    className="w-full h-24 p-2 placeholder:text-sm"
                    placeholder="Write your review"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    disabled={isSubmitting}
                ></textarea>
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className={`w-24 py-1 rounded-sm text-white text-sm transition ${
                            isSubmitting 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-[#3371B5] hover:bg-[#2A5C94]"
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
                {submitStatus && (
                    <p className={`text-sm mt-2 ${submitStatus.includes("success") ? "text-green-600" : "text-red-600"}`}>
                        {submitStatus}
                    </p>
                )}
            </div>
        </div>
    );
}

export default FeedbackForm;