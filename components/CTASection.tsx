import { useState } from "react";
import { Send, Check, ArrowRight } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para processar o envio do formulário
    console.log("Formulário submetido:", { name, email, company, phone });
    setEmail("");
    setName("");
    setCompany("");
    setPhone("");
    alert("Obrigado pelo seu interesse! Entraremos em contato em breve.");
  };

  const plans = [
    {
      name: "Básico",
      price: "R$ 99,90",
      period: "/mês",
      features: [
        "Até 50 MDF-e por mês",
        "Dashboard básico",
        "Suporte por e-mail",
        "Armazenamento por 5 anos",
        "1 usuário",
      ],
      cta: "Comece Grátis",
      popular: false,
    },
    {
      name: "Profissional",
      price: "R$ 199,90",
      period: "/mês",
      features: [
        "Até 200 MDF-e por mês",
        "Dashboard completo",
        "Suporte prioritário",
        "Integrações com ERPs",
        "Até 5 usuários",
      ],
      cta: "Teste 15 Dias Grátis",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Personalizado",
      period: "",
      features: [
        "MDF-e ilimitados",
        "API completa",
        "Suporte 24/7",
        "Integrações customizadas",
        "Usuários ilimitados",
      ],
      cta: "Fale com Consultor",
      popular: false,
    },
  ];

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Planos que se adaptam ao seu negócio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para sua operação de transporte e comece a
            otimizar sua gestão de MDF-e hoje mesmo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300 ${
                plan.popular ? "border-2 border-blue-500 relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white py-1 px-4 absolute top-0 right-0 rounded-bl-lg text-sm font-semibold">
                  Mais Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center mb-2">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#form-contato"
                  className={`block text-center py-2 px-4 rounded-md font-semibold transition duration-300 ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          id="form-contato"
          className="bg-blue-700 text-white rounded-xl overflow-hidden shadow-xl"
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">
                Fale com um especialista
              </h3>
              <p className="mb-6">
                Preencha o formulário e nossa equipe entrará em contato para
                oferecer uma demonstração personalizada para sua empresa.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-2 rounded-md text-gray-900"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2 rounded-md text-gray-900"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block mb-1">
                    Empresa
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Nome da sua empresa"
                    className="w-full px-4 py-2 rounded-md text-gray-900"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-1">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-2 rounded-md text-gray-900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-700 px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300 font-semibold flex items-center justify-center"
                >
                  Solicitar Demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
            <div className="md:w-1/2 bg-blue-800 p-8 md:p-12 flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Por que escolher nossa solução?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1" />
                    <span>Implementação rápida e sem complicações</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1" />
                    <span>Suporte técnico especializado e ágil</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1" />
                    <span>Atualizações automáticas conforme a legislação</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1" />
                    <span>
                      Economia de tempo e redução de erros operacionais
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-1" />
                    <span>Acesso de qualquer lugar, a qualquer momento</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="mb-2">Ou entre em contato diretamente:</p>
                  <a
                    href="https://wa.me/5551998664776?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20solução%20de%20MDF-e."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
