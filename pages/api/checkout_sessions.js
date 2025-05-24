import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
        console.log("📥 API received cart:", req.body);

        const lineItems = req.body.map(item => {
            const imageUrl = item.image?.startsWith('http')
            ? item.image
            : `${req.headers.origin}${item.image || '/placeholder.png'}`;

            return {
            price_data: {
                currency: 'usd',
                product_data: {
                name: item.name || "Unnamed Product",
                images: [imageUrl],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity || 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cart`,
        });

        return res.status(200).json({ url: session.url });

        } catch (error) {
        console.error("❌ Stripe session error:", error);
        return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
