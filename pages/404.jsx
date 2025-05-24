import Link from 'next/link';
import Image from 'next/image';
import notFoundImg from '../public/404-illustration.jpg'; // Optional image

export default function Custom404() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
            <h1 className="text-5xl font-bold text-blue-600">404</h1>
            <p className="mt-3 text-xl font-semibold text-gray-800">Page Not Found</p>
            <p className="mt-2 text-gray-600">
            The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="my-6">
            <Image
                src="/404-illustration.jpg" // Or another image path you have in public/
                alt="Page not found"
                width={400}
                height={250}
                className="mx-auto"
            />
            </div>

            <Link
            href="/"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
            Go to Homepage
            </Link>
        </div>
        </div>
    );
}