import { useRouter } from 'next/router';
import { products } from '../../data/products';
import ReviewSection from '../../components/ReviewSection';
import { useCart } from '../../context/CartContext'; // 🆕 Import

export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useCart(); // 🆕 Use cart

    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-gray-600 text-lg">Loading product...</p>
            </div>
        );
    }

    const handleBuyNow = () => {
        addToCart(product);         // ✅ Add to cart
        router.push('/cart');       // ✅ Redirect
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <img src={product.image} className="w-full md:w-1/2 h-auto rounded" />
                <div>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="mt-2 text-gray-700">{product.description}</p>
                    <p className="text-lg font-semibold mt-4">${(product.price / 100).toFixed(2)}</p>

                    <button
                        onClick={handleBuyNow}
                        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        Buy Now
                    </button>
                </div>
            </div>

            <ReviewSection productId={product.id} />
        </div>
    );
}
