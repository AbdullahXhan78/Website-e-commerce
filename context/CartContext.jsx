'use client';

import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // ✅ Load from localStorage on mount
    useEffect(() => {
        const localCart = localStorage.getItem('cart');
        if (localCart) setCart(JSON.parse(localCart));
    }, []);

    // ✅ Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // ✅ Add product to cart with fallbacks for Stripe-required data
    const addToCart = useCallback((product) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id);

            if (exists) {
                toast.success('Cart updated ✅');
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // 🛠️ Ensure required fields for Stripe
            const newItem = {
                id: product.id,
                name: product.name || 'Unnamed Product',
                image: product.image || 'https://via.placeholder.com/150',
                price: typeof product.price === 'number' ? product.price : 0,
                quantity: 1
            };

            toast.success('Added to cart 🛒');
            return [...prev, newItem];
        });
    }, []);

    // ✅ Remove product from cart
    const removeFromCart = useCallback((id) => {
        setCart(prev => {
            const updatedCart = prev.filter(product => product.id !== id);
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

// ✅ Hook to use cart context easily in other components
export const useCart = () => useContext(CartContext);