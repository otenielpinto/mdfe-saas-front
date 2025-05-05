import { ArrowRight, Truck } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
      <div className="container mx-auto px-4 md:flex md:items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Facilite sua Gestão de MDF-e com Nossa Solução SaaS
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-300">
            Garanta eficiência, praticidade e conformidade com a legislação em
            sua operação de transporte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#contato"
              className="inline-flex items-center justify-center bg-white text-blue-700 font-bold py-3 px-6 rounded-md text-lg hover:bg-gray-100 transition duration-300 animate-fade-in-up animation-delay-600"
            >
              Teste Grátis
              <ArrowRight className="ml-2" />
            </a>
            <a
              href="#funcionalidades"
              className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-3 px-6 rounded-md text-lg hover:bg-white hover:bg-opacity-10 transition duration-300 animate-fade-in-up animation-delay-700"
            >
              Saiba Mais
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-full max-w-md h-64 md:h-80">
            <div className="absolute inset-0 flex items-center justify-center">
              <Truck className="w-24 h-24 md:w-32 md:h-32 text-white opacity-20" />
            </div>
            <Image
              src="/truck-logistics.svg"
              alt="Ilustração de logística e transporte"
              width={500}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
