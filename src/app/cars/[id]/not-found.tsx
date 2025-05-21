import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function CarNotFound() {
  return (
    <Container className="flex flex-col items-center justify-center text-center py-16">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-2">Car Not Found</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Sorry, we couldn't find the car you're looking for. It might have been sold or the link is incorrect.
      </p>
      <Button asChild>
        <Link href="/">Go Back to Listings</Link>
      </Button>
    </Container>
  );
}
