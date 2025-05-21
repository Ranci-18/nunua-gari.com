
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
  console.log('--- New Contact Form Submission ---');
  console.log(`Intended Recipient: francisnganga238@gmail.com`);
  console.log(`Subject: New Contact Form Submission from Premium Auto`);
  console.log('Sender Name:', data.name);
  console.log('Sender Email:', data.email);
  console.log('Sender Phone:', data.phone || 'Not provided');
  console.log('Preferred Contact:', data.preferredContactMethod);
  console.log('Message:', data.message);
  console.log('------------------------------------');

  // IMPORTANT: To send actual emails, you need to integrate an email service.
  // 1. Choose a service (e.g., Resend, SendGrid, AWS SES).
  // 2. Install their SDK (e.g., `npm install resend`).
  // 3. Get an API Key and set it as an environment variable (e.g., RESEND_API_KEY).
  // 4. Replace the simulation below with actual email sending code.

  // Example placeholder for Resend integration:
  /*
  if (process.env.RESEND_API_KEY) {
    try {
      // const { Resend } = await import('resend'); // Assumes 'resend' is installed
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // await resend.emails.send({
      //   from: 'Premium Auto Contact <noreply@yourdomain.com>', // Replace with your sending domain
      //   to: 'francisnganga238@gmail.com',
      //   subject: `New Contact from ${data.name} - Premium Auto`,
      //   html: `<p>Name: ${data.name}</p>
      //          <p>Email: ${data.email}</p>
      //          <p>Phone: ${data.phone || 'N/A'}</p>
      //          <p>Preferred Contact: ${data.preferredContactMethod}</p>
      //          <p>Message: ${data.message}</p>`,
      // });
      // return { success: true, message: "Message sent successfully!" };
    } catch (emailError) {
      // console.error("Email sending error:", emailError);
      // return { success: false, message: "Failed to send message via email service."};
    }
  }
  */

  // Fallback to simulation if no email service is configured
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const simulationMessage = "Message logged to server console (simulation). Integrate an email service for actual delivery.";
  console.log(simulationMessage);
  return { success: true, message: simulationMessage };
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
    const emailResult = await sendEmail(validatedFields.data);
    if (emailResult.success && emailResult.message.startsWith("Message sent successfully!")) { // Check for actual success message
      return { message: 'Thank you for your message! We will get back to you soon.', success: true, errors: {} };
    } else if (emailResult.success) { // This means it was simulated
        return { message: emailResult.message, success: true, errors: {} };
    }
     else {
      return { message: emailResult.message || 'Failed to send message. Please try again later.', success: false, errors: {} };
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
