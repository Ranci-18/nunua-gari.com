
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { carSchema, contactSchema } from './schema';
import type { CarFormData, ContactFormData } from './schema';
import { addCar, updateCar, deleteCar, getCarById, addContactMessage, markContactMessageReadStatus, deleteContactMessage } from './data';
import type { Car } from '@/types';


export async function handleContactForm(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = contactSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
      success: false,
    };
  }

  try {
    // Instead of sending an email, we save to DB
    await addContactMessage(validatedFields.data);
    // No revalidation needed for public pages on contact form submission
    return { message: 'Thank you for your message! We have received it.', success: true, errors: {} };

  } catch (error) {
    console.error('Contact form submission error:', error);
    return { message: 'An unexpected error occurred. Please try again.', success: false, errors: {} };
  }
}

// Helper function to extract array data from FormData based on react-hook-form's naming convention (e.g., images.0, images.1)
function extractArrayFromFormData(formData: FormData, baseName: string): string[] {
  const array: string[] = [];
  let i = 0;
  while (true) {
    const value = formData.get(`${baseName}.${i}`);
    if (value === null) { // formData.get returns null if key doesn't exist, indicating end of array
      break;
    }
    if (typeof value === 'string') {
        array.push(value);
    }
    i++;
  }
  return array;
}


// Admin Car Actions
export async function createCarAction(prevState: any, formData: FormData) {
  const imagesFromForm = extractArrayFromFormData(formData, 'images')
    .map(img => String(img).trim())
    .filter(img => img !== '');

  const featuresFromForm = extractArrayFromFormData(formData, 'features')
    .map(feat => String(feat).trim())
    .filter(feat => feat !== '');

  const processedFormData = {
    make: formData.get('make') as string || '',
    model: formData.get('model') as string || '',
    year: formData.get('year') as string || '',
    price: formData.get('price') as string || '',
    mileage: formData.get('mileage') as string || '',
    description: formData.get('description') as string || '',
    engine: formData.get('engine') as string || '',
    transmission: formData.get('transmission') as string || '',
    fuelType: formData.get('fuelType') as string || '',
    exteriorColor: formData.get('exteriorColor') as string || '',
    interiorColor: formData.get('interiorColor') as string || '',
    vin: formData.get('vin') as string || '',
    images: imagesFromForm,
    features: featuresFromForm,
  };

  const validatedFields = carSchema.safeParse(processedFormData);

  if (!validatedFields.success) {
    console.log("Validation Errors (Create):", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the car details.',
      success: false,
    };
  }

  try {
    await addCar(validatedFields.data as Omit<Car, 'id' | 'createdAt' | 'updatedAt'>);
    revalidatePath('/admin/cars');
    revalidatePath('/');
    revalidatePath('/listings');
    return { message: 'Car created successfully!', success: true, errors: {}, carId: null, redirectPath: '/admin/cars' };

  } catch (error) {
    console.error('Create car error:', error);
    return { message: 'Failed to create car. Please try again.', success: false, errors: {} };
  }
}

export async function updateCarAction(id: string, prevState: any, formData: FormData) {
  const imagesFromForm = extractArrayFromFormData(formData, 'images')
    .map(img => String(img).trim())
    .filter(img => img !== '');

  const featuresFromForm = extractArrayFromFormData(formData, 'features')
    .map(feat => String(feat).trim())
    .filter(feat => feat !== '');

  const processedFormData = {
    make: formData.get('make') as string || '',
    model: formData.get('model') as string || '',
    year: formData.get('year') as string || '',
    price: formData.get('price') as string || '',
    mileage: formData.get('mileage') as string || '',
    description: formData.get('description') as string || '',
    engine: formData.get('engine') as string || '',
    transmission: formData.get('transmission') as string || '',
    fuelType: formData.get('fuelType') as string || '',
    exteriorColor: formData.get('exteriorColor') as string || '',
    interiorColor: formData.get('interiorColor') as string || '',
    vin: formData.get('vin') as string || '',
    images: imagesFromForm,
    features: featuresFromForm,
  };

  const validatedFields = carSchema.safeParse(processedFormData);

  if (!validatedFields.success) {
     console.log("Validation Errors (Update):", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the car details.',
      success: false,
    };
  }

  try {
    const updatedCar = await updateCar(id, validatedFields.data as Partial<Omit<Car, 'id' | 'createdAt' | 'updatedAt'>>);
    if (!updatedCar) {
      return { message: 'Failed to update car. Car not found.', success: false, errors: {} };
    }
    revalidatePath('/admin/cars');
    revalidatePath(`/admin/cars/edit/${id}`);
    revalidatePath(`/cars/${id}`);
    revalidatePath('/');
    revalidatePath('/listings');
    return { message: 'Car updated successfully!', success: true, errors: {}, carId: id, redirectPath: `/admin/cars/edit/${id}` };
  } catch (error) {
    console.error('Update car error:', error);
    return { message: 'Failed to update car. Please try again.', success: false, errors: {} };
  }
}

export async function deleteCarAction(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const success = await deleteCar(id);
    if (success) {
      revalidatePath('/admin/cars');
      revalidatePath('/');
      revalidatePath('/listings');
      return { success: true, message: 'Car deleted successfully.' };
    }
    return { success: false, message: 'Failed to delete car. Car not found.' };
  } catch (error) {
    console.error('Delete car error:', error);
    return { success: false, message: 'Failed to delete car. An unexpected error occurred.' };
  }
}

// Contact Message Admin Actions
export async function toggleMessageReadStatusAction(id: string, currentStatus: boolean): Promise<{ success: boolean; message: string }> {
  try {
    const success = await markContactMessageReadStatus(id, !currentStatus);
    if (success) {
      revalidatePath('/admin/messages');
      return { success: true, message: `Message marked as ${!currentStatus ? 'read' : 'unread'}.` };
    }
    return { success: false, message: 'Failed to update message status.' };
  } catch (error) {
    console.error('Toggle message read status error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function deleteMessageAction(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const success = await deleteContactMessage(id);
    if (success) {
      revalidatePath('/admin/messages');
      return { success: true, message: 'Message deleted successfully.' };
    }
    return { success: false, message: 'Failed to delete message.' };
  } catch (error)
    {
    console.error('Delete message error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
