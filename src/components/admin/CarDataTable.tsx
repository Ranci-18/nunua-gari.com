
'use client';

import type { Car } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { deleteCarAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Image from 'next/image';

interface CarDataTableProps {
  cars: Car[];
}

export function CarDataTable({ cars }: CarDataTableProps) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    const result = await deleteCarAction(id);
    if (result.success) {
      toast({
        title: "Car Deleted",
        description: result.message,
      });
    } else {
      toast({
        title: "Error",
        description: result.message || "Failed to delete car.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-md border shadow-sm bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Make & Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>VIN</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No cars found.
              </TableCell>
            </TableRow>
          )}
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>
                <Image 
                  src={car.images[0] || 'https://placehold.co/100x75.png'} 
                  alt={`${car.make} ${car.model}`} 
                  width={64} 
                  height={48}
                  className="rounded object-cover aspect-[4/3]"
                  data-ai-hint={`${car.make} ${car.model} thumbnail`}
                />
              </TableCell>
              <TableCell className="font-medium">{car.make} {car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell className="text-right">Ksh {car.price.toLocaleString()}</TableCell>
              <TableCell>{car.vin || 'N/A'}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/cars/${car.id}`} target="_blank" className="flex items-center gap-2 cursor-pointer">
                          <Eye className="h-4 w-4" /> View Public
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/cars/edit/${car.id}`} className="flex items-center gap-2 cursor-pointer">
                          <Edit className="h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                            <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the car listing for "{car.make} {car.model}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(car.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
