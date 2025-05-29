"use client";

import { useState, useRef, useEffect, useTransition, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Wand2,
  Save,
  Trash2,
  Edit,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

import { getMdfeConfig } from "@/actions/actMdfeConfig";
import { getAllMdfeEmitentes } from "@/actions/actMdfeEmitente";
import { getMdfeById, createMdfe, updateMdfe } from "@/actions/actMdfeEnvio";
import { MdfeEmitenteForm } from "@/components/mdfe/MdfeEmitenteForm";
import { MdfeDadosForm } from "@/components/mdfe/MdfeDadosForm";
import { MdfeRodoviarioForm } from "@/components/mdfe/MdfeRodoviarioForm";
import { MdfeAquaviarioForm } from "@/components/mdfe/MdfeAquaviarioForm";
import { MdfeDocumentosForm } from "@/components/mdfe/MdfeDocumentosForm";
import { MdfeTotalizadoresForm } from "@/components/mdfe/MdfeTotalizadoresForm";
import { MdfeInformacoesAdicionaisForm } from "@/components/mdfe/MdfeInformacoesAdicionaisForm";
import {
  MdfeFormData,
  MdfeFormMode,
  MdfeResponse,
} from "@/types/MdfeEnvioTypes";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { lib } from "@/lib/lib";

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
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode: boolean = Boolean(editId);
  const mode: MdfeFormMode = isEditMode ? "edit" : "create";

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<MdfeFormData | any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMdfe, setIsLoadingMdfe] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  // Optimize loadMdfeForEdit with useCallback to prevent unnecessary re-renders
  const loadMdfeForEdit = useCallback(
    async (id: string) => {
      try {
        setIsLoadingMdfe(true);
        console.log("Loading MDFe for edit, ID:", id);

        const response = await getMdfeById(id);

        if (response.success && response.data) {
          const mdfeData = response.data;

          // Convert and format date fields for form inputs
          const processedData = {
            ...mdfeData,
            dados: {
              ...mdfeData.dados,
              dhEmi: mdfeData.dados?.dhEmi
                ? lib.formatDateForInput(new Date(mdfeData.dados.dhEmi))
                : lib.formatDateForInput(new Date()),
              dtEmi: mdfeData.dados?.dtEmi
                ? new Date(mdfeData.dados.dtEmi)
                : new Date(),
              hora:
                mdfeData.dados?.hora ||
                new Date().toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }),
            },
          };

          setFormData(processedData);

          toast({
            title: "MDFe Carregado",
            description: `MDFe "${
              mdfeData.dados?.numero || mdfeData.id
            }" carregado para edição.`,
          });

          console.log("MDFe data loaded for edit:", processedData);
        } else {
          toast({
            title: "Erro ao carregar MDFe",
            description:
              response.message ||
              "MDFe não encontrado. Redirecionando para modo de criação.",
            variant: "destructive",
          });

          // Fallback to creation mode if MDFe not found
          router.replace("/mdfe/new");
        }
      } catch (error) {
        console.error("Error loading MDFe for edit:", error);
        toast({
          title: "Erro",
          description: "Erro inesperado ao carregar MDFe para edição.",
          variant: "destructive",
        });

        // Fallback to creation mode on error
        router.replace("/mdfe/new");
      } finally {
        setIsLoadingMdfe(false);
      }
    },
    [router, toast]
  );

  // Optimize loadDefaultConfig with useCallback
  const loadDefaultConfig = useCallback(async () => {
    try {
      const [configResponse, emitenteResponse] = await Promise.all([
        getMdfeConfig(),
        getAllMdfeEmitentes(),
      ]);

      if (configResponse.success && configResponse.data) {
        const config = configResponse.data;
        const cMDF = String(Math.floor(Math.random() * 1000000)).padStart(
          8,
          "0"
        );

        const defaultFormData: MdfeFormData = {
          id_empresa: config.id_empresa || 0,
          id_tenant: config.id_tenant || 0,
          id: uuidv4(),
          dt_movto: new Date(),
          dados: {
            cUF: config.cUF?.toString() || "",
            tpEmit: config.tpEmit?.toString() || "1",
            tpTransp: config.tpTransp?.toString() || "1",
            tpAmb: config.tpAmb?.toString() || "2",
            tpEmis: config.tpEmis?.toString() || "1",
            mod: config.mod?.toString() || "58",
            serie: config.serie?.toString() || "1",
            numero: "",
            cMDF: cMDF,
            cDV: "",
            dhEmi: lib.formatDateForInput(new Date()),
            dtEmi: new Date(),
            hora: new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            tpModal: config.modal?.toString() || "1",
            ufIni: config.UFIni || "",
            ufFim: config.UFFim || "",
            dhIniViagem: "",
            indCanalVerde: false,
            indCarregaPosterior: false,
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
            codigoAgregacao: config.codigoAgregacao || "",
            placaVeiculo: config.placaVeiculo || "",
            renavam: config.renavam || "",
            tara: config.tara || "",
            capacidadeKG: config.capacidadeKG || "",
            capacidadeM3: config.capacidadeM3 || "",
            tpCar: config.tpCar || "",
            tpRod: config.tpRod || "",
            condutores: [{ xNome: config.xNome || "", cpf: config.cpf || "" }],
          },
          informacoes_dos_documentos: {
            nfe: [],
            cte: [],
            mdf: [],
          },
          totalizadores: {
            qCTe: "",
            qNFe: "",
            qMDFe: "",
            vCarga: "",
            cUnid: "",
            qCarga: "",
          },
          informacoes_adicionais: {
            infAdFisco: "",
            infCpl: "",
          },
          referencia: {},
          status: "RASCUNHO" as any,
          qrCodMDFe: "",
          chave: "",
          emitente: {
            CNPJ: "",
            IE: "",
            xNome: "",
            xFant: "",
            enderEmit: {
              xLgr: "",
              nro: "",
              xCpl: "",
              xBairro: "",
              cMun: "",
              xMun: "",
              CEP: "",
              UF: "",
              fone: "",
              email: "",
            },
          },
          aquaviario: {
            irin: "",
            nomeEmbarcacao: "",
            codigoEmbarcacao: "",
            balsa: [],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Pre-populate emitente if available
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
            title: "Configuração Carregada",
            description: `Emitente "${primeiroEmitente.razao_social}" pré-carregado.`,
          });
        } else {
          toast({
            title: "Nenhum Emitente Encontrado",
            description:
              "Nenhum emitente cadastrado. Cadastre um emitente antes de continuar.",
            variant: "destructive",
          });
        }

        setFormData(defaultFormData);
        console.log("Default configuration loaded:", defaultFormData);
      } else {
        console.log("No configuration found, using minimal defaults");
        toast({
          title: "Configuração não encontrada",
          description: "Usando configuração padrão mínima.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error loading default config:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar configuração padrão.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Optimized useEffect with proper dependency array and cleanup
  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const loadData = async () => {
      if (!isMounted) return;

      setIsLoading(true);

      try {
        if (isEditMode && editId) {
          await loadMdfeForEdit(editId);
        } else {
          await loadDefaultConfig();
        }
      } catch (error) {
        console.error("Error in data loading:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [editId, isEditMode, loadMdfeForEdit, loadDefaultConfig]); // Add proper dependencies

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
    }
  };

  const handleEmit = async () => {
    if (!formData || Object.keys(formData).length === 0) {
      toast({
        title: "Erro",
        description: "Nenhum dado disponível para processar o MDF-e.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    if (!formData.emitente?.CNPJ) {
      toast({
        title: "Erro de Validação",
        description:
          "Preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    // Validate documents for creation mode
    if (mode === "create") {
      const hasDocuments = () => {
        const docs = formData.informacoes_dos_documentos;
        if (!docs) return false;
        const nfeCount = docs.nfe?.length || 0;
        const cteCount = docs.cte?.length || 0;
        const mdfCount = docs.mdf?.length || 0;
        return nfeCount > 0 || cteCount > 0 || mdfCount > 0;
      };

      if (!hasDocuments()) {
        toast({
          title: "Erro de Validação",
          description:
            "É necessário adicionar pelo menos uma nota fiscal (NF-e, CT-e ou MDF-e) antes de emitir o MDF-e.",
          variant: "destructive",
        });
        return;
      }
    }

    startTransition(async () => {
      try {
        console.log(
          `${isEditMode ? "Updating" : "Creating"} MDFe with data:`,
          formData
        );

        let result: MdfeResponse;

        if (isEditMode && editId) {
          // Update existing MDFe
          const updateData = {
            ...formData,
            dt_movto: new Date(),
            status: "EDITADO",
            updatedAt: new Date(),
          };

          result = await updateMdfe(editId, updateData);

          if (result.success) {
            toast({
              title: "MDF-e Atualizado",
              description:
                result.message ||
                "O MDF-e foi atualizado e emitido com sucesso.",
            });
            router.push("/mdfe");
          } else {
            toast({
              title: "Erro ao atualizar MDF-e",
              description:
                result.message || "Ocorreu um erro ao atualizar o MDF-e.",
              variant: "destructive",
            });
          }
        } else {
          // Create new MDFe
          const createData = {
            ...formData,
            dt_movto: new Date(),
            status: "CRIADO",
          };

          result = await createMdfe(createData);

          if (result.success) {
            toast({
              title: "MDF-e Emitido",
              description: result.message || "O MDF-e foi emitido com sucesso.",
            });
            router.push("/mdfe");
          } else {
            toast({
              title: "Erro ao emitir MDF-e",
              description:
                result.message || "Ocorreu um erro ao emitir o MDF-e.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error(
          `Error ${isEditMode ? "updating" : "creating"} MDFe:`,
          error
        );
        toast({
          title: "Erro",
          description: `Erro inesperado ao ${
            isEditMode ? "atualizar" : "emitir"
          } o MDF-e.`,
          variant: "destructive",
        });
      }
    });
  };

  const handleSaveDraft = async () => {
    if (!formData || Object.keys(formData).length === 0) {
      toast({
        title: "Erro",
        description: "Nenhum dado disponível para salvar.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        console.log(
          `${isEditMode ? "Saving changes to" : "Saving draft of"} MDFe:`,
          formData
        );

        let result: MdfeResponse;

        if (isEditMode && editId) {
          // Save changes to existing MDFe
          const saveData = {
            ...formData,
            status: formData.status || "RASCUNHO",
            updatedAt: new Date(),
          };

          result = await updateMdfe(editId, saveData);

          if (result.success) {
            toast({
              title: "Alterações Salvas",
              description:
                result.message ||
                "As alterações do MDF-e foram salvas com sucesso.",
            });

            // Update local form data with any changes
            if (result.data && !Array.isArray(result.data)) {
              setFormData((prev: any) => ({
                ...prev,
                _id: result.data._id || prev._id,
                updatedAt: result.data.updatedAt || new Date(),
              }));
            }
          } else {
            toast({
              title: "Erro ao salvar alterações",
              description:
                result.message || "Ocorreu um erro ao salvar as alterações.",
              variant: "destructive",
            });
          }
        } else {
          // Save as new draft
          const draftData = {
            ...formData,
            status: "RASCUNHO",
          };

          result = await createMdfe(draftData);

          if (result.success) {
            toast({
              title: "Rascunho Salvo",
              description:
                result.message || "O rascunho do MDF-e foi salvo com sucesso.",
            });

            // Update form data with generated ID
            if (result.data && !Array.isArray(result.data)) {
              setFormData((prev: any) => ({
                ...prev,
                _id: result.data._id,
                id: result.data.id || prev.id,
              }));
            }
          } else {
            toast({
              title: "Erro ao salvar rascunho",
              description:
                result.message || "Ocorreu um erro ao salvar o rascunho.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error(
          `Error ${isEditMode ? "saving changes to" : "saving draft of"} MDFe:`,
          error
        );
        toast({
          title: "Erro",
          description: `Erro inesperado ao ${
            isEditMode ? "salvar alterações" : "salvar rascunho"
          }.`,
          variant: "destructive",
        });
      }
    });
  };

  const isProcessing = isPending || isLoading || isLoadingMdfe;

  return (
    <div className="space-y-6">
      <Link href="/mdfe">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Editar MDF-e" : "Emitir novo MDF-e"}
          </h1>
          {isEditMode && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Edit className="h-3 w-3" />
              Modo Edição
            </Badge>
          )}
          {isLoadingMdfe && (
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Carregando dados...
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isProcessing}
          >
            <Save className="mr-2 h-4 w-4" />
            {isPending
              ? "Salvando..."
              : isEditMode
              ? "Salvar Alterações"
              : "Salvar Rascunho"}
          </Button>
          <Button onClick={handleEmit} disabled={isProcessing}>
            <Wand2 className="mr-2 h-4 w-4" />
            {isPending
              ? isEditMode
                ? "Atualizando..."
                : "Emitindo..."
              : isEditMode
              ? "Atualizar"
              : "Emitir"}
          </Button>
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
        {isLoading || isLoadingMdfe ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                {isLoadingMdfe
                  ? "Carregando dados do MDF-e..."
                  : "Carregando configuração padrão..."}
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
              <MdfeAquaviarioForm
                onSubmit={handleSubmitStep}
                initialData={formData?.aquaviario || {}}
              />
            )}
            {currentStep === 4 && (
              <MdfeDocumentosForm
                onSubmit={handleSubmitStep}
                initialData={formData?.informacoes_dos_documentos || {}}
              />
            )}
            {currentStep === 5 && (
              <MdfeTotalizadoresForm
                onSubmit={handleSubmitStep}
                initialData={formData || {}}
              />
            )}
            {currentStep === 6 && (
              <MdfeInformacoesAdicionaisForm
                onSubmit={handleSubmitStep}
                initialData={formData?.informacoes_adicionais || {}}
              />
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
