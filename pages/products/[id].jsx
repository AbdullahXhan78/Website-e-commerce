import { useRouter } from 'next/router';
import { products } from '../../data/products';
import ReviewSection from '../../components/ReviewSection';
import { useCart } from '../../context/CartContext'; // 🛒 Cart context

export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useCart();

    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <p className="text-gray-600 text-lg">Loading product...</p>
            </div>
        );
    }

    const handleBuyNow = () => {
        addToCart(product);
        router.push('/cart');
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 py-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">

                {/* Product Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="rounded-xl shadow-lg w-full h-auto object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
                    <p className="text-md text-gray-600 leading-relaxed">{product.description}</p>

                    <p className="mt-4 text-xl font-semibold text-blue-600">
                        ${ (product.price / 100).toFixed(2) }
                    </p>

                    <button
                        onClick={handleBuyNow}
                        className="mt-6 w-max bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-2 rounded shadow"
                    >
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 max-w-4xl mx-auto">
                <ReviewSection productId={product.id} />
            </div>
        </div>
    );
}