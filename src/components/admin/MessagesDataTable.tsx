
'use client';

import type { ContactMessageDb } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Eye, CheckSquare, Square } from 'lucide-react';
import { deleteMessageAction, toggleMessageReadStatusAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useState }
 from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

interface MessagesDataTableProps {
  messages: ContactMessageDb[];
}

export function MessagesDataTable({ messages }: MessagesDataTableProps) {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageDb | null>(null);

  const handleToggleReadStatus = async (id: string, currentStatus: boolean) => {
    const result = await toggleMessageReadStatusAction(id, currentStatus);
    if (result.success) {
      toast({
        title: "Status Updated",
        description: result.message,
      });
    } else {
      toast({
        title: "Error",
        description: result.message || "Failed to update message status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteMessageAction(id);
    if (result.success) {
      toast({
        title: "Message Deleted",
        description: result.message,
      });
    } else {
      toast({
        title: "Error",
        description: result.message || "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="rounded-md border shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Sender Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No messages found.
                </TableCell>
              </TableRow>
            )}
            {messages.map((msg) => (
              <TableRow key={msg.id} className={!msg.isRead ? 'font-semibold bg-primary/5' : ''}>
                <TableCell>
                  <Badge variant={msg.isRead ? 'secondary' : 'default'}>
                    {msg.isRead ? 'Read' : 'Unread'}
                  </Badge>
                </TableCell>
                <TableCell>{msg.name}</TableCell>
                <TableCell>{msg.email}</TableCell>
                <TableCell>{format(new Date(msg.createdAt), 'PPpp')}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onClick={() => setSelectedMessage(msg)}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Eye className="h-4 w-4" /> View Message
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem
                            onClick={() => handleToggleReadStatus(msg.id, msg.isRead)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {msg.isRead ? <Square className="h-4 w-4" /> : <CheckSquare className="h-4 w-4" />}
                            {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                          </DropdownMenuItem>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                                <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the message from "{msg.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(msg.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    {selectedMessage && selectedMessage.id === msg.id && (
                       <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Message from: {selectedMessage.name}</DialogTitle>
                          <DialogDescription>
                            Email: {selectedMessage.email} {selectedMessage.phone && `| Phone: ${selectedMessage.phone}`} <br />
                            Received: {format(new Date(selectedMessage.createdAt), 'PPpp')} | Preferred Contact: {selectedMessage.preferredContactMethod}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 max-h-[60vh] overflow-y-auto">
                          <p className="text-sm text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                        </div>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={() => setSelectedMessage(null)}>
                                Close
                            </Button>
                        </DialogClose>
                      </DialogContent>
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
