import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { parseRupiah, rupiahFormatter } from "@/lib/utils";

interface Props {
    product: {
        id: number;
        title: string;
        description: string;
        price: number;
        stock: number;
        image: string;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Produk',
        href: '/admin/products',
    },
    {
        title: 'Edit Produk',
        href: '#',
    },
];

const formSchema = z.object({
    image: z.any().optional(),
    title: z.string().min(1, "Nama produk tidak boleh kosong"),
    description: z.string().min(1, "Deskripsi produk tidak boleh kosong"),
    price: z.number().min(1, "Harga produk tidak boleh kosong"),
    stock: z.number().min(0, "Stok produk tidak boleh kurang dari 0"),
})

export default function EditProduct({ product }: Props) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // Isi form dengan data dari product yang diterima dari controller
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            // Image tidak diisi karena merupakan input file
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Gunakan metode PUT untuk update
        router.post(route('products.update', product.id), {
            _method: 'PUT',
            ...values
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Produk" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4 md:p-8">
                    <h1 className="text-2xl font-semibold">Edit Produk</h1>
                    <div className="mt-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {/* Tampilkan gambar produk yang sudah ada */}
                                <div className="mb-4">
                                    <h3 className="font-medium mb-2">Gambar Produk Saat Ini:</h3>
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.title}
                                        className="w-32 h-32 object-cover rounded-md border"
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gambar Produk</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            field.onChange(file);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <p className="text-sm text-muted-foreground">
                                                Biarkan kosong jika tidak ingin mengubah gambar
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Produk</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Masukkan Nama Produk" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Deskripsi Produk</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Masukkan Deskripsi Produk" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Harga Produk</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Harga Produk"
                                                    {...field}
                                                    value={rupiahFormatter.format(field.value || 0)}
                                                    onChange={(e) => field.onChange(parseRupiah(e.target.value))}
                                                    autoComplete="off"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stok Produk</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Masukkan Stok Produk"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Simpan Perubahan</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}