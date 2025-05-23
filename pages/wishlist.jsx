import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist ❤️</h1>
        {wishlist.length === 0 ? (
            <p>No products in wishlist.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        )}
        </div>
    );
}