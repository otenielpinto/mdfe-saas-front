import { FileCheck, Clock, BarChart2, Shield, Truck, Zap } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <FileCheck className="h-12 w-12 text-blue-600" />,
      title: "Emissão Rápida e Fácil",
      description:
        "Emita MDF-e em poucos cliques, com interface intuitiva e processo simplificado para agilizar sua operação.",
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Conformidade Garantida",
      description:
        "Mantenha-se em dia com a legislação fiscal, com atualizações automáticas conforme as mudanças regulatórias.",
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-blue-600" />,
      title: "Monitoramento em Tempo Real",
      description:
        "Acompanhe o status de todos os seus documentos fiscais e receba alertas sobre pendências ou problemas.",
    },
    {
      icon: <Truck className="h-12 w-12 text-blue-600" />,
      title: "Gestão de Frota Integrada",
      description:
        "Integre dados de veículos e motoristas automaticamente, eliminando a necessidade de digitação manual.",
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "Economia de Tempo",
      description:
        "Reduza em até 80% o tempo gasto com a emissão e gestão de documentos fiscais de transporte.",
    },
    {
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: "Acesso em Qualquer Lugar",
      description:
        "Acesse o sistema de qualquer dispositivo, a qualquer momento, garantindo mobilidade para sua operação.",
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Benefícios da Nossa Solução
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Otimize sua operação de transporte com uma plataforma completa para
          gestão de MDF-e
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
