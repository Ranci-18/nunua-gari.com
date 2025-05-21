import { z } from 'zod';

export const carSchema = z.object({
  make: z.string().min(2, { message: "Make must be at least 2 characters." }),
  model: z.string().min(1, { message: "Model is required." }),
  year: z.coerce.number().int().min(1900, { message: "Year must be 1900 or later." }).max(new Date().getFullYear() + 1, { message: `Year cannot be more than ${new Date().getFullYear() + 1}.` }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  mileage: z.coerce.number().int().min(0, { message: "Mileage must be non-negative." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  images: z.array(z.string().url({ message: "Each image must be a valid URL." })).min(1, { message: "At least one image is required."}).max(5, { message: "Maximum 5 images allowed."}),
  features: z.array(z.string().min(1)).optional().default([]),
  engine: z.string().min(2, { message: "Engine details are required." }),
  transmission: z.string().min(2, { message: "Transmission type is required." }),
  fuelType: z.string().min(2, { message: "Fuel type is required." }),
  exteriorColor: z.string().min(2, { message: "Exterior color is required." }),
  interiorColor: z.string().min(2, { message: "Interior color is required." }),
  vin: z.string().length(17, { message: "VIN must be 17 characters." }).regex(/^[A-HJ-NPR-Z0-9]{17}$/, { message: "Invalid VIN format." }),
});

export type CarFormData = z.infer<typeof carSchema>;


export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional().refine(val => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
    message: "Invalid phone number format."
  }),
  preferredContactMethod: z.enum(['email', 'phone'], { required_error: "Please select a preferred contact method."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
