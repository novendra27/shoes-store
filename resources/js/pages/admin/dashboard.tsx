import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
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
                                    Selamat Datang, Admin
                                </h1>
                                {/* Mobile-only Illustration */}
                                <div className="block lg:hidden mb-4">
                                    <img src="assets/images/sepatu-hero.png" alt="Gambar Sepatu" className="w-8/12 mx-auto" />
                                </div>
                                <p className="text-base lg:text-lg leading-relaxed mb-8 lg:pr-20">
                                    Tambahkan Produk Anda ke dalam sistem kami dan nikmati kemudahan dalam mengelola inventaris Anda.
                                </p>
                                <div className="grid lg:block pb-5">
                                    <Button asChild className="bg-black text-white py-3 lg:py-2 px-5 rounded-2xl" size={'lg'}>
                                        <Link href={route('products.index')}>Lihat Produk</Link>
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
            </div>
        </AppLayout>
    );
}
