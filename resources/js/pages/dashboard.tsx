import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Hero Section */}
                <div className="relative flex-1 overflow-hidden bg-lime-300 rounded-4xl m-5 p-5">
                    <div className="mx-auto px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 pt-2 lg:pt-5 items-center">
                            {/* Left Column */}
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold mt-4 md:pt-0 mb-8">
                                    Sepatu Sempurna untuk Setiap Langkah
                                </h1>
                                {/* Mobile-only Illustration */}
                                <div className="block lg:hidden mb-4">
                                    <img src="assets/images/sepatu-hero.png" alt="Gambar Sepatu" className="w-8/12 mx-auto" />
                                </div>
                                <p className="text-base lg:text-lg leading-relaxed mb-8 lg:pr-20">
                                    Toko sepatu kami menyediakan koleksi sepatu berkualitas dan stylish, mulai dari sneakers, boots, hingga sepatu formal, untuk menemani aktivitas Anda dengan nyaman dan penuh gaya.
                                </p>
                                <div className="grid lg:block pb-5">
                                    <Button className="bg-black text-white py-3 lg:py-2 px-5 rounded-2xl" size={'lg'}>
                                        Belanja Sekarang
                                    </Button>
                                </div>
                            </div>
                            {/* Right Column: Desktop-only Illustration */}
                            <div className="hidden lg:block text-right">
                                <img src="assets/images/sepatu-hero.png" alt="Gambar Sepatu" className="w-10/12 inline-block" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header Kategori Section */}
                <div className="container mx-auto ps-4 mt-6 mb-2">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Label Kategori */}
                        <div className="flex-shrink-0 text-center lg:text-left mb-3 lg:mb-0">
                            <span className="inline-block bg-lime-300 text-gray-900 px-4 py-1 rounded-2xl text-2xl font-semibold">
                                Kategori
                            </span>
                        </div>
                        {/* Deskripsi */}
                        <div className="flex-1 text-center lg:text-left ps-5 font-normal">
                            <p className="text-base mb-0">
                                Toko sepatu, kami menawarkan berbagai kategori
                                <br className="hidden lg:block" />
                                untuk memenuhi seluruh kebutuhan dan gaya Anda.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Konten Kategori Section */}
                <div className="relative flex-1 overflow-hidden p-4 w-full">
                    <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-xl mx-auto">
                        <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-3/5">
                                    <div className="p-8 md:p-1">
                                        <Card>
                                            <CardContent className="flex flex-col aspect-square p-4">
                                                <div className="grid grid-cols-1 gap-2 h-full">
                                                    {/* Div 1: Nama Kategori (kiri atas) */}
                                                    <div className="text-left">
                                                        <span className="inline-block bg-lime-300 text-gray-900 px-3 py-1 rounded-xl text-sm font-semibold">
                                                            Kategori {index + 1}
                                                        </span>
                                                    </div>
                                                    {/* Div 2: Gambar */}
                                                    <div className="flex-grow flex items-center justify-center min-h-[150px]">
                                                        <img
                                                            src={`assets/images/sepatu-${(index % 5) + 1}.png`}
                                                            alt={`Sepatu Kategori ${index + 1}`}
                                                            className="max-h-[150px] object-contain"
                                                        />
                                                    </div>
                                                    {/* Div 3: Button */}
                                                    <div className="flex justify-center mt-auto">
                                                        <Button className="bg-lime-400 text-gray-900 font-bold hover:bg-lime-600 rounded-xl w-full" size="sm" >
                                                            Lihat Detail
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {/* Header Best Seller Section */}
                <div className="container mx-auto ps-4 mt-6 mb-2">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Label Best Seller */}
                        <div className="flex-shrink-0 text-center lg:text-left mb-3 lg:mb-0">
                            <span className="inline-block bg-lime-300 text-gray-900 px-4 py-1 rounded-2xl text-2xl font-semibold">
                                Best Seller
                            </span>
                        </div>
                        {/* Deskripsi */}
                        <div className="flex-1 text-center lg:text-left ps-5 font-normal">
                            <p className="text-base mb-0">
                                Kumpulan sepatu paling favorit dan paling banyak dibeli oleh pelanggan.
                                <br className="hidden lg:block" />
                                Desain trendy, nyaman dipakai, dan terbukti jadi pilihan terbaik!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Konten Best Seller Section */}
                <div className="container mx-auto px-4 mt-4 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Card key={index} className="h-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="relative">
                                    {/* Badge Best Seller */}
                                    <div className="absolute top-2 right-2 z-10">
                                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Best Seller
                                        </span>
                                    </div>
                                    {/* Gambar Produk */}
                                    <div className="h-48 flex items-center justify-center p-4">
                                        <img
                                            src={`assets/images/sepatu-${(index % 5) + 1}.png`}
                                            alt={`Sepatu Popular ${index + 1}`}
                                            className="h-full object-contain"
                                        />
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    {/* Nama Produk */}
                                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                                        Sepatu Trendy {index + 1} Edition
                                    </h3>

                                    {/* Deskripsi Singkat */}
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        Sepatu nyaman dengan desain modern, cocok untuk aktivitas sehari-hari.
                                    </p>

                                    {/* Harga */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xl font-bold text-gray-900">
                                            Rp {(299000 + index * 50000).toLocaleString('id-ID')}
                                        </span>
                                        {index % 3 === 0 && (
                                            <span className="text-sm line-through text-gray-500">
                                                Rp {(399000 + index * 50000).toLocaleString('id-ID')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Button Checkout */}
                                    <Button className="w-full bg-lime-400 text-gray-900 font-semibold hover:bg-lime-500 rounded-xl">
                                        Checkout
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
