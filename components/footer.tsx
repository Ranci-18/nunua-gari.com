import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">Premium Auto</h3>
            <p className="mb-4 text-gray-400">Your trusted partner for quality vehicles at competitive prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-gray-400 hover:text-white">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/financing" className="text-gray-400 hover:text-white">
                  Financing
                </Link>
              </li>
              <li>
                <Link href="/trade-in" className="text-gray-400 hover:text-white">
                  Trade-In
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="text-gray-400 hover:text-white">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:text-white">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p>123 Auto Drive</p>
              <p>Car City, ST 12345</p>
              <p className="mt-2">Phone: (555) 123-4567</p>
              <p>Email: info@premiumauto.com</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Premium Auto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
