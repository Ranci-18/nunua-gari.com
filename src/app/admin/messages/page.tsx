
import { getContactMessages } from '@/lib/data';
import { MessagesDataTable } from '@/components/admin/MessagesDataTable';
import { MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Manage Messages - Admin Panel - Premium Auto',
  description: 'View and manage contact messages.',
};

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <MessageSquare className="h-6 w-6" /> Manage Contact Messages
          </h1>
          <p className="text-muted-foreground">
            Here you can view and manage messages submitted through the contact form.
          </p>
        </div>
      </div>
      <MessagesDataTable messages={messages} />
    </div>
  );
}

// Revalidate this page frequently as data might change
export const revalidate = 5; // 5 seconds, or adjust as needed
