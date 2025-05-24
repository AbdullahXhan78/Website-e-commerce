import '../app/globals.css';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
    return (
        <CartProvider>
        <WishlistProvider>
            
            <Component {...pageProps} />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </WishlistProvider>
        </CartProvider>
    );
}