import Link from "next/link";
import { useState } from "react";
import { Menu, X, Truck } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="mr-2 text-blue-600">
            <Truck className="h-8 w-8" />
          </div>
          <div>
            <span className="text-2xl font-bold text-blue-700">MDF-e</span>
            <span className="text-2xl font-bold text-gray-700">SaaS</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="#beneficios"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Benefícios
          </Link>
          <Link
            href="#funcionalidades"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Funcionalidades
          </Link>
          <Link
            href="#faq"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            FAQ
          </Link>

          <Link
            href="/sign-in"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Login
          </Link>

          <Link
            href="#contato"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Teste Grátis
          </Link>
        </nav>
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 shadow-lg absolute w-full">
          <Link
            href="#beneficios"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Benefícios
          </Link>
          <Link
            href="#funcionalidades"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Funcionalidades
          </Link>
          <Link
            href="#faq"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/sign-in"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="#contato"
            className="block px-4 py-2 mx-4 mt-2 mb-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Teste Grátis
          </Link>
        </div>
      )}
    </header>
  );
}
