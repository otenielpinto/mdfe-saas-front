import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "O que é MDF-e e por que minha empresa precisa emitir?",
      answer:
        "O Manifesto Eletrônico de Documentos Fiscais (MDF-e) é um documento fiscal eletrônico obrigatório para operações de transporte de cargas que envolvem mais de um conhecimento de transporte. Ele é exigido pela legislação fiscal brasileira para empresas transportadoras e embarcadores que realizam transporte de cargas com documentação fiscal própria.",
    },
    {
      question:
        "Quanto tempo leva para implementar a solução na minha empresa?",
      answer:
        "A implementação da nossa solução SaaS de MDF-e é rápida, geralmente levando de 1 a 3 dias úteis. Como é uma solução baseada em nuvem, não há necessidade de instalação de software ou hardware adicional. Nosso time de suporte acompanha todo o processo de configuração inicial e treinamento da sua equipe.",
    },
    {
      question: "A plataforma se integra com meu sistema de gestão atual?",
      answer:
        "Sim, nossa solução foi desenvolvida para se integrar facilmente com os principais ERPs e sistemas de gestão do mercado. Temos APIs documentadas e conectores prontos para sistemas como SAP, Totvs, Oracle, Sankhya, entre outros. Caso sua empresa utilize um sistema personalizado, nossa equipe técnica pode desenvolver uma integração específica.",
    },
    {
      question: "Como funciona o modelo de precificação?",
      answer:
        "Trabalhamos com um modelo de assinatura mensal com diferentes planos baseados no volume de documentos emitidos. Oferecemos planos para pequenas, médias e grandes transportadoras, com valores a partir de R$ 99,90 mensais. Todos os planos incluem suporte técnico, atualizações e backup na nuvem. Entre em contato para uma cotação personalizada para sua operação.",
    },
    {
      question: "Quais são os requisitos técnicos para utilizar a plataforma?",
      answer:
        "Por ser uma solução 100% baseada em nuvem, os requisitos são mínimos. Você precisa apenas de um computador ou dispositivo móvel com acesso à internet e um navegador atualizado (Chrome, Firefox, Safari ou Edge). Não é necessário instalar nenhum software adicional ou ter servidores dedicados.",
    },
    {
      question: "Como funciona o suporte técnico?",
      answer:
        "Oferecemos suporte técnico por múltiplos canais: telefone, e-mail, chat e sistema de tickets, disponíveis em horário comercial estendido (8h às 20h). Para clientes dos planos Premium e Enterprise, disponibilizamos suporte 24/7 para questões críticas. Além disso, mantemos uma base de conhecimento completa com tutoriais, vídeos e documentação técnica.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Tire suas dúvidas sobre nossa solução de MDF-e
        </p>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className={`flex justify-between items-center w-full text-left p-4 ${
                  openIndex === index ? "bg-blue-50" : "bg-white"
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <div
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="text-blue-600" />
                </div>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="p-4 pt-0 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
