'use client';

import { createContext, useContext, useState, useEffect } from 'react';


const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) setWishlist(JSON.parse(stored));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product) => {
        const exists = wishlist.find((item) => item.id === product.id);
        if (exists) {
        setWishlist((prev) => prev.filter((item) => item.id !== product.id));
        } else {
        setWishlist((prev) => [...prev, product]);
        }
    };

    const isInWishlist = (id) => wishlist.some((item) => item.id === id);

    return (
        <WishlistContext.Provider
        value={{ wishlist, toggleWishlist, isInWishlist }}
        >
        {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);