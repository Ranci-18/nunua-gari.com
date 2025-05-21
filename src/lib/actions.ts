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
  console.log('To: admin@autolist.com');
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


// Admin Car Actions
export async function createCarAction(prevState: any, formData: FormData) {
  const rawFormData = {
    ...Object.fromEntries(formData.entries()),
    features: formData.getAll('features[]'), // Handle array fields
    images: formData.getAll('images[]'),
  };
  
  const validatedFields = carSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the car details.',
      success: false,
    };
  }

  try {
    await addCar(validatedFields.data as Omit<Car, 'id' | 'createdAt' | 'updatedAt'>); // Type assertion might be needed if schema differs slightly from Car type.
    revalidatePath('/admin/cars');
    revalidatePath('/'); // Revalidate home page listings
    // redirect('/admin/cars'); // Cannot redirect here due to useFormState
    return { message: 'Car created successfully!', success: true, errors: {}, carId: null, redirectPath: '/admin/cars' };

  } catch (error) {
    console.error('Create car error:', error);
    return { message: 'Failed to create car. Please try again.', success: false, errors: {} };
  }
}

export async function updateCarAction(id: string, prevState: any, formData: FormData) {
  const rawFormData = {
    ...Object.fromEntries(formData.entries()),
    features: formData.getAll('features[]'),
    images: formData.getAll('images[]'),
  };
  
  const validatedFields = carSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
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
    revalidatePath(`/cars/${id}`); // Revalidate public car detail page
    revalidatePath('/'); // Revalidate home page listings
    // redirect(`/admin/cars/edit/${id}`); // Cannot redirect here due to useFormState
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
    revalidatePath('/'); // Revalidate home page listings
    // Potentially revalidate individual car page if it still exists or redirect
    // For simplicity, we are not handling the case where a deleted car page is visited.
    // A real app might redirect or show a "deleted" message.
    return { success: true, message: 'Car deleted successfully.' };
  } catch (error) {
    console.error('Delete car error:', error);
    return { success: false, message: 'Failed to delete car. Please try again.' };
  }
}
