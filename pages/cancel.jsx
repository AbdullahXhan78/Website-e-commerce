import Link from 'next/link';

export default function CancelPage() {
    return (
        <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Canceled</h1>
        <p className="text-lg text-gray-700 mb-6">
            Your checkout process was cancelled. You can continue shopping below.
        </p>
        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Return to Store
        </Link>
        </div>
    );
}