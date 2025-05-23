"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext"; // Optional: Wishlist useContext

export default function ProductCard({ product }) {
    const { toggleWishlist, isInWishlist } = useWishlist?.() || {};

    return (
        <div className="border rounded-lg p-3 hover:shadow-md transition-all relative group">

        {/* Wishlist button (top-right corner) */}
        {toggleWishlist && isInWishlist && (
            <button
            className="absolute top-2 right-2 z-10 text-red-500 text-xl"
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle Wishlist"
            >
            {isInWishlist(product.id) ? "❤️" : "🤍"}
            </button>
        )}

        {/* Link to product details */}
        <Link href={`/products/${product.id}`} className="block">
            <div className="relative w-full h-60 overflow-hidden rounded-md">
            <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
            />
            </div>

            <h2 className="mt-3 text-lg font-semibold line-clamp-1">{product.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            <p className="mt-1 font-bold">${(product.price / 100).toFixed(2)}</p>
        </Link>
        </div>
    );
}