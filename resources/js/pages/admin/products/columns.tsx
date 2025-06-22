"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link } from "@inertiajs/react"

export type Product = {
  id: string
  title: string
  description: string
  price: number
  stock: number
  image: string | null
  category: {
    name: string
  }
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: ({ row }) => {
      const index = row.index + 1

      return <div className="font-medium">{index}</div>
    },
  },
  {
    accessorKey: 'title',
    header: 'Nama Produk',
  },
  {
    accessorKey: 'category.name',
    header: 'Kategori',
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
  },
  {
    accessorKey: 'price',
    header: 'Harga',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(price);
      return <div className="font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'stock',
    header: 'Stok',
  },
  {
    accessorKey: 'image',
    header: 'Gambar',
    cell: ({ row }) => {
      const title = row.original.title
      const image = row.original.image
      const imageUrl = image ? `/storage/${image}` : '/assets/images/placeholder.png'
      return <img src={imageUrl} alt={title} className="h-16 w-16 rounded object-cover" />
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const product = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Button asChild variant={"ghost"}>
                <Link href={route('products.edit', product.id)}>
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Button asChild variant={"ghost"}>
                <Link method="delete" href={route('products.destroy', product.id)}>
                  <Trash2 className="h-4 w-4" /> Hapus
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]