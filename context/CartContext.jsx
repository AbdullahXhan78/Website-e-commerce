'use client';

import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // ✅ Clear cart on refresh (DEV ONLY)
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            localStorage.removeItem('cart');
            setCart([]);
        }
    }, []);

    // ✅ Load cart from localStorage if data exists
    useEffect(() => {
        const localCart = localStorage.getItem('cart');
        if (localCart) setCart(JSON.parse(localCart));
    }, []);

    // ✅ Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // ✅ Add item to cart
    const addToCart = useCallback((product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);

            if (exists) {
                toast.success('Cart updated ✅');
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // ✅ Ensure image has full URL for payment gateways etc.
            const absoluteImageUrl = product.image?.startsWith('http')
                ? product.image
                : `${window.location.origin}${product.image || '/placeholder.png'}`;

            const newItem = {
                id: product.id,
                name: product.name || 'Unnamed Product',
                image: absoluteImageUrl,
                price: typeof product.price === 'number' ? product.price : 0,
                quantity: 1,
            };

            toast.success('Added to cart 🛒');
            return [...prev, newItem];
        });
    }, []);

    // ✅ Remove item from cart
    const removeFromCart = useCallback((id) => {
        setCart((prev) => {
            const updatedCart = prev.filter((product) => product.id !== id);
            toast.error('Removed from cart ❌');
            return updatedCart;
        });
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// ✅ Custom hook to use cart
export const useCart = () => useContext(CartContext);