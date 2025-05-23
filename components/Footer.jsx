import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">


            {/* Right - Contact / Social */}
            <div>
            <h3 className="font-semibold mb-2">Get in Touch</h3>
            <p className="text-sm text-gray-300">
                Contact: <a href="mailto:support@daisynursing.com" className="underline">support@daisynursing.com</a>  
            </p>
            <p className="text-center text-sm mt-2">
                Copyright © 2025 Daisy Nursing School
            </p>
            </div>

        </div>
        </footer>
    );
    }