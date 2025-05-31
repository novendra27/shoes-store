import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { rupiahFormatter } from "@/lib/utils";
import { ShoppingBag, ShoppingCart, Star, Truck } from 'lucide-react';
import { useState } from 'react';

interface Props {
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
    },
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Detail Produk',
        href: '#',
    },
];

export default function DetailProduct({ product }: Props) {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${product.title} - Detail Produk`} />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex">
                        {/* Gambar Produk */}
                        <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
                            <div className="w-full max-w-md">
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.title}
                                    className="w-full h-auto object-contain max-h-[400px]"
                                />
                            </div>
                        </div>

                        {/* Detail Produk */}
                        <div className="md:w-1/2 p-8">
                            {/* Kategori */}
                            <div className="inline-block bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                {product.category.name}
                            </div>

                            {/* Judul Produk */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>

                            {/* Rating (Contoh) */}
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    <Star className="fill-current h-5 w-5" />
                                    <Star className="fill-current h-5 w-5" />
                                    <Star className="fill-current h-5 w-5" />
                                    <Star className="fill-current h-5 w-5" />
                                    <Star className="fill-current h-5 w-5" />
                                </div>
                                <span className="ml-2 text-gray-600 text-sm">(25 Ulasan)</span>
                            </div>

                            {/* Harga */}
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-gray-900">
                                    {rupiahFormatter.format(product.price)}
                                </span>
                                <span className="ml-2 text-lg line-through text-gray-500">
                                    {rupiahFormatter.format(product.price * 1.2)}
                                </span>
                                <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                                    Hemat 20%
                                </span>
                            </div>

                            {/* Deskripsi Produk */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Stok */}
                            <div className="mb-4">
                                <span className="text-sm text-gray-700">
                                    Stok: <span className="font-semibold">{product.stock}</span> tersisa
                                </span>
                            </div>

                            {/* Pengiriman */}
                            <div className="flex items-center mb-6 text-sm text-gray-700">
                                <Truck className="h-4 w-4 mr-2" />
                                Pengiriman cepat 1-3 hari kerja
                            </div>

                            {/* Jumlah */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Jumlah</h3>
                                <div className="flex items-center">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="bg-gray-100 text-gray-700 px-4 py-2">{quantity}</span>
                                    <button
                                        onClick={increaseQuantity}
                                        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300"
                                        disabled={quantity >= product.stock}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Button
                                    className="flex items-center justify-center bg-white border-2 border-lime-500 text-lime-700 hover:bg-lime-50 hover:text-lime-800 py-3 rounded-xl"
                                    size="lg"
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" /> Checkout
                                </Button>
                                <Button
                                    className="flex items-center justify-center bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-xl"
                                    size="lg"
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" /> Masukkan Keranjang
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}