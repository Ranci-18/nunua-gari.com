
import { z } from 'zod';

export const carSchema = z.object({
  make: z.string().min(1, { message: "Make is required." }),
  model: z.string().min(1, { message: "Model is required." }),
  year: z.coerce.number().int().min(1900, { message: "Year must be 1900 or later." }).max(new Date().getFullYear() + 1, { message: `Year cannot be more than ${new Date().getFullYear() + 1}.` }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  mileage: z.coerce.number().int().min(0, { message: "Mileage must be non-negative." }),
  description: z.string().min(1, { message: "Description is required." }),
  images: z.array(z.string().url({ message: "Each image must be a valid URL." })).min(1, { message: "At least one image is required."}).max(5, { message: "Maximum 5 images allowed."}),
  features: z.array(z.string().min(1)).optional().default([]),
  engine: z.string().min(1, { message: "Engine details are required." }),
  transmission: z.string().min(1, { message: "Transmission type is required." }),
  fuelType: z.string().min(1, { message: "Fuel type is required." }),
  exteriorColor: z.string().min(1, { message: "Exterior color is required." }),
  interiorColor: z.string().min(1, { message: "Interior color is required." }),
  vin: z.string()
    .refine(val => val === '' || (val.length === 17 && /^[A-HJ-NPR-Z0-9]{17}$/.test(val)), {
      message: "VIN must be 17 characters and follow valid format, or be empty.",
    })
    .optional()
    .default(''),
});

export type CarFormData = z.infer<typeof carSchema>;


export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.preprocess(
    // If the input is an empty string or only whitespace, treat it as undefined
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    // Then, apply the email validation which is optional
    z.string().email({ message: "Please enter a valid email address." }).optional()
  ),
  phone: z.string() // Phone is required
    .min(1, { message: "Phone number is required."}) // Check raw input isn't empty
    .transform(val => val.replace(/[\s()-]/g, '')) // Remove spaces, parentheses, hyphens
    .refine(val => val.length === 0 || /^\+?\d{7,15}$/.test(val), { // Allow empty string post-transform (should not happen if min(1) is on raw) OR valid format
      message: "Please enter a valid phone number (e.g., +254712345678 or 0712345678).",
    }),
  preferredContactMethod: z.enum(['email', 'phone'], { required_error: "Please select a preferred contact method."}),
  message: z.string().min(1, { message: "Message is required." }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// This type is used for database storage and what `addContactMessage` expects
export type ContactFormDataForDb = {
  name: string;
  email?: string; // Email is optional for DB
  phone: string;   // Phone is required for DB
  preferredContactMethod: 'email' | 'phone';
  message: string;
};
