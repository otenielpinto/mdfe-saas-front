import Head from "next/head";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import SocialProof from "./components/SocialProof";
import ServiceDetails from "./components/ServiceDetails";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>MDF-e SaaS | Facilite sua Gestão de Manifesto Eletrônico</title>
        <meta
          name="description"
          content="Solução completa para gestão de MDF-e. Emita, gerencie e monitore seus Manifestos Eletrônicos de Documentos Fiscais com eficiência e conformidade."
        />
        <meta
          name="keywords"
          content="MDF-e, Manifesto Eletrônico, Documentos Fiscais, Transporte, Logística, SaaS, Gestão de Frota"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <Hero />
        <Benefits />
        <SocialProof />
        <ServiceDetails />
        <FAQ />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
