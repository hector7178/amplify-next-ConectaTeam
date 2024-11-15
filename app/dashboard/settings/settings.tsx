'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import { Input } from '../../../components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Link from 'next/link'





const data: Payment[] = [
  {
    id: "m5gr84i9",
    account:"whatsapp",
    status: "success",
   identificador: "+583695268",
  },
  {
    id: "3u1reuv4",
    account:"Instagram",
    status: "success",
   identificador: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    account:"Messenger",
    status: "processing",
   identificador: "Monserrat44@gmail.com",
  },
 
]
 
type Payment = {
  id: string
  account:String
  status: "pending" | "processing" | "success" | "failed"
  identificador: string
}
 
const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "identificador",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Identificador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("identificador")}</div>,
  },
  {
    accessorKey: "account",
    header: () => <div className="text-left">Cuentas</div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("account")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">

            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem className='text-red-400'>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
function Page() {

    console.log('dataaaaa',data)

  const [sorting, setSorting] =useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
 
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-12 w-full ">
    <div className='basis-1/2 flex flex-col gap-6'>
      <Card x-chunk="dashboard-04-chunk-1" className='w-full h-fit '>
      <CardHeader>
        <CardTitle>Nombre de usuario</CardTitle>
        <CardDescription>
          usado para identificarte en los mensajes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input placeholder="Store Name" />
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="default" className='bg-customColorBg text-white '>Guardar</Button>
      </CardFooter>
    </Card>
    <Card x-chunk="dashboard-04-chunk-2" className=' w-full h-fit '>
      <CardHeader>
        <CardTitle>Correo</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input
            placeholder="Project Name"
            defaultValue="correo@gmail.com"
          />
         
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="default" className='bg-customColorBg text-white '>Guardar</Button>
      </CardFooter>
    </Card>
    </div>
    <Card x-chunk="dashboard-04-chunk-2" className='w-full lg:w-1/4 h-fit basis-1/2'>
      <CardHeader>
        <CardTitle>Cuentas vinculadas</CardTitle>
        
      </CardHeader>
      <CardContent>
      <div className="w-full">
      
       
        <div className="flex items-center py-4">
          <DropdownMenu>
            <div className='flex w-full h-full justify-between flex-row'>
                <Link href={'/dashboard/accounts'}>
                <Button variant="default" className="bg-customColorBg">
                Agregar nueva cuenta
                </Button>
                </Link>
              <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            
            </DropdownMenuTrigger>
            </div>
            
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de {" "}
            {table.getFilteredRowModel().rows.length} columnas seleccionadas.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Soguiente
            </Button>
          </div>
        </div>
      </div>
      </CardContent>
     
    </Card>
  </div>
  )
}

export default Page