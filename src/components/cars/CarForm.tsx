
'use client';

import { useActionState } from 'react'; // Changed from 'react-dom' and renamed
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { carSchema, type CarFormData } from '@/lib/schema';
import type { Car } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CarFormProps {
  car?: Car | null; // Optional for edit mode
  action: (prevState: any, formData: FormData) => Promise<{
    errors?: any;
    message: string;
    success: boolean;
    carId?: string | null;
    redirectPath?: string;
  }>;
}

const initialState = {
  message: '',
  errors: {},
  success: false,
  carId: null,
  redirectPath: '',
};

export function CarForm({ car, action }: CarFormProps) {
  const [state, formAction] = useActionState(action, initialState); // Renamed here
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: car ? {
      ...car,
      // Ensure features and images are arrays, even if empty from data
      features: car.features || [], 
      images: car.images || [],
    } : {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      description: '',
      images: [''],
      features: [],
      engine: '',
      transmission: '',
      fuelType: '',
      exteriorColor: '',
      interiorColor: '',
      vin: '',
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control: form.control,
    name: "features",
  });
  
  const [newFeature, setNewFeature] = useState('');

  const handleAddFeature = () => {
    if (newFeature.trim() !== '') {
      appendFeature(newFeature.trim());
      setNewFeature('');
    }
  };


  useEffect(() => {
    if (state.success) {
      toast({
        title: car ? "Car Updated!" : "Car Created!",
        description: state.message,
      });
      if (state.redirectPath) {
        router.push(state.redirectPath);
      }
      // form.reset(); // Reset after successful submission for create, or if navigating away
    } else if (state.message && (Object.keys(state.errors || {}).length > 0 || !state.success)) {
       toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form, car, router]);

  const fieldGroups = [
    {
      title: "Basic Information",
      fields: [
        { name: "make", label: "Make", placeholder: "e.g., Toyota" },
        { name: "model", label: "Model", placeholder: "e.g., Camry" },
        { name: "year", label: "Year", type: "number", placeholder: "e.g., 2022" },
        { name: "price", label: "Price (Ksh)", type: "number", placeholder: "e.g., 2500000" },
        { name: "mileage", label: "Mileage (mi)", type: "number", placeholder: "e.g., 15000" },
      ]
    },
    {
      title: "Details & Specifications",
      fields: [
        { name: "engine", label: "Engine", placeholder: "e.g., 2.5L 4-Cylinder" },
        { name: "transmission", label: "Transmission", placeholder: "e.g., Automatic" },
        { name: "fuelType", label: "Fuel Type", placeholder: "e.g., Gasoline" },
        { name: "exteriorColor", label: "Exterior Color", placeholder: "e.g., Silver" },
        { name: "interiorColor", label: "Interior Color", placeholder: "e.g., Black" },
        { name: "vin", label: "VIN", placeholder: "17-character Vehicle ID" },
      ]
    }
  ];

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        {fieldGroups.map(group => (
            <Card key={group.title}>
                <CardHeader>
                    <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    {group.fields.map(f => (
                        <FormField
                            key={f.name}
                            control={form.control}
                            name={f.name as keyof CarFormData}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{f.label}</FormLabel>
                                <FormControl>
                                    <Input type={f.type || 'text'} placeholder={f.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </CardContent>
            </Card>
        ))}
        
        <Card>
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Describe the car in detail..." {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Images</CardTitle><CardDescription>Add up to 5 image URLs.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
            {imageFields.map((field, index) => (
                <FormField
                key={field.id}
                control={form.control}
                name={`images.${index}`}
                render={({ field: imageField }) => (
                    <FormItem>
                    <FormLabel>Image URL {index + 1}</FormLabel>
                    <div className="flex items-center gap-2">
                        <FormControl>
                        <Input placeholder="https://example.com/image.png" {...imageField} />
                        </FormControl>
                        {imageFields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(index)} aria-label="Remove image URL">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        )}
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />
            ))}
            {imageFields.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={() => appendImage('')} className="flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" /> Add Image URL
                </Button>
            )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Features</CardTitle><CardDescription>List notable features.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
            {featureFields.map((field, index) => (
                 <div key={field.id} className="flex items-center gap-2">
                    <Input
                    {...form.register(`features.${index}` as const)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-grow"
                    readOnly // Or make it editable if needed
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)} aria-label="Remove feature">
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            ))}
             <div className="flex items-center gap-2">
                <Input 
                    placeholder="New feature (e.g., Sunroof)" 
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature();}}}
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddFeature} className="flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" /> Add Feature
                </Button>
            </div>
            <FormMessage>{form.formState.errors.features?.message}</FormMessage>
            </CardContent>
        </Card>


        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (car ? 'Saving...' : 'Creating...') : (car ? 'Save Changes' : 'Create Car')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
