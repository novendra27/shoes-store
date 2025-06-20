import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { rupiahFormatter } from "@/lib/utils";
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        title: string;
        image: string;
        price: number;
        description: string;
        stock: number;
        category: {
            id: number;
            name: string;
        }
    }
}

interface Props {
    cartItems: CartItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Keranjang',
        href: '#',
    },
];

export default function Cart({ cartItems }: Props) {
    const [isUpdating, setIsUpdating] = useState<number | null>(null);

    // Hitung total harga
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);

    // Update quantity
    const updateQuantity = (cartItemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        setIsUpdating(cartItemId);
        router.put(route('cart.update', cartItemId), {
            quantity: newQuantity
        }, {
            onFinish: () => setIsUpdating(null)
        });
    };

    // Hapus item dari cart
    const removeFromCart = (cartItemId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini dari keranjang?')) {
            router.delete(route('cart.cancel', cartItemId));
        }
    };

    // Checkout semua item
    const handleCheckout = () => {
        // Implementasi checkout - bisa redirect ke halaman checkout
        router.post(route('checkout.store'), {
            cart_items: cartItems.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity
            }))
        });
    };

    if (cartItems.length === 0) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Keranjang Belanja" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="container mx-auto px-4 py-8">
                        {/* Empty Cart State */}
                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <div className="mb-6">
                                <ShoppingBag className="mx-auto h-24 w-24 text-gray-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Anda Kosong</h2>
                            <p className="text-gray-600 mb-8">
                                Belum ada produk di keranjang Anda. Mari mulai berbelanja!
                            </p>
                            <Button 
                                className="bg-lime-500 hover:bg-lime-600 text-white py-3 px-8 rounded-xl"
                                onClick={() => router.get(route('dashboard'))}
                            >
                                Mulai Berbelanja
                            </Button>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keranjang Belanja" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Keranjang Belanja</h1>
                        <p className="text-gray-600">
                            Anda memiliki {cartItems.length} produk dalam keranjang
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="overflow-hidden shadow-md">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src={`/storage/${item.product.image}`}
                                                    alt={item.product.title}
                                                    className="w-full h-full object-contain rounded-lg"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                            {item.product.title}
                                                        </h3>
                                                        <span className="inline-block bg-lime-100 text-lime-800 px-2 py-1 rounded text-xs font-medium">
                                                            {item.product.category.name}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-600 p-1"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                    {item.product.description}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    {/* Price */}
                                                    <div>
                                                        <span className="text-xl font-bold text-gray-900">
                                                            {rupiahFormatter.format(item.product.price)}
                                                        </span>
                                                        <span className="text-sm text-gray-500 ml-2">
                                                            per item
                                                        </span>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1 || isUpdating === item.id}
                                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="px-3 py-1 bg-gray-100 rounded min-w-[40px] text-center">
                                                            {isUpdating === item.id ? '...' : item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= item.product.stock || isUpdating === item.id}
                                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">Subtotal:</span>
                                                        <span className="text-lg font-semibold text-gray-900">
                                                            {rupiahFormatter.format(item.product.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-4">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Ringkasan Pesanan
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                Subtotal ({cartItems.length} produk)
                                            </span>
                                            <span className="font-medium">
                                                {rupiahFormatter.format(totalPrice)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Ongkos Kirim</span>
                                            <span className="font-medium text-green-600">Gratis</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    {rupiahFormatter.format(totalPrice)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleCheckout}
                                        className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-xl font-semibold"
                                        size="lg"
                                    >
                                        <ShoppingBag className="mr-2 h-5 w-5" />
                                        Checkout Sekarang
                                    </Button>

                                    <Button
                                        onClick={() => router.get(route('dashboard'))}
                                        className="w-full mt-3 bg-white border-2 border-lime-500 text-lime-700 hover:bg-lime-50 py-3 rounded-xl font-semibold"
                                        size="lg"
                                    >
                                        Lanjut Berbelanja
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}