"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wand2, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { MdfeEmitenteForm } from "@/components/mdfe/MdfeEmitenteForm";
import { MdfeDadosForm } from "@/components/mdfe/MdfeDadosForm";
import { MdfeRodoviarioForm } from "@/components/mdfe/MdfeRodoviarioForm";
import { MdfeAquaviarioForm } from "@/components/mdfe/MdfeAquaviarioForm";
import { MdfeDocumentosForm } from "@/components/mdfe/MdfeDocumentosForm";
import { MdfeTotalizadoresForm } from "@/components/mdfe/MdfeTotalizadoresForm";
import { MdfeInformacoesAdicionaisForm } from "@/components/mdfe/MdfeInformacoesAdicionaisForm";

const steps = [
  "Dados",
  "Emitente",
  "Rodoviario",
  "Aquaviario",
  "Informacoes dos Documentos",
  "Totalizadores",
  "Informacoes adicionais",
];

// Mock data for Emitente form
const mockEmitenteData = {
  CNPJ: "12.345.678/0001-90",
  IE: "123456789",
  xNome: "Transportes Brasil LTDA",
  xFant: "TransBrasil",
  enderEmit: {
    xLgr: "Avenida Paulista",
    nro: "1578",
    xCpl: "Andar 15",
    xBairro: "Bela Vista",
    cMun: "3550308", // Código IBGE de São Paulo
    xMun: "São Paulo",
    CEP: "01310-200",
    UF: "SP",
    fone: "(11) 98765-4321",
    email: "contato@transportesbrasil.com.br",
  },
};

export default function NewMdfePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitStep = (stepData: any) => {
    const stepName = steps[currentStep].toLowerCase().replace(/ /g, "_");
    setFormData((prev) => ({ ...prev, [stepName]: stepData }));

    if (currentStep < steps.length - 1) {
      handleNext();
    } else {
      console.log("Formulário completo:", {
        ...formData,
        [stepName]: stepData,
      });
      // Aqui implementaria o envio do formulário completo
    }
  };

  const autoFillEmitente = () => {
    if (currentStep === 1) {
      handleSubmitStep(mockEmitenteData);
    }
  };

  const handleEmit = async () => {
    setFormData({});
    toast({
      title: "MDF-e Emitido",
      description: "O MDF-e foi emitido com sucesso e o rascunho foi removido.",
    });
  };

  return (
    <div className="space-y-6">
      <Link href="/mdfe">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Emitir novo MDF-e</h1>
        <div className="flex gap-2">
          {currentStep === 1 && (
            <Button variant="outline" onClick={autoFillEmitente}>
              <Wand2 className="mr-2 h-4 w-4" />
              Auto preencher
            </Button>
          )}
          <Button onClick={handleEmit}>Emitir</Button>
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2 whitespace-nowrap">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`${
                index === currentStep ? "font-bold" : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && <div className="h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <div className="rounded-md border p-6">
        {currentStep === 0 && <MdfeDadosForm onSubmit={handleSubmitStep} />}
        {currentStep === 1 && <MdfeEmitenteForm onSubmit={handleSubmitStep} />}
        {currentStep === 2 && (
          <MdfeRodoviarioForm onSubmit={handleSubmitStep} />
        )}
        {currentStep === 3 && (
          <MdfeAquaviarioForm onSubmit={handleSubmitStep} />
        )}
        {currentStep === 4 && (
          <MdfeDocumentosForm onSubmit={handleSubmitStep} />
        )}
        {currentStep === 5 && (
          <MdfeTotalizadoresForm onSubmit={handleSubmitStep} />
        )}
        {currentStep === 6 && (
          <MdfeInformacoesAdicionaisForm onSubmit={handleSubmitStep} />
        )}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
