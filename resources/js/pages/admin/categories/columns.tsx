"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link } from "@inertiajs/react"

export type Product = {
  id: string
  name: string
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
    accessorKey: 'name',
    header: 'Nama Kategori',
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
                <Link href={route('categories.edit', product.id)}>
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Button asChild variant={"ghost"}>
                <Link method="delete" href={route('categories.destroy', product.id)}>
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