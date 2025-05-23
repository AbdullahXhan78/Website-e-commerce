'use client';

import { useState } from 'react';
import { products as allProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const uniqueCategories = [...new Set(allProducts.map(p => p.category))];

export default function HomePage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);

    const filteredProducts = allProducts
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .filter(p => (selectedCategory ? p.category === selectedCategory : true))
        .filter(p => (maxPrice > 0 ? p.price <= maxPrice : true));

    return (
        <div className="container mx-auto p-6">

            

            {/* 📂 Category Filter */}
            <select
                className="mb-4 p-2 border rounded w-40 text-black"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {/* 💲 Price Filter */}
            <input
                type="range"
                min="0"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
            />
            <p className="text-sm text-gray-700">
                Max Price: ${(maxPrice / 100).toFixed(2)}
            </p>

            {/* 🛍 Product Grid */}
            {filteredProducts.length === 0 ? (
                <p className="mt-4 text-red-500">No products matching your filters.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
