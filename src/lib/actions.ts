
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { carSchema, contactSchema } from './schema';
import type { CarFormData, ContactFormData } from './schema';
import { addCar, updateCar, deleteCar, getCarById, addContactMessage, markContactMessageReadStatus, deleteContactMessage } from './data';
import type { Car, ContactFormDataForDb, ContactMessageDb } from '@/types';


export async function handleContactForm(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  // Log the raw form data received by the server action
  console.log("Contact Form - Raw Data Received by Server Action:", JSON.stringify(rawFormData, null, 2));

  // Log each field individually as strings, which is what Zod will parse
  console.log("--- Individual Field Values for Zod Validation ---");
  console.log("Name from form:", rawFormData.name);
  console.log("Email from form:", rawFormData.email);
  console.log("Phone from form:", rawFormData.phone);
  console.log("Preferred Contact Method from form:", rawFormData.preferredContactMethod);
  console.log("Message from form:", rawFormData.message);
  console.log("--------------------------------------------------");
  console.log(`Preferred Contact Method: ${rawFormData.preferredContactMethod}, Type: ${typeof rawFormData.preferredContactMethod}`);

  const validatedFields = contactSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    // Log the detailed Zod validation errors
    console.error("Contact Form Validation Errors:", JSON.stringify(validatedFields.error.flatten().fieldErrors, null, 2));
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
      success: false,
    };
  }

  try {
    const dataForDb: ContactFormDataForDb = {
      name: validatedFields.data.name,
      phone: validatedFields.data.phone,
      preferredContactMethod: validatedFields.data.preferredContactMethod,
      message: validatedFields.data.message,
    };
    if (validatedFields.data.email) { 
      dataForDb.email = validatedFields.data.email;
    }

    await addContactMessage(dataForDb);
    revalidatePath('/admin/messages'); 
    return { message: 'Thank you for your message! We have received it and will get back to you soon.', success: true, errors: {} };

  } catch (error) {
    console.error('Contact form submission error:', error);
    return { message: 'An unexpected error occurred while saving your message. Please try again.', success: false, errors: {} };
  }
}

// Helper function to extract array data from FormData based on react-hook-form's naming convention (e.g., images.0, images.1)
function extractArrayFromFormData(formData: FormData, baseName: string): string[] {
  const array: string[] = [];
  let i = 0;
  while (true) {
    const value = formData.get(`${baseName}.${i}`);
    if (value === null) { 
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
  console.log("Create Car - Processed Form Data for Validation:", JSON.stringify(processedFormData, null, 2));

  const validatedFields = carSchema.safeParse(processedFormData);

  if (!validatedFields.success) {
    console.error("Create Car - Validation Errors:", JSON.stringify(validatedFields.error.flatten().fieldErrors, null, 2));
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
  console.log("Update Car - Processed Form Data for Validation:", JSON.stringify(processedFormData, null, 2));


  const validatedFields = carSchema.safeParse(processedFormData);

  if (!validatedFields.success) {
     console.error("Update Car - Validation Errors:", JSON.stringify(validatedFields.error.flatten().fieldErrors, null, 2));
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
