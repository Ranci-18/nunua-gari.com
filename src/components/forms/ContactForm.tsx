'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/schema';
import { handleContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect, startTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';

const initialState: {
  message: string;
  errors?: { [key: string]: string[] | undefined };
  success: boolean;
} = {
  message: '',
  errors: {},
  success: false,
};

export function ContactForm() {
  const [state, formAction] = useActionState(handleContactForm, initialState);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredContactMethod: 'email',
      message: '',
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      form.reset();
    } else if (state.message && !state.success) {
      toast({
        title: "Error",
        description: state.message || "An unexpected error occurred. Please check the form for details.",
        variant: "destructive",
      });

      if (state.errors) {
        for (const fieldName in state.errors) {
          if (Object.prototype.hasOwnProperty.call(form.getValues(), fieldName)) {
            const messages = state.errors[fieldName as keyof ContactFormData];
            if (messages && messages.length > 0) {
              form.setError(fieldName as keyof ContactFormData, {
                type: 'server',
                message: messages[0],
              });
            }
          }
        }
      }
    }
  }, [state, toast, form]);

  const onSubmit = async (data: ContactFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><User className="h-4 w-4 text-accent" />Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" />Email Address (Optional)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+254 712 345 678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredContactMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Preferred Contact Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="email" id="contact-email" />
                    </FormControl>
                    <FormLabel htmlFor="contact-email" className="font-normal">
                      Email
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="phone" id="contact-phone" />
                    </FormControl>
                    <FormLabel htmlFor="contact-phone" className="font-normal">
                      Phone
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-accent" />Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message or inquiry..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}
