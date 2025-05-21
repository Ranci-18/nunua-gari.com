
import { getCars } from '@/lib/data';
import { CarCard } from '@/components/cars/CarCard';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import type { Car } from '@/types';

// Icons for "Why Choose Us" section
const QualityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent mx-auto mb-4"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
const TransparencyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent mx-auto mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);
const CustomerFocusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent mx-auto mb-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);


export default async function HomePage() {
  const allCars: Car[] = await getCars();
  const featuredCars = allCars.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
            <Image 
                src="https://placehold.co/1920x800.png" // General automotive background
                alt="Abstract background of car shapes" 
                layout="fill" 
                objectFit="cover"
                priority
                data-ai-hint="abstract automotive pattern"
             />
        </div>
        <Container className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
            Your Journey To The Perfect Car Starts Here
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-foreground max-w-3xl mx-auto">
            Discover an exceptional selection of quality pre-owned vehicles. Transparent pricing, trusted service, and your dream car await at Premium Auto.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/listings">Explore Our Cars</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Vehicles Section */}
      {featuredCars.length > 0 && (
        <Container className="py-12 md:py-16" id="featured-listings">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Featured Vehicles
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Handpicked deals and popular models you might like.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </Container>
      )}
      
      {/* Why Choose Us Section */}
      <section className="bg-card py-12 md:py-16 border-y">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Why Choose Premium Auto?
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Your trusted partner in finding the perfect vehicle.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border rounded-lg shadow-md bg-background hover:shadow-lg transition-shadow">
              <QualityIcon />
              <h3 className="text-xl font-semibold mb-2 text-primary">Quality Assured</h3>
              <p className="text-muted-foreground">Every vehicle undergoes rigorous inspection to ensure top quality and reliability for your peace of mind.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-background hover:shadow-lg transition-shadow">
              <TransparencyIcon />
              <h3 className="text-xl font-semibold mb-2 text-primary">Transparent Pricing</h3>
              <p className="text-muted-foreground">No hidden fees. Enjoy straightforward, fair pricing and great value on all our listed cars.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-background hover:shadow-lg transition-shadow">
              <CustomerFocusIcon />
              <h3 className="text-xl font-semibold mb-2 text-primary">Customer Focused</h3>
              <p className="text-muted-foreground">Our dedicated team is here to guide you through every step, ensuring a smooth car buying journey.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Message if no featured cars and no other cars either */}
      {allCars.length === 0 && (
          <Container className="py-12 md:py-16">
            <p className="text-center text-muted-foreground text-lg py-10">
                No cars available at the moment. Please check back later.
            </p>
          </Container>
      )}
       {/* Optional: Add a section to encourage visiting all listings if there are more cars than featured */}
      {allCars.length > featuredCars.length && (
        <Container className="py-12 md:py-16 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                See All Our Vehicles
            </h2>
            <p className="mt-3 text-md text-muted-foreground">
                We have more cars available. Click below to see them all.
            </p>
            <Button size="lg" asChild className="mt-6 shadow-lg hover:shadow-primary/30 transition-shadow">
                <Link href="/listings">View All Listings</Link>
            </Button>
        </Container>
      )}
    </>
  );
}

// Revalidate this page every 60 seconds (or as needed)
export const revalidate = 60;
