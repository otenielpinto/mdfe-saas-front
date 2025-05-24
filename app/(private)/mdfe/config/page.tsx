"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { MdfeConfigData, MunCarrega, Percurso } from "@/types/MdfeConfigTypes";
import { getMdfeConfig, saveMdfeConfig } from "@/actions/actMdfeConfig";
import { useToast } from "@/hooks/use-toast";

export default function MdfeConfigPage() {
  const [formData, setFormData] = useState<MdfeConfigData>({
    cUF: "",
    tpAmb: "",
    tpEmit: "",
    tpTransp: "",
    mod: "58", // Padrão para MDF-e
    serie: "",
    modal: "",
    UFIni: "",
    UFFim: "",
    infMunCarrega: [{ cMunCarrega: "", xMunCarrega: "" }],
    infPercurso: [{ UFPer: "" }],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // React Query para carregar configuração
  const {
    data: configResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mdfe-config"],
    queryFn: getMdfeConfig,
  });

  // Effect para processar dados quando a query é bem-sucedida
  useEffect(() => {
    if (configResponse?.success && configResponse.data) {
      // Mapear os dados retornados para o formato do formulário
      const config = configResponse.data;
      setFormData({
        cUF: config.cUF?.toString() || "",
        tpAmb: config.tpAmb?.toString() || "",
        tpEmit: config.tpEmit?.toString() || "",
        tpTransp: config.tpTransp?.toString() || "",
        mod: config.mod?.toString() || "58",
        serie: config.serie?.toString() || "",
        modal: config.modal?.toString() || "",
        UFIni: config.UFIni || "",
        UFFim: config.UFFim || "",
        infMunCarrega:
          config.infMunCarrega && config.infMunCarrega.length > 0
            ? config.infMunCarrega
            : [{ cMunCarrega: "", xMunCarrega: "" }],
        infPercurso:
          config.infPercurso && config.infPercurso.length > 0
            ? config.infPercurso
            : [{ UFPer: "" }],
      });

      toast({
        title: "Configuração carregada",
        description: "Os dados da configuração foram carregados com sucesso.",
      });
    } else if (configResponse?.success === false) {
      // Se não há configuração, usar valores padrão
      toast({
        title: "Nova configuração",
        description: "Nenhuma configuração encontrada. Criando uma nova.",
        variant: "default",
      });
    }
  }, [configResponse, toast]);

  // Effect para tratar erros da query
  useEffect(() => {
    if (isError && error) {
      console.error("Erro ao carregar configuração:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar a configuração.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  // React Query para salvar configuração
  const saveMutation = useMutation({
    mutationFn: saveMdfeConfig,
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Configuração salva com sucesso!",
        });
        // Invalidar e recarregar os dados
        queryClient.invalidateQueries({ queryKey: ["mdfe-config"] });
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao salvar configuração.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro",
        description: "Erro interno ao salvar configuração.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof MdfeConfigData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMunicipioChange = (
    index: number,
    field: keyof MunCarrega,
    value: string
  ) => {
    const newMunicipios = [...formData.infMunCarrega];
    newMunicipios[index] = { ...newMunicipios[index], [field]: value };
    setFormData((prev) => ({ ...prev, infMunCarrega: newMunicipios }));
  };

  const addMunicipio = () => {
    setFormData((prev) => ({
      ...prev,
      infMunCarrega: [
        ...prev.infMunCarrega,
        { cMunCarrega: "", xMunCarrega: "" },
      ],
    }));
  };

  const removeMunicipio = (index: number) => {
    if (formData.infMunCarrega.length > 1) {
      const newMunicipios = formData.infMunCarrega.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({ ...prev, infMunCarrega: newMunicipios }));
    }
  };

  const handlePercursoChange = (index: number, value: string) => {
    const newPercursos = [...formData.infPercurso];
    newPercursos[index] = { UFPer: value };
    setFormData((prev) => ({ ...prev, infPercurso: newPercursos }));
  };

  const addPercurso = () => {
    setFormData((prev) => ({
      ...prev,
      infPercurso: [...prev.infPercurso, { UFPer: "" }],
    }));
  };

  const removePercurso = (index: number) => {
    if (formData.infPercurso.length > 1) {
      const newPercursos = formData.infPercurso.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, infPercurso: newPercursos }));
    }
  };

  const handleSave = async () => {
    // Preparar dados para salvar
    const dataToSave = {
      cUF: Number(formData.cUF) || 0,
      tpAmb: Number(formData.tpAmb) || 0,
      tpEmit: Number(formData.tpEmit) || 0,
      tpTransp: Number(formData.tpTransp) || 0,
      mod: Number(formData.mod) || 58,
      serie: Number(formData.serie) || 0,
      modal: Number(formData.modal) || 0,
      UFIni: formData.UFIni,
      UFFim: formData.UFFim,
      infMunCarrega: formData.infMunCarrega.filter(
        (m) => m.cMunCarrega && m.xMunCarrega
      ),
      infPercurso: formData.infPercurso.filter((p) => p.UFPer),
    };

    saveMutation.mutate(dataToSave);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando configuração...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="text-red-600">Erro ao carregar configuração</div>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["mdfe-config"] })
            }
            variant="outline"
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configuração MDF-e</h1>
          <p className="text-muted-foreground">
            Configure os dados básicos para emissão do Manifesto Eletrônico de
            Documentos Fiscais
          </p>
        </div>
        <Link href="/mdfe">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>

      <form className="space-y-6">
        {/* Dados de Identificação */}
        <Card>
          <CardHeader>
            <CardTitle>Dados de Identificação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coluna 1 */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cUF">Código UF do Emitente (cUF)</Label>
                  <Input
                    id="cUF"
                    value={formData.cUF}
                    onChange={(e) => handleInputChange("cUF", e.target.value)}
                    placeholder="Ex: 43 (Rio Grande do Sul)"
                  />
                </div>

                <div>
                  <Label htmlFor="tpAmb">Tipo de Ambiente (tpAmb)</Label>
                  <Input
                    id="tpAmb"
                    value={formData.tpAmb}
                    onChange={(e) => handleInputChange("tpAmb", e.target.value)}
                    placeholder="1-Produção, 2-Homologação"
                  />
                </div>

                <div>
                  <Label htmlFor="tpEmit">Tipo de Emitente (tpEmit)</Label>
                  <Input
                    id="tpEmit"
                    value={formData.tpEmit}
                    onChange={(e) =>
                      handleInputChange("tpEmit", e.target.value)
                    }
                    placeholder="1-Prestador de Serviço, 2-Transporte Próprio"
                  />
                </div>

                <div>
                  <Label htmlFor="tpTransp">
                    Tipo do Transportador (tpTransp)
                  </Label>
                  <Input
                    id="tpTransp"
                    value={formData.tpTransp}
                    onChange={(e) =>
                      handleInputChange("tpTransp", e.target.value)
                    }
                    placeholder="1-ETC, 2-TAC, 3-CTC"
                  />
                </div>
              </div>

              {/* Coluna 2 */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mod">Modelo (mod)</Label>
                  <Input
                    id="mod"
                    value={formData.mod}
                    onChange={(e) => handleInputChange("mod", e.target.value)}
                    placeholder="58 (MDF-e)"
                    disabled
                  />
                </div>

                <div>
                  <Label htmlFor="serie">Série</Label>
                  <Input
                    id="serie"
                    value={formData.serie}
                    onChange={(e) => handleInputChange("serie", e.target.value)}
                    placeholder="Série do MDF-e"
                  />
                </div>

                <div>
                  <Label htmlFor="modal">Modal (modal)</Label>
                  <Input
                    id="modal"
                    value={formData.modal}
                    onChange={(e) => handleInputChange("modal", e.target.value)}
                    placeholder="1-Rodoviário, 2-Aéreo, 3-Aquaviário, 4-Ferroviário"
                  />
                </div>

                <div>
                  <Label htmlFor="UFIni">UF de Início (UFIni)</Label>
                  <Input
                    id="UFIni"
                    value={formData.UFIni}
                    onChange={(e) => handleInputChange("UFIni", e.target.value)}
                    placeholder="Ex: RS"
                    maxLength={2}
                  />
                </div>

                <div>
                  <Label htmlFor="UFFim">UF de Fim (UFFim)</Label>
                  <Input
                    id="UFFim"
                    value={formData.UFFim}
                    onChange={(e) => handleInputChange("UFFim", e.target.value)}
                    placeholder="Ex: RS"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Municípios de Carregamento */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Municípios de Carregamento</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMunicipio}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Município
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.infMunCarrega.map((municipio, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg"
                >
                  <div>
                    <Label htmlFor={`cMunCarrega-${index}`}>
                      Código do Município (cMunCarrega)
                    </Label>
                    <Input
                      id={`cMunCarrega-${index}`}
                      value={municipio.cMunCarrega}
                      onChange={(e) =>
                        handleMunicipioChange(
                          index,
                          "cMunCarrega",
                          e.target.value
                        )
                      }
                      placeholder="Código IBGE do município"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`xMunCarrega-${index}`}>
                        Nome do Município (xMunCarrega)
                      </Label>
                      <Input
                        id={`xMunCarrega-${index}`}
                        value={municipio.xMunCarrega}
                        onChange={(e) =>
                          handleMunicipioChange(
                            index,
                            "xMunCarrega",
                            e.target.value
                          )
                        }
                        placeholder="Nome do município"
                      />
                    </div>
                    {formData.infMunCarrega.length > 1 && (
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeMunicipio(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Percursos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Percursos</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPercurso}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Percurso
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.infPercurso.map((percurso, index) => (
                <div key={index} className="flex gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor={`UFPer-${index}`}>
                      UF do Percurso (UFPer)
                    </Label>
                    <Input
                      id={`UFPer-${index}`}
                      value={percurso.UFPer}
                      onChange={(e) =>
                        handlePercursoChange(index, e.target.value)
                      }
                      placeholder="Ex: RS"
                      maxLength={2}
                    />
                  </div>
                  {formData.infPercurso.length > 1 && (
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePercurso(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Botão de Salvar */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="bg-green-600 hover:bg-green-700"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configuração
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
