import {
  Truck,
  LayoutDashboard,
  Bell,
  FileText,
  Users,
  Database,
  Smartphone,
  Cloud,
  Shield,
} from "lucide-react";
import Image from "next/image";

export default function ServiceDetails() {
  const features = [
    {
      icon: <LayoutDashboard className="h-8 w-8 text-blue-600" />,
      title: "Dashboard Intuitivo",
      description:
        "Visualize todos os seus documentos, status e pendências em um painel completo e fácil de usar.",
    },
    {
      icon: <Bell className="h-8 w-8 text-blue-600" />,
      title: "Alertas e Notificações",
      description:
        "Receba alertas sobre documentos pendentes, rejeitados ou próximos do vencimento.",
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Emissão Simplificada",
      description:
        "Processo de emissão de MDF-e otimizado, com preenchimento automático de dados recorrentes.",
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Gestão de Veículos",
      description:
        "Cadastre e gerencie sua frota com facilidade, mantendo todos os dados necessários para emissão.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Controle de Motoristas",
      description:
        "Mantenha os dados dos motoristas organizados e atualizados para agilizar a emissão de documentos.",
    },
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: "Integração com ERPs",
      description:
        "Conecte-se facilmente com os principais sistemas de gestão empresarial do mercado.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: "Acesso Mobile",
      description:
        "Acesse e gerencie seus documentos de qualquer lugar através do seu smartphone ou tablet.",
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-600" />,
      title: "Armazenamento Seguro",
      description:
        "Todos os seus documentos são armazenados com segurança na nuvem, com backup automático.",
    },
  ];

  return (
    <section id="funcionalidades" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Funcionalidades Completas
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Nossa plataforma oferece todas as ferramentas necessárias para uma
          gestão eficiente de MDF-e
        </p>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg h-full flex items-center justify-center">
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src="/dashboard-preview.svg"
                  alt="Dashboard da plataforma MDF-e"
                  width={600}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.slice(4).map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg h-full flex items-center justify-center">
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src="/mobile-preview.svg"
                  alt="Versão mobile da plataforma MDF-e"
                  width={600}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
