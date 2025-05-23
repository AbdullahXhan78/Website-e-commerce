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
        <nav className="sticky top-0 z-50 bg-white shadow-md py-4 px-6">
            <div className="container mx-auto flex justify-between items-center relative">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-blue-600">
                DaisyNursing
            </Link>

            {/* ✅ Search Bar */}
            <div className="hidden md:block w-full max-w-md px-4">
                <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 rounded-full border border-gray-300 bg-gray-100 text-black text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
                {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Navigation Links */}
            <div
                className={`md:flex md:items-center space-y-2 md:space-y-0 md:space-x-6 absolute md:static bg-white top-[60px] left-0 w-full md:w-auto p-6 md:p-0 z-50 transition-all duration-300 ${
                menuOpen ? "block" : "hidden md:block"
                }`}
            >
                <Link href="/" className="block text-gray-800 hover:text-blue-600">
                Home
                </Link>
                <Link
                href="/wishlist"
                className="block text-gray-800 hover:text-blue-600"
                >
                Wishlist ❤️ ({wishlist.length})
                </Link>
                <Link
                href="/cart"
                className="block text-gray-800 hover:text-blue-600"
                >
                Cart 🛒 ({totalCartItems})
                </Link>
            </div>
            </div>
        </nav>

        {/* 🔍 Search Results Section */}
        <div className="max-w-4xl mx-auto mt-4 px-4">
            {search.trim() !== "" && (
            <div className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2">
                Search Results for: <span className="text-blue-600">{search}</span>
                </h2>
                {filteredProducts.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                    <li key={product.id} className="border p-3 rounded shadow-sm">
                        <img
                        src={product.image}
                        alt={product.title}
                        className="h-40 w-full object-cover rounded"
                        />
                        <h3 className="text-md font-bold mt-2">{product.title}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <p className="text-blue-600 font-semibold">
                        ₹{product.price.toLocaleString()}
                        </p>
                    </li>
                    ))}
                </ul>
                ) : (
                <p className="text-red-500">No products found.</p>
                )}
            </div>
            )}
        </div>
        </>
    );
}