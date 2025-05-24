'use client';

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
    const { toggleWishlist, isInWishlist } = useWishlist?.() || {};

    const isWished = isInWishlist?.(product.id);

    return (
        <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md group transition-all duration-300 border border-gray-200">
            {/* ❤️ Wishlist Button */}
            {toggleWishlist && (
                <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Toggle Wishlist"
                    className="absolute top-2 right-2 z-10 text-xl text-gray-400 hover:text-red-500 transition"
                >
                    {isWished ? "❤️" : "🤍"}
                </button>
            )}

            {/* 📦 Product Link */}
            <Link href={`/products/${product.id}`} className="block group">
                <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>

                <div className="p-4">
                    {/* 📌 Title */}
                    <h2 className="text-md md:text-lg font-semibold text-gray-800 line-clamp-1 mb-1">
                        {product.title}
                    </h2>

                    {/* 📝 Description */}
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                    </p>

                    {/* 💲 Price */}
                    <p className="mt-2 text-indigo-600 font-bold text-md">
                        ${ (product.price / 100).toFixed(2) }
                    </p>
                </div>
            </Link>
        </div>
    );
}