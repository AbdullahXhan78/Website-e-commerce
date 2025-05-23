'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { stripePromise } from '../utils/stripe';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CartPage() {
    const { cart, removeFromCart } = useCart();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            console.log("🛒 Sending to checkout API: ", cart);

            const res = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart),
            });

            const data = await res.json();
            console.log("🎟️ Stripe Checkout session:", data);

            if (data?.url) {
            // ✅ Fallback that ALWAYS works
            window.location.href = data.url;
            } else {
            console.error("❌ No Stripe session URL returned:", data);
            alert("Stripe session not created.");
            }
        } catch (err) {
            console.error("🔥 Checkout error:", err);
            alert("Something went wrong while starting checkout.");
        } finally {
            setLoading(false);
        }
        };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
        

        <main className="flex-1 container mx-auto p-6">
            {cart.length === 0 ? (
            <h1 className="text-2xl font-bold">Your Cart is Empty 🛒</h1>
            ) : (
            <>
                <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>

                <div className="space-y-4">
                {cart.map((item) => (
                    <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                    >
                    <div className="flex items-center gap-4">
                        <img src={item.image} width={80} height={80} alt={item.name} />
                        <div>
                        <h2 className="font-semibold">{item.name}</h2>
                        <p>Qty: {item.quantity}</p>
                        <p>${(item.price * item.quantity / 100).toFixed(2)}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:underline"
                    >
                        Remove
                    </button>
                    </div>
                ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-bold">
                    Total: ${(total / 100).toFixed(2)}
                </p>
                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Redirecting..." : "Checkout with Stripe"}
                </button>
                </div>
            </>
            )}
        </main>

        
        </div>
    );
}