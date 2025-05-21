
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { carSchema, contactSchema } from './schema';
import type { CarFormData, ContactFormData } from './schema';
import { addCar, updateCar, deleteCar, getCarById } from './data';
import type { Car } from '@/types';

// Simulate sending an email for contact form
async function sendEmail(data: ContactFormData) {
  console.log('Simulating email sending:');
  console.log('To: admin@premiumauto.com');
  console.log('Subject: New Contact Form Submission');
  console.log('Body:', data);
  // In a real app, you'd use an email service like SendGrid, Resend, etc.
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return { success: true, message: "Email sent successfully (simulated)." };
}

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
    // Here you would typically send an email or save to a database
    const emailResult = await sendEmail(validatedFields.data);
    if (emailResult.success) {
      return { message: 'Thank you for your message! We will get back to you soon.', success: true, errors: {} };
    } else {
      return { message: 'Failed to send message. Please try again later.', success: false, errors: {} };
    }
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
    // If value is a File, String(value) might not be what we want, but schema expects string URLs for images
    // and string features. For this app, we assume string values.
    i++;
  }
  return array;
}


// Admin Car Actions
export async function createCarAction(prevState: any, formData: FormData) {
  const imagesFromForm = extractArrayFromFormData(formData, 'images')
    .map(img => String(img).trim())
    .filter(img => img !== ''); // Filter empty strings

  const featuresFromForm = extractArrayFromFormData(formData, 'features')
    .map(feat => String(feat).trim())
    .filter(feat => feat !== ''); // Filter empty strings

  const processedFormData = {
    make: formData.get('make') as string || '',
    model: formData.get('model') as string || '',
    year: formData.get('year') as string || '', // Zod will coerce
    price: formData.get('price') as string || '', // Zod will coerce
    mileage: formData.get('mileage') as string || '', // Zod will coerce
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
    .filter(img => img !== ''); // Filter empty strings

  const featuresFromForm = extractArrayFromFormData(formData, 'features')
    .map(feat => String(feat).trim())
    .filter(feat => feat !== ''); // Filter empty strings
  
  const processedFormData = {
    make: formData.get('make') as string || '',
    model: formData.get('model') as string || '',
    year: formData.get('year') as string || '', // Zod will coerce
    price: formData.get('price') as string || '', // Zod will coerce
    mileage: formData.get('mileage') as string || '', // Zod will coerce
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
    const updated = await updateCar(id, validatedFields.data);
    if (!updated) {
      return { message: 'Car not found or failed to update.', success: false, errors: {} };
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

export async function deleteCarAction(id: string) {
  try {
    const carToDelete = await getCarById(id);
    if (!carToDelete) {
      return { success: false, message: 'Car not found.' };
    }

    await deleteCar(id);
    revalidatePath('/admin/cars');
    revalidatePath('/'); 
    revalidatePath('/listings'); 
    return { success: true, message: 'Car deleted successfully.' };
  } catch (error) {
    console.error('Delete car error:', error);
    return { success: false, message: 'Failed to delete car. Please try again.' };
  }
}
