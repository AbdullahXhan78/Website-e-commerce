"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";

export default function Navbar() {
    const { cart } = useCart();
    const { wishlist } = useWishlist();

    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
         {/* ✅ Custom Header (Fully Styled) */}
            <header className="bg-white shadow-sm py-4 sticky top-0 z-50 border-b">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">

                {/* 🔵 Brand Logo */}
                <h1 className="text-2xl font-bold text-blue-600">DaisyNursing</h1>

                {/* 🔍 Rounded Search Bar */}
                <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 bg-gray-100 text-black border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* 🧭 Stylish Navigation Links */}
                <nav className="flex space-x-6 text-sm md:text-base">
                <a
                    href="/"
                    className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 tracking-wide"
                >
                    Home
                </a>
                <a
                    href="/wishlist"
                    className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 tracking-wide"
                >
                    Wishlist ❤️
                </a>
                <a
                    href="/cart"
                    className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 tracking-wide"
                >
                    Cart 🛒
                </a>
                </nav>
            </div>
            </header>
        </>
    );
}