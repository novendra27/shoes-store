import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { columns, Product } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Produk',
        href: '/admin/products',
    },
];

export default function Products({ products }: { products: Product[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4 md:p-8">
                    <h1 className="text-2xl font-semibold">Daftar Produk</h1>
                    <p className="mb-4 text-sm text-gray-500 md:w-2xl">Tambahkan produk anda di sini.</p>
                    <Button asChild className="mb-4">
                        <Link href={route('products.create')}>Tambah Produk</Link>
                    </Button>
                    <DataTable columns={columns} data={products} />
                </div>
            </div>
        </AppLayout>
    )
}