'use client';

import { useEffect, useState } from 'react';

const ReviewSection = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [form, setForm] = useState({ name: '', comment: '', rating: 5 });

    useEffect(() => {
        const saved = localStorage.getItem(`reviews-${productId}`);
        if (saved) setReviews(JSON.parse(saved));
    }, [productId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReviews = [...reviews, form];
        setReviews(newReviews);
        localStorage.setItem(`reviews-${productId}`, JSON.stringify(newReviews));
        setForm({ name: '', comment: '', rating: 5 });
    };

    return (
        <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>

        {/* List Reviews */}
        <div className="mt-4">
            {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
            ) : (
            reviews.map((r, i) => (
                <div
                key={i}
                className="border border-gray-200 p-4 rounded my-2 bg-gray-50"
                >
                <p className="font-semibold">{r.name} ⭐ {r.rating}/5</p>
                <p className="text-gray-700 mt-1">{r.comment}</p>
                </div>
            ))
            )}
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-2">
            <input
            required
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
            required
            className="w-full border p-2 rounded"
            placeholder="Your thoughts..."
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
            <select
            className="w-full border p-2 rounded"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            >
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Good</option>
            <option value={3}>3 - Average</option>
            <option value={2}>2 - Poor</option>
            <option value={1}>1 - Bad</option>
            </select>
            <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
            >
            Submit Review
            </button>
        </form>
        </div>
    );
};

export default ReviewSection;