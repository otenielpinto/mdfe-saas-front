"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wand2, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { getMdfeConfig } from "@/actions/actMdfeConfig";
import { getAllMdfeEmitentes } from "@/actions/actMdfeEmitente";
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

export default function NewMdfePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Carregar dados de configuração padrão ao inicializar
  useEffect(() => {
    const loadDefaultConfig = async () => {
      try {
        setIsLoading(true);

        let [configResponse, emitenteResponse] = await Promise.all([
          getMdfeConfig(),
          getAllMdfeEmitentes(),
        ]);

        if (configResponse.success && configResponse.data) {
          const config = configResponse.data;

          // Mapear dados de configuração para o formato do formulário
          const defaultFormData: any = {
            dados: {
              cUF: config.cUF?.toString() || "",
              tpEmit: config.tpEmit?.toString() || "1",
              tpTransp: config.tpTransp?.toString() || "1",
              tpAmb: config.tpAmb?.toString() || "2",
              tpEmis: "1",
              mod: config.mod?.toString() || "58",
              serie: config.serie?.toString() || "1",
              numero: "",
              cMDF: "",
              cDV: "",
              dhEmi: new Date().toISOString().split("T")[0],
              tpModal: config.modal?.toString() || "1",
              ufIni: config.UFIni || "",
              ufFim: config.UFFim || "",
              dhIniViagem: "",
              infMunCarrega:
                config.infMunCarrega && config.infMunCarrega.length > 0
                  ? config.infMunCarrega
                  : [{ cMunCarrega: "", xMunCarrega: "" }],
              infPercurso:
                config.infPercurso && config.infPercurso.length > 0
                  ? config.infPercurso.map((p: any) => p.UFPer).join(", ")
                  : "",
            },
            rodoviario: {
              // Campos do veículo
              codigoAgregacao: config.codigoAgregacao || "",
              placaVeiculo: config.placaVeiculo || "",
              renavam: config.renavam || "",
              tara: config.tara || "",
              capacidadeKG: config.capacidadeKG || "",
              capacidadeM3: config.capacidadeM3 || "",
              tpCar: config.tpCar || "",
              tpRod: config.tpRod || "",

              // Campos do motorista
              condutores: [
                { xNome: config.xNome || "", cpf: config.cpf || "" },
              ],
            },
            informacoes_dos_documentos: {
              municipioCarregamento: config.municipioCarregamento || "",
              municipioDescarregamento: config.municipioDescarregamento || "",
            },
            informacoes_adicionais: {},
          };

          // Se houver emitentes disponíveis, preencher com o primeiro emitente
          if (
            emitenteResponse.success &&
            emitenteResponse.data &&
            Array.isArray(emitenteResponse.data) &&
            emitenteResponse.data.length > 0
          ) {
            const primeiroEmitente = emitenteResponse.data[0];

            defaultFormData.emitente = {
              CNPJ: primeiroEmitente.cpfcnpj || "",
              IE: primeiroEmitente.ie || "",
              xNome: primeiroEmitente.razao_social || "",
              xFant: primeiroEmitente.fantasia || "",
              enderEmit: {
                xLgr: primeiroEmitente.logradouro || "",
                nro: primeiroEmitente.numero || "",
                xCpl: primeiroEmitente.complemento || "",
                xBairro: primeiroEmitente.bairro || "",
                cMun: primeiroEmitente.codigo_municipio?.toString() || "",
                xMun: primeiroEmitente.nome_municipio || "",
                CEP: primeiroEmitente.cep || "",
                UF: primeiroEmitente.uf || "",
                fone: primeiroEmitente.telefone || "",
                email: primeiroEmitente.email || "",
              },
            };

            toast({
              title: "Dados carregados",
              description: `Configuração e emitente "${primeiroEmitente.razao_social}" carregados com sucesso.`,
            });
          } else {
            toast({
              title: "Configuração carregada",
              description:
                "Dados padrão do MDFe foram carregados. Nenhum emitente encontrado.",
            });
          }
          setFormData(defaultFormData);

          console.log("Configuração padrão carregada:", defaultFormData);
        } else {
          console.log("Nenhuma configuração encontrada, usando valores padrão");
          // Definir valores padrão mínimos se não houver configuração
          const defaultFormData: any = {
            dados: {
              cUF: "",
              tpEmit: "1",
              tpTransp: "1",
              tpAmb: "2",
              tpEmis: "1",
              mod: "58",
              serie: "1",
              numero: "",
              cMDF: "",
              cDV: "",
              dhEmi: new Date().toISOString().split("T")[0],
              tpModal: "1",
              ufIni: "",
              ufFim: "",
              dhIniViagem: "",
              infMunCarrega: [{ cMunCarrega: "", xMunCarrega: "" }],
              infPercurso: "",
            },
          };

          // Tentar preencher emitente mesmo sem configuração
          if (
            emitenteResponse.success &&
            emitenteResponse.data &&
            Array.isArray(emitenteResponse.data) &&
            emitenteResponse.data.length > 0
          ) {
            const primeiroEmitente = emitenteResponse.data[0];

            defaultFormData.emitente = {
              CNPJ: primeiroEmitente.cpfcnpj || "",
              IE: primeiroEmitente.ie || "",
              xNome: primeiroEmitente.razao_social || "",
              xFant: primeiroEmitente.fantasia || "",
              enderEmit: {
                xLgr: primeiroEmitente.logradouro || "",
                nro: primeiroEmitente.numero || "",
                xCpl: primeiroEmitente.complemento || "",
                xBairro: primeiroEmitente.bairro || "",
                cMun: primeiroEmitente.codigo_municipio?.toString() || "",
                xMun: primeiroEmitente.nome_municipio || "",
                CEP: primeiroEmitente.cep || "",
                UF: primeiroEmitente.uf || "",
                fone: primeiroEmitente.telefone || "",
                email: primeiroEmitente.email || "",
              },
            };

            toast({
              title: "Emitente carregado",
              description: `Emitente "${primeiroEmitente.razao_social}" carregado com sucesso.`,
            });
          }

          setFormData(defaultFormData);
        }
      } catch (error) {
        console.error("Erro ao carregar configuração:", error);
        toast({
          title: "Erro",
          description:
            "Erro ao carregar configuração padrão. Usando valores padrão.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDefaultConfig();
  }, []);

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
    setFormData((prev: any) => ({ ...prev, [stepName]: stepData }));
    console.log(`Dados do passo "${steps[currentStep]}":`, stepData);

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

  const handleEmit = async () => {
    console.log("Emitindo MDF-e com os seguintes dados:", formData);
    // setFormData({});
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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Carregando configuração padrão...
              </p>
            </div>
          </div>
        ) : (
          <>
            {currentStep === 0 && (
              <MdfeDadosForm
                onSubmit={handleSubmitStep}
                initialData={formData?.dados || {}}
              />
            )}
            {currentStep === 1 && (
              <MdfeEmitenteForm
                onSubmit={handleSubmitStep}
                initialData={formData?.emitente || {}}
              />
            )}
            {currentStep === 2 && (
              <MdfeRodoviarioForm
                onSubmit={handleSubmitStep}
                initialData={formData?.rodoviario || {}}
              />
            )}
            {currentStep === 3 && (
              <MdfeAquaviarioForm onSubmit={handleSubmitStep} />
            )}
            {currentStep === 4 && (
              <MdfeDocumentosForm
                onSubmit={handleSubmitStep}
                initialData={formData?.informacoes_dos_documentos || {}}
              />
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
          </>
        )}
      </div>
    </div>
  );
}
