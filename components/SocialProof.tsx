import Image from "next/image";
import { Star } from "lucide-react";

export default function SocialProof() {
  const testimonials = [
    {
      quote:
        "A solução de MDF-e da WTA Connect revolucionou nossa operação logística. Reduzimos o tempo de emissão de documentos em 75% e praticamente eliminamos erros de preenchimento.",
      author: "Carlos Silva",
      position: "Diretor de Logística",
      company: "Transportadora Express",
      image: "/avatar-1.svg",
      stars: 5,
    },
    {
      quote:
        "Desde que implementamos o sistema, conseguimos manter 100% de conformidade com a legislação fiscal. As atualizações automáticas nos mantêm sempre em dia com as mudanças regulatórias.",
      author: "Ana Oliveira",
      position: "Gerente Fiscal",
      company: "Logística Nacional",
      image: "/avatar-2.svg",
      stars: 5,
    },
    {
      quote:
        "O dashboard intuitivo e os alertas em tempo real nos ajudaram a reduzir atrasos e multas. O suporte técnico é excelente, sempre disponível quando precisamos.",
      author: "Roberto Mendes",
      position: "Coordenador de Frota",
      company: "TransBrasil Cargas",
      image: "/avatar-3.svg",
      stars: 4,
    },
  ];

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          O que nossos clientes dizem
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Empresas de transporte de todo o Brasil confiam em nossa solução para
          gestão de MDF-e
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex mb-4">{renderStars(testimonial.stars)}</div>
              <p className="text-lg mb-6 italic text-gray-700">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <span className="font-semibold block">
                    {testimonial.author}
                  </span>
                  <span className="text-gray-600 text-sm block">
                    {testimonial.position}
                  </span>
                  <span className="text-blue-600 text-sm">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Image
              src="/client-logo-1.svg"
              alt="Logo Cliente 1"
              width={120}
              height={40}
              className="grayscale hover:grayscale-0 transition duration-300"
            />
            <Image
              src="/client-logo-2.svg"
              alt="Logo Cliente 2"
              width={120}
              height={40}
              className="grayscale hover:grayscale-0 transition duration-300"
            />
            <Image
              src="/client-logo-3.svg"
              alt="Logo Cliente 3"
              width={120}
              height={40}
              className="grayscale hover:grayscale-0 transition duration-300"
            />
            <Image
              src="/client-logo-4.svg"
              alt="Logo Cliente 4"
              width={120}
              height={40}
              className="grayscale hover:grayscale-0 transition duration-300"
            />
            <Image
              src="/client-logo-5.svg"
              alt="Logo Cliente 5"
              width={120}
              height={40}
              className="grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
          <p className="text-gray-600">
            Mais de 500 empresas de transporte já utilizam nossa plataforma
          </p>
        </div>
      </div>
    </section>
  );
}
