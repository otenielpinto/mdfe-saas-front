import Link from "next/link";
import {
  Truck,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Truck className="h-6 w-6 mr-2 text-blue-400" />
              <h3 className="text-xl font-bold">
                <span className="text-blue-400">MDF-e</span>
                <span>SaaS</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Solução completa para gestão de Manifesto Eletrônico de Documentos
              Fiscais para empresas de transporte.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#beneficios"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Benefícios
                </Link>
              </li>
              <li>
                <Link
                  href="#funcionalidades"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Funcionalidades
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Planos e Preços
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">›</span> Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  Documentação
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  Status do Sistema
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  Rua Alberto Beier, 31
                  <br />
                  Sapiranga, RS
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <a
                  href="tel:+5551998664776"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  (51) 99866-4776
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <a
                  href="mailto:oteniel.pinto@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  oteniel.pinto@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} MDF-e SaaS. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
