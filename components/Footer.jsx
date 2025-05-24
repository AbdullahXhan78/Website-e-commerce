import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* 🔵 Brand */}
                    <div>
                    <h2 className="text-xl font-bold text-white mb-2">DaisyNursing</h2>
                    <p className="text-blue-200 text-sm">
                        Trusted nursing resources for students and professionals.
                    </p>
                    </div>

                    {/* 🌐 Quick Links */}
                    <div>
                    <h3 className="text-md font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="text-blue-200 hover:text-white">Home</a></li>
                        <li><a href="/wishlist" className="text-blue-200 hover:text-white">Wishlist</a></li>
                        <li><a href="/cart" className="text-blue-200 hover:text-white">Cart</a></li>
                        <li><a href="/products" className="text-blue-200 hover:text-white">All Products</a></li>
                    </ul>
                    </div>

                    {/* 🎯 Support */}
                    <div>
                    <h3 className="text-md font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-blue-200 hover:text-white">Contact Us</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white">FAQs</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white">Terms of Service</a></li>
                    </ul>
                    </div>

                    {/* 📱 Social Links */}
                    <div>
                    <h3 className="text-md font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <a href="#" className="text-blue-300 hover:text-white" title="Facebook">📘</a>
                        <a href="#" className="text-blue-300 hover:text-white" title="Twitter">🐦</a>
                        <a href="#" className="text-blue-300 hover:text-white" title="Instagram">📸</a>
                        <a href="#" className="text-blue-300 hover:text-white" title="YouTube">▶️</a>
                    </div>
                    </div>

                </div>

                <div className="border-t border-blue-800 text-center py-4 text-blue-200 text-sm">
                    &copy; {new Date().getFullYear()} DaisyNursing. All rights reserved.
                </div>
                </footer>
    );
    }