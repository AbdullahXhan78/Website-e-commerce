"use client";

import { useState } from "react";
import { products as allProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const uniqueCategories = [...new Set(allProducts.map((p) => p.category))];

export default function HomePage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [maxPrice, setMaxPrice] = useState(0);

    const filteredProducts = allProducts
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
        .filter((p) => (maxPrice > 0 ? p.price <= maxPrice : true));

    return (
        <div className="bg-gray-100 min-h-screen">

           <Navbar/>

            {/* 🔎 Filters Section */}
            <section className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-6">
                    
                    {/* 📂 Category */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded text-gray-700"
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* 💰 Price Slider */}
                    <div className="col-span-2 flex flex-col">
                        <input
                            type="range"
                            min="0"
                            max="3000"
                            step="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full"
                        />
                        <span className="text-sm text-gray-600 mt-1">
                            Max Price: ${(maxPrice / 100).toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* 🛍 Products */}
                {filteredProducts.length === 0 ? (
                    <p className="mt-6 text-red-500 text-center">No products matching your filters.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            <Footer/>
        </div>
    );
}