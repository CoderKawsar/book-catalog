import React from "react";

interface Review {
  comment: string;
  rating: number;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className="mt-12">
      <h2 className="text-xl mb-3">Reviews:</h2>
      {reviews.map((review, index) => (
        <div key={index} className="mb-2">
          <p>
            Comment: <span className="text-gray-600">{review.comment}</span>
          </p>
          <p>
            Rating: <span className="text-gray-600">{review.rating}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
