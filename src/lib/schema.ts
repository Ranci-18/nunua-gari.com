
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
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional().refine(val => {
    if (!val) return true; // Optional field, so empty is fine
    const phoneNumberWithoutSpaces = val.replace(/\s+/g, ''); // Remove all whitespace
    return /^\+?[1-9]\d{1,14}$/.test(phoneNumberWithoutSpaces);
  }, {
    message: "Invalid phone number format. It should start with '+' and country code, or be a local number. Spaces are allowed."
  }),
  preferredContactMethod: z.enum(['email', 'phone'], { required_error: "Please select a preferred contact method."}),
  message: z.string().min(1, { message: "Message is required." }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
